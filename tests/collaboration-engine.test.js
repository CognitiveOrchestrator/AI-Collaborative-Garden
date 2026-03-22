/**
 * CollaborationEngine 单元测试
 * 测试AI协作引擎的核心功能
 */

import { describe, it, expect, beforeEach } from 'vitest';
import CollaborationEngine from '../src/core/collaboration-engine.js';

describe('CollaborationEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new CollaborationEngine({
      transparencyLevel: 'high',
      learningEnabled: true,
      safetyBoundary: true,
    });
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const defaultEngine = new CollaborationEngine();
      expect(defaultEngine.options.transparencyLevel).toBe('high');
      expect(defaultEngine.options.learningEnabled).toBe(true);
      expect(defaultEngine.options.safetyBoundary).toBe(true);
    });

    it('should accept custom options', () => {
      const customEngine = new CollaborationEngine({
        transparencyLevel: 'low',
        learningEnabled: false,
      });
      expect(customEngine.options.transparencyLevel).toBe('low');
      expect(customEngine.options.learningEnabled).toBe(false);
    });

    it('should initialize empty agents array', () => {
      expect(engine.agents).toEqual([]);
    });

    it('should initialize empty collaboration logs', () => {
      expect(engine.collaborationLogs).toEqual([]);
    });
  });

  describe('addAgent', () => {
    it('should add an AI agent', () => {
      const agent = {
        id: 'test-ai-1',
        type: 'ai',
        capabilities: ['code-generation', 'analysis'],
      };

      engine.addAgent(agent);

      expect(engine.agents).toHaveLength(1);
      expect(engine.agents[0].id).toBe('test-ai-1');
      expect(engine.agents[0].type).toBe('ai');
      expect(engine.agents[0].status).toBe('active');
    });

    it('should add a human agent', () => {
      const agent = {
        id: 'test-human-1',
        type: 'human',
        capabilities: ['review', 'decision-making'],
      };

      engine.addAgent(agent);

      expect(engine.agents).toHaveLength(1);
      expect(engine.agents[0].type).toBe('human');
    });

    it('should generate ID if not provided', () => {
      const agent = {
        type: 'ai',
        capabilities: [],
      };

      engine.addAgent(agent);

      expect(engine.agents[0].id).toMatch(/^agent-\d+$/);
    });

    it('should log agent addition', () => {
      const agent = {
        id: 'test-ai-1',
        type: 'ai',
        capabilities: [],
      };

      engine.addAgent(agent);

      const addLog = engine.collaborationLogs.find((log) => log.event === 'agent_added');
      expect(addLog).toBeDefined();
      expect(addLog.data.agentId).toBe('test-ai-1');
    });
  });

  describe('startCollaboration', () => {
    it('should create a collaboration session', async () => {
      const task = {
        title: 'Test Task',
        description: 'A test collaboration task',
      };

      const session = await engine.startCollaboration(task);

      expect(session).toBeDefined();
      expect(session.task).toEqual(task);
      expect(session.status).toBe('completed');
      expect(session.participants).toEqual([]);
    });

    it('should record decisions during collaboration', async () => {
      const task = { title: 'Test Task' };

      const session = await engine.startCollaboration(task);

      expect(session.decisions).toHaveLength(4);
      expect(session.decisions[0].agent).toBe('ai');
      expect(session.decisions[1].agent).toBe('human');
    });

    it('should log collaboration start and end', async () => {
      const task = { title: 'Test Task' };

      await engine.startCollaboration(task);

      const startLog = engine.collaborationLogs.find(
        (log) => log.event === 'collaboration_started'
      );
      const endLog = engine.collaborationLogs.find(
        (log) => log.event === 'collaboration_completed'
      );

      expect(startLog).toBeDefined();
      expect(endLog).toBeDefined();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', async () => {
      engine.addAgent({ id: 'ai-1', type: 'ai', capabilities: [] });
      engine.addAgent({ id: 'human-1', type: 'human', capabilities: [] });

      await engine.startCollaboration({ title: 'Task 1' });
      await engine.startCollaboration({ title: 'Task 2' });

      const stats = engine.getStats();

      expect(stats.totalAgents).toBe(2);
      expect(stats.totalSessions).toBe(2);
      expect(stats.totalDecisions).toBe(8); // 4 decisions per session
      expect(stats.transparencyLevel).toBe('high');
    });
  });

  describe('log', () => {
    it('should add log entries', () => {
      engine.log('test_event', { key: 'value' });

      expect(engine.collaborationLogs).toHaveLength(1);
      expect(engine.collaborationLogs[0].event).toBe('test_event');
      expect(engine.collaborationLogs[0].data).toEqual({ key: 'value' });
    });

    it('should include timestamp in log entries', () => {
      engine.log('test_event', {});

      const log = engine.collaborationLogs[0];
      expect(log.timestamp).toBeDefined();
      expect(new Date(log.timestamp)).toBeInstanceOf(Date);
    });

    it('should include metadata in log entries', () => {
      engine.log('test_event', {});

      const log = engine.collaborationLogs[0];
      expect(log.metadata).toBeDefined();
      expect(log.metadata.transparencyLevel).toBe('high');
      expect(log.metadata.agentsCount).toBe(0);
    });
  });
});
