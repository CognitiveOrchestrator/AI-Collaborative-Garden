/**
 * 协议使用演示
 * 展示如何使用协作协议进行验证和报告生成
 */

import BasicCollaborationProtocol from '../src/protocols/basic-protocol.js';

async function runProtocolDemo() {
  console.log('📜 AI协作花园 - 协议使用演示');
  console.log('='.repeat(50));

  // 1. 初始化协议
  const protocol = new BasicCollaborationProtocol();
  console.log(`📋 协议: ${protocol.name} v${protocol.version}`);

  // 2. 显示协议规则
  console.log('\n📏 协议规则:');
  protocol.rules.forEach((rule) => {
    console.log(`   ${rule.enforce ? '🔒' : '🔓'} ${rule.id}: ${rule.description}`);
  });

  // 3. 测试不同的协作请求
  console.log('\n🔍 测试协作请求:');

  const requests = [
    {
      name: '标准开发任务',
      request: {
        task: '开发天气CLI工具',
        transparency: true,
        humanApproval: true,
        riskLevel: 'low',
      },
    },
    {
      name: '高风险操作',
      request: {
        task: '修改生产数据库',
        transparency: true,
        humanApproval: false,
        riskLevel: 'high',
      },
    },
    {
      name: '低透明度请求',
      request: {
        task: '自动化数据备份',
        transparency: false,
        humanApproval: true,
        riskLevel: 'low',
      },
    },
  ];

  requests.forEach(({ name, request }) => {
    console.log(`\n   📝 ${name}:`);
    console.log(`      任务: ${request.task}`);
    console.log(`      透明度: ${request.transparency ? '✅' : '❌'}`);
    console.log(`      人类审批: ${request.humanApproval ? '✅' : '❌'}`);
    console.log(`      风险级别: ${request.riskLevel}`);

    const validation = protocol.validateRequest(request);
    console.log(`      验证结果: ${validation.valid ? '✅ 通过' : '❌ 失败'}`);

    if (!validation.valid) {
      console.log(`      违规项:`);
      validation.violations.forEach((v) => {
        console.log(`        - ${v.rule}: ${v.message}`);
      });
    }
  });

  // 4. 生成模拟会话报告
  console.log('\n📊 协议报告示例:');

  const mockSession = {
    id: 'demo-session-001',
    participants: ['ai-agent-1', 'human-developer'],
    decisions: [
      {
        step: 1,
        agent: 'ai',
        action: 'analyze',
        result: '需求分析完成',
        timestamp: new Date().toISOString(),
        transparency: 'high',
      },
      {
        step: 2,
        agent: 'human',
        action: 'review',
        result: '审核通过',
        timestamp: new Date().toISOString(),
        transparency: 'high',
      },
    ],
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 3600000).toISOString(),
    status: 'completed',
  };

  const report = protocol.generateReport(mockSession);

  console.log(`   会话ID: ${report.sessionId}`);
  console.log(`   协议版本: ${report.protocol} v${report.version}`);
  console.log(`   参与者: ${report.summary.participants} 人`);
  console.log(`   决策数: ${report.summary.decisions} 个`);
  console.log(`   状态: ${report.summary.status}`);

  console.log('\n   ✅ 合规性检查:');
  console.log(`      透明性: ${report.compliance.transparency ? '✅ 合规' : '❌ 不合规'}`);
  console.log(`      人类参与: ${report.compliance.humanInLoop ? '✅ 合规' : '❌ 不合规'}`);
  console.log(`      安全边界: ${report.compliance.safetyBoundary ? '✅ 合规' : '❌ 不合规'}`);

  if (report.recommendations.length > 0) {
    console.log('\n   💡 改进建议:');
    report.recommendations.forEach((rec) => {
      console.log(`      - ${rec}`);
    });
  } else {
    console.log('\n   💡 无需改进建议');
  }

  console.log('\n🎯 协议演示完成！');
  console.log('='.repeat(50));

  // 5. 展示协议扩展可能性
  console.log('\n🚀 协议扩展建议:');
  console.log('   1. 添加机器学习合规性检查');
  console.log('   2. 实现实时监控和告警');
  console.log('   3. 集成到CI/CD流水线');
  console.log('   4. 添加多协议支持');
  console.log('   5. 实现协议版本管理');
}

// 运行演示
runProtocolDemo().catch(console.error);
