#!/usr/bin/env python3
"""
memory-janitor.py - 自动归档过期记忆

功能：
1. 扫描 memory/ 目录中的每日日志
2. 检查文件修改时间
3. 如果超过 90 天未修改 → 移到 archive/
4. 记录归档日志
"""

import os
import shutil
import json
from datetime import datetime, timedelta
from pathlib import Path

# 配置
MEMORY_DIR = Path(__file__).parent
ARCHIVE_DIR = MEMORY_DIR / "archive"
ARCHIVE_LOG = MEMORY_DIR / "archive-log.json"
ARCHIVE_DAYS = 90  # 归档天数

# 文件模式（只处理每日日志）
DAILY_PATTERN = "20*-*.md"


def load_archive_log() -> dict:
    """加载归档日志"""
    if ARCHIVE_LOG.exists():
        with open(ARCHIVE_LOG, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"archived_files": []}


def save_archive_log(log: dict):
    """保存归档日志"""
    with open(ARCHIVE_LOG, 'w', encoding='utf-8') as f:
        json.dump(log, f, indent=2, ensure_ascii=False)


def should_archive(file_path: Path) -> bool:
    """判断文件是否应该归档"""
    # 跳过特殊文件
    if file_path.name in ["MEMORY.md", "archive-log.json"]:
        return False

    # 跳过已归档的文件
    archive_log = load_archive_log()
    if str(file_path.name) in archive_log.get("archived_files", []):
        return False

    # 检查修改时间
    mod_time = datetime.fromtimestamp(file_path.stat().st_mtime)
    age_days = (datetime.now() - mod_time).days

    return age_days > ARCHIVE_DAYS


def archive_file(file_path: Path) -> bool:
    """归档单个文件"""
    try:
        # 确保归档目录存在
        ARCHIVE_DIR.mkdir(exist_ok=True)

        # 目标路径
        dest_path = ARCHIVE_DIR / file_path.name

        # 移动文件
        shutil.move(str(file_path), str(dest_path))

        # 更新日志
        log = load_archive_log()
        log["archived_files"].append(file_path.name)
        log["last_run"] = datetime.now().isoformat()
        save_archive_log(log)

        return True
    except Exception as e:
        print(f"❌ 归档失败 {file_path.name}: {e}")
        return False


def main():
    """主函数"""
    print("🧹 Memory Janitor 启动...")

    # 扫描每日日志
    daily_files = sorted(MEMORY_DIR.glob(DAILY_PATTERN))

    archived_count = 0
    for file_path in daily_files:
        if should_archive(file_path):
            print(f"📦 归档中: {file_path.name}")
            if archive_file(file_path):
                archived_count += 1

    print(f"✅ 完成！归档了 {archived_count} 个文件")


if __name__ == "__main__":
    main()
