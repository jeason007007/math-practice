#!/usr/bin/env python3
"""
memory-archiver.py - 从每日日志提取精华到长期记忆

功能：
1. 扫描最近 7 天的 daily logs
2. 识别模式：重要决策、偏好、项目状态、成功方案
3. 提炼为 Markdown 条目
4. 同步到 MEMORY.md（按类别组织）
"""

import os
import re
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict

# 配置
MEMORY_DIR = Path(__file__).parent
MEMORY_FILE = MEMORY_DIR / "MEMORY.md"
RECENT_DAYS = 7  # 最近几天

# 模式匹配规则
PATTERNS = {
    "决策": [
        r"(决定|选择|确定).+(方案|方向|策略)",
        r"采用.+方案",
        r"最终选择.+",
    ],
    "偏好": [
        r"(我喜欢|我偏好|我倾向于).+",
        r"请.+风格",
        r"(简洁|详细|正式|随意).+风格",
    ],
    "项目状态": [
        r"(项目|任务).+(进度|状态|完成度)",
        r"当前.+进行中",
        r"待.+处理",
    ],
    "成功方案": [
        r"(成功|有效|可行).+方案",
        r"(解决|修复).+问题",
        r"(避免|防止).+错误",
    ],
}


def get_recent_logs() -> List[Path]:
    """获取最近 N 天的日志文件"""
    logs = []
    cutoff_date = datetime.now() - timedelta(days=RECENT_DAYS)

    for file_path in MEMORY_DIR.glob("20*-*.md"):
        # 跳过特殊文件
        if file_path.name in ["MEMORY.md", "archive-log.json"]:
            continue

        # 解析日期
        try:
            # 取前 10 个字符作为日期（适用于 2026-02-16 和 2026-02-17-0140）
            date_str = file_path.stem[:10]
            file_date = datetime.strptime(date_str, "%Y-%m-%d")

            if file_date >= cutoff_date:
                logs.append(file_path)
        except ValueError:
            continue

    return sorted(logs, reverse=True)  # 最新的在前


def extract_patterns(file_path: Path) -> Dict[str, List[str]]:
    """从文件中提取模式"""
    results = {category: [] for category in PATTERNS}

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            lines = content.split('\n')
    except Exception as e:
        print(f"❌ 读取失败 {file_path.name}: {e}")
        return results

    for line in lines:
        line = line.strip()
        if not line or line.startswith('#'):
            continue

        # 匹配每个类别
        for category, patterns in PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, line):
                    results[category].append(line)
                    break  # 避免重复匹配

    return results


def format_extracted(extracted: Dict[str, List[str]], log_file: Path) -> str:
    """格式化提取的内容"""
    if not any(extracted.values()):
        return ""

    date_str = log_file.stem[:10]
    markdown = f"\n## 📅 {date_str} 提炼\n\n"

    for category, items in extracted.items():
        if items:
            markdown += f"### {category}\n\n"
            for item in items[:5]:  # 每个类别最多 5 条
                markdown += f"- {item}\n"
            markdown += "\n"

    return markdown


def update_memory(new_content: str):
    """更新 MEMORY.md"""
    if not new_content:
        print("✅ 没有新内容需要添加")
        return

    # 读取现有内容
    if MEMORY_FILE.exists():
        with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
            old_content = f.read()
    else:
        old_content = "# MEMORY.md - 长期记忆\n\n"

    # 在末尾添加新内容
    updated_content = old_content + "\n---\n" + new_content

    # 写回文件
    with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)

    print("✅ MEMORY.md 已更新")


def main():
    """主函数"""
    print("🧠 Memory Archiver 启动...")

    # 获取最近日志
    logs = get_recent_logs()
    print(f"📝 扫描最近 {RECENT_DAYS} 天的日志: {len(logs)} 个文件")

    # 提取内容
    all_extracted = ""
    for log_file in logs:
        print(f"  📄 {log_file.name}")
        extracted = extract_patterns(log_file)
        formatted = format_extracted(extracted, log_file)
        all_extracted += formatted

    # 更新记忆
    update_memory(all_extracted)
    print("✅ 完成！")


if __name__ == "__main__":
    main()
