# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

### 中文字体配置（PDF/图片生成）

**问题：** 系统在输出 PDF、图片等内容时，中文字体会乱码

**解决方案：** 使用 OpenClaw workspacebash 目录内的 **MiSans** 小米免费字体

**字体路径：**
- **主字体（推荐）**: `/Users/os-jx/.openclaw/workspacebash/MiSans/ttf/MiSans-Regular.ttf`
- **粗体**: `/Users/os-jx/.openclaw/workspacebash/MiSans/ttf/MiSans-Bold.ttf`
- **其他字重**: Light, Medium, Semibold, Demibold, Heavy, Thin, ExtraLight, Normal
- **可变字体**: `/Users/os-jx/.openclaw/workspacebash/MiSans/可变字体/MiSansVF.ttf`
- **其他格式**: OTF, WOFF, WOFF2（位于对应子目录）

**应用场景：**
- PDF 生成（pdf skill）
- 图片生成（canvas-design skill）
- 任何需要中文渲染的场景

**使用方式：**
1. 在生成 PDF/图片时，指定字体为 MiSans
2. 配置字体路径到相应工具的环境变量中
3. 确保字体文件可访问

**字体库完整路径：** `/Users/os-jx/.openclaw/workspacebash/MiSans/`

---

### 心跳检查偏好

**Google Gemini OAuth 过期：**
- 用户选择暂不处理
- 不需要在心跳检查中提示
- 优先级：低（备用模型，非主要依赖）

---

Add whatever helps you do your job. This is your cheat sheet.
