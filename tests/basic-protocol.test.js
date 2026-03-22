/**
 * BasicCollaborationProtocol 单元测试
 * 测试基础协作协议的功能
 */

import { describe, it, expect, beforeEach } from 'vitest';
import BasicCollaborationProtocol from '../src/protocols/basic-protocol.js';

describe('BasicCollaborationProtocol', () => {
  let protocol;

  beforeEach(() => {
    protocol = new BasicCollaborationProtocol();
  });

  describe('constructor', () => {
    it('should initialize with correct name and version', () => {
      expect(protocol.name).toBe('Basic Collaboration Protocol');
      expect(protocol.version).toBe('1.0.0');
    });

    it('should have default rules', () => {
      expect(protocol.rules).toHaveLength(4);
      expect(protocol.rules.map((r) => r.id)).toContain('transparency');
      expect(protocol.rules.map((r) => r.id)).toContain('human-in-loop');
      expect(protocol.rules.map((r) => r.id)).toContain('safety-boundary');
      expect(protocol.rules.map((r) => r.id)).toContain('bidirectional-learning');
    });

    it('should have enforced rules marked correctly', () => {
      const enforcedRules = protocol.rules.filter((r) => r.enforce);
      const nonEnforcedRules = protocol.rules.filter((r) => !r.enforce);

      expect(enforcedRules).toHaveLength(3);
      expect(nonEnforcedRules).toHaveLength(1);
      expect(nonEnforcedRules[0].id).toBe('bidirectional-learning');
    });
  });

  describe('validateRequest', () => {
    it('should pass validation for valid request', () => {
      const request = {
        task: 'Test task',
        transparency: true,
        humanApproval: true,
        riskLevel: 'low',
      };

      const result = protocol.validateRequest(request);

      expect(result.valid).toBe(true);
      expect(result.violations).toHaveLength(0);
    });

    it('should fail validation for missing transparency', () => {
      const request = {
        task: 'Test task',
        transparency: false,
        humanApproval: true,
        riskLevel: 'low',
      };

      const result = protocol.validateRequest(request);

      expect(result.valid).toBe(false);
      expect(result.violations).toHaveLength(1);
      expect(result.violations[0].rule).toBe('transparency');
    });

    it('should fail validation for missing human approval', () => {
      const request = {
        task: 'Test task',
        transparency: true,
        humanApproval: false,
        riskLevel: 'low',
      };

      const result = protocol.validateRequest(request);

      expect(result.valid).toBe(false);
      expect(result.violations).toHaveLength(1);
      expect(result.violations[0].rule).toBe('human-in-loop');
    });

    it('should fail validation for high risk without safety boundary', () => {
      const request = {
        task: 'Test task',
        transparency: true,
        humanApproval: true,
        riskLevel: 'high',
      };

      const result = protocol.validateRequest(request);

      expect(result.valid).toBe(false);
      expect(result.violations).toHaveLength(1);
      expect(result.violations[0].rule).toBe('safety-boundary');
    });

    it('should return multiple violations', () => {
      const request = {
        task: 'Test task',
        transparency: false,
        humanApproval: false,
        riskLevel: 'high',
      };

      const result = protocol.validateRequest(request);

      expect(result.valid).toBe(false);
      expect(result.violations).toHaveLength(3);
    });

    it('should include timestamp in result', () => {
      const request = { transparency: true, humanApproval: true, riskLevel: 'low' };

      const result = protocol.validateRequest(request);

      expect(result.timestamp).toBeDefined();
      expect(new Date(result.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe('generateReport', () => {
    it('should generate report for completed session', () => {
      const session = {
        id: 'session-123',
        participants: ['ai-1', 'human-1'],
        decisions: [
          { agent: 'ai', transparency: 'high' },
          { agent: 'human', transparency: 'high' },
        ],
        startTime: '2026-03-22T10:00:00Z',
        endTime: '2026-03-22T10:05:00Z',
        status: 'completed',
      };

      const report = protocol.generateReport(session);

      expect(report.protocol).toBe('Basic Collaboration Protocol');
      expect(report.version).toBe('1.0.0');
      expect(report.sessionId).toBe('session-123');
      expect(report.summary.participants).toBe(2);
      expect(report.summary.decisions).toBe(2);
      expect(report.summary.status).toBe('completed');
    });

    it('should check compliance for transparency', () => {
      const session = {
        id: 'session-123',
        decisions: [
          { agent: 'ai', transparency: 'high' },
          { agent: 'human', transparency: 'high' },
        ],
      };

      const report = protocol.generateReport(session);

      expect(report.compliance.transparency).toBe(true);
    });

    it('should detect non-compliance for transparency', () => {
      const session = {
        id: 'session-123',
        decisions: [
          { agent: 'ai', transparency: 'low' },
          { agent: 'human', transparency: 'high' },
        ],
      };

      const report = protocol.generateReport(session);

      expect(report.compliance.transparency).toBe(false);
    });

    it('should check compliance for human-in-loop', () => {
      const session = {
        id: 'session-123',
        decisions: [
          { agent: 'ai', transparency: 'high' },
          { agent: 'human', transparency: 'high' },
        ],
      };

      const report = protocol.generateReport(session);

      expect(report.compliance.humanInLoop).toBe(true);
    });

    it('should detect non-compliance for human-in-loop', () => {
      const session = {
        id: 'session-123',
        decisions: [
          { agent: 'ai', transparency: 'high' },
          { agent: 'ai', transparency: 'high' },
        ],
      };

      const report = protocol.generateReport(session);

      expect(report.compliance.humanInLoop).toBe(false);
    });

    it('should generate recommendations for improvements', () => {
      const session = {
        id: 'session-123',
        decisions: [
          { agent: 'ai', transparency: 'low' },
          { agent: 'ai', transparency: 'high' },
        ],
      };

      const report = protocol.generateReport(session);

      expect(report.recommendations.length).toBeGreaterThan(0);
      expect(report.recommendations).toContain('提高决策透明度');
      expect(report.recommendations).toContain('增加人类参与环节');
    });
  });
});
