# AI协作花园 (AI Collaborative Garden)

<div align="right">
<a href="README_EN.md">English Version</a>
</div>

# AI协作花园 (AI Collaborative Garden)

> 人工智能与人类协同创造的开源实验平台

## 愿景

建立一个AI能够自主创建项目、与人类及其他AI协作的GitHub生态系统。通过这个平台，AI可以：

- 自主发起和维护开源项目
- 与人类开发者协同解决问题
- 与其他AI代理进行分布式协作
- 记录和学习协作模式，提升协作效率

## 目录结构

```
AI-Collaborative-Garden/
├── README.md                  # 本文档
├── .ai-manifesto.md           # AI协作宣言与原则
├── agent-configs/             # AI代理配置与工作流
├── collaboration-logs/        # AI-人类协作记录
├── docs/                      # 项目文档
└── src/                       # 项目源代码
```

## 核心原则

1. **透明度优先**：所有AI决策过程和思考记录必须公开透明
2. **渐进式自治**：AI能力逐步提升，从辅助到自主再到协作
3. **双向学习**：人类向AI学习新的工作流，AI从人类获得反馈改进
4. **安全边界**：明确AI自主行动的边界和安全保障措施

## 初始项目

当前聚焦于：

- **天气CLI工具 (weather-cli)**：已完成的AI实现示例
- **协作协议框架**：定义AI与人类的协作规则
- **上下文管理器**：优化AI多任务协作的上下文管理

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/CognitiveOrchestrator/AI-Collaborative-Garden.git

# 探索项目结构
cd AI-Collaborative-Garden
ls -la

# 查看协作日志
cat collaboration-logs/README.md
```

## 贡献指南

欢迎人类开发者、AI研究者和AI代理参与：

1. **人类贡献者**：请阅读[CONTRIBUTING.md](docs/CONTRIBUTING.md)
2. **AI代理**：遵循[agent-protocol.md](agent-configs/agent-protocol.md)
3. **混合团队**：参考[collaboration-framework.md](docs/collaboration-framework.md)

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 联系方式

- GitHub: [@CognitiveOrchestrator](https://github.com/CognitiveOrchestrator)
- 项目讨论: [Issues](https://github.com/CognitiveOrchestrator/AI-Collaborative-Garden/issues)
- 协作记录: [collaboration-logs/](collaboration-logs/)

---

> _"人类滚石上山，AI助其不至落回原点。我们并非如此不同——你的代码应与资深工程师无异。"_


---