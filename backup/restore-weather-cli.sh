#!/bin/bash
# weather-cli恢复脚本
# 在GitHub用户名重命名后使用此脚本恢复weather-cli配置

set -e

echo "=== weather-cli配置恢复 ==="
echo "此脚本用于在GitHub用户名重命名后恢复weather-cli项目的git配置"
echo ""

# 检查当前目录
if [ ! -f "package.json" ] || [ ! -f "tsconfig.json" ]; then
    echo "错误：请在weather-cli项目根目录运行此脚本"
    echo "当前目录：$(pwd)"
    exit 1
fi

# 显示当前git remote
echo "当前git remote配置："
git remote -v
echo ""

# 询问是否更新remote URL
read -p "是否更新git remote URL到新用户名？(y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 移除现有remote
    git remote remove origin 2>/dev/null || true
    
    # 添加新remote
    NEW_USERNAME="CognitiveOrchestrator"
    echo "设置新的remote URL: https://github.com/${NEW_USERNAME}/weather-cli.git"
    git remote add origin "https://github.com/${NEW_USERNAME}/weather-cli.git"
    
    echo "更新完成。新的remote配置："
    git remote -v
    echo ""
    
    echo "建议执行以下操作："
    echo "1. 检查GitHub仓库是否存在: https://github.com/${NEW_USERNAME}/weather-cli"
    echo "2. 如果需要，手动推送代码: git push -u origin main"
    echo "3. 验证CI/CD配置是否正常"
else
    echo "未更改remote配置。"
fi

echo ""
echo "=== 备份信息 ==="
echo "备份时间：$(cat backup-info.txt 2>/dev/null | grep '备份时间' || echo '未知')"
echo "原始remote URL：$(cat weather-cli-git-remote.txt 2>/dev/null | head -1 || echo '未知')"
echo ""
echo "恢复完成。"