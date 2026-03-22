/**
 * 基础协作演示
 * 展示AI与人类协作的基本流程
 */

import CollaborationEngine from '../../src/core/collaboration-engine.js';
import BasicCollaborationProtocol from '../../src/protocols/basic-protocol.js';

async function runDemo() {
  console.log('🌱 AI协作花园 - 基础协作演示');
  console.log('='.repeat(50));

  // 1. 初始化协作引擎
  const engine = new CollaborationEngine({
    transparencyLevel: 'high',
    learningEnabled: true,
  });

  // 2. 初始化协议
  const protocol = new BasicCollaborationProtocol();
  console.log(`📋 使用协议: ${protocol.name} v${protocol.version}`);

  // 3. 添加参与者
  console.log('\n👥 添加参与者:');
  engine.addAgent({
    id: 'ai-agent-1',
    type: 'ai',
    capabilities: ['code-generation', 'analysis', 'documentation'],
  });

  engine.addAgent({
    id: 'human-developer',
    type: 'human',
    capabilities: ['review', 'decision-making', 'creative-thinking'],
  });

  // 4. 验证协作请求
  console.log('\n🔍 验证协作请求:');
  const request = {
    task: '创建一个天气CLI工具',
    transparency: true,
    humanApproval: true,
    riskLevel: 'low',
  };

  const validation = protocol.validateRequest(request);
  console.log(`   验证结果: ${validation.valid ? '✅ 通过' : '❌ 失败'}`);

  if (!validation.valid) {
    console.log('   违规项:');
    validation.violations.forEach((v) => {
      console.log(`   - ${v.rule}: ${v.message}`);
    });
    return;
  }

  // 5. 开始协作
  console.log('\n🚀 开始协作会话:');
  const session = await engine.startCollaboration({
    title: '创建天气CLI工具',
    description: '开发一个支持高德天气API的命令行工具',
    requirements: ['支持多日预报', '支持空气质量查询', '支持JSON输出'],
  });

  // 6. 生成报告
  console.log('\n📊 生成协作报告:');
  const report = protocol.generateReport(session);
  console.log(`   协议会话: ${report.sessionId}`);
  console.log(`   参与者: ${report.summary.participants} 人`);
  console.log(`   决策数: ${report.summary.decisions} 个`);
  console.log(`   状态: ${report.summary.status}`);

  console.log('\n✅ 合规检查:');
  console.log(`   透明性: ${report.compliance.transparency ? '✅' : '❌'}`);
  console.log(`   人类参与: ${report.compliance.humanInLoop ? '✅' : '❌'}`);
  console.log(`   安全边界: ${report.compliance.safetyBoundary ? '✅' : '❌'}`);

  if (report.recommendations.length > 0) {
    console.log('\n💡 改进建议:');
    report.recommendations.forEach((rec) => {
      console.log(`   - ${rec}`);
    });
  }

  // 7. 显示统计
  console.log('\n📈 协作统计:');
  const stats = engine.getStats();
  console.log(`   总代理数: ${stats.totalAgents}`);
  console.log(`   总会话数: ${stats.totalSessions}`);
  console.log(`   总决策数: ${stats.totalDecisions}`);

  console.log('\n🎯 演示完成！');
  console.log('='.repeat(50));
}

// 运行演示
runDemo().catch(console.error);
