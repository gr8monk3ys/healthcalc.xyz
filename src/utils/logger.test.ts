import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createLogger, configureLogger, debug, info, warn, error, logError } from './logger';

describe('Logger', () => {
  beforeEach(() => {
    // Reset console mocks
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Reset logger to default config
    configureLogger({ minLevel: 'debug', structured: false });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('createLogger', () => {
    it('should create a logger with default metadata', () => {
      const logger = createLogger({ component: 'TestComponent' });

      logger.info('Test message');

      expect(console.info).toHaveBeenCalled();
      const call = vi.mocked(console.info).mock.calls[0][0] as string;
      expect(call).toContain('Test message');
      expect(call).toContain('TestComponent');
    });

    it('should create a logger without metadata', () => {
      const logger = createLogger();

      logger.info('Simple message');

      expect(console.info).toHaveBeenCalled();
      const call = vi.mocked(console.info).mock.calls[0][0] as string;
      expect(call).toContain('Simple message');
    });

    it('should merge additional metadata with default', () => {
      const logger = createLogger({ component: 'TestComponent' });

      logger.info('Test message', { extra: 'data' });

      expect(console.info).toHaveBeenCalled();
      const call = vi.mocked(console.info).mock.calls[0][0] as string;
      expect(call).toContain('extra');
      expect(call).toContain('data');
    });
  });

  describe('log levels', () => {
    it('should log debug messages', () => {
      const logger = createLogger();
      logger.debug('Debug message');

      expect(console.debug).toHaveBeenCalled();
    });

    it('should log info messages', () => {
      const logger = createLogger();
      logger.info('Info message');

      expect(console.info).toHaveBeenCalled();
    });

    it('should log warn messages', () => {
      const logger = createLogger();
      logger.warn('Warning message');

      expect(console.warn).toHaveBeenCalled();
    });

    it('should log error messages', () => {
      const logger = createLogger();
      logger.error('Error message');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('configureLogger', () => {
    it('should respect minLevel configuration', () => {
      configureLogger({ minLevel: 'warn' });

      const logger = createLogger();
      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('should respect error-only minLevel', () => {
      configureLogger({ minLevel: 'error' });

      const logger = createLogger();
      logger.debug('Debug');
      logger.info('Info');
      logger.warn('Warn');
      logger.error('Error');

      expect(console.debug).not.toHaveBeenCalled();
      expect(console.info).not.toHaveBeenCalled();
      expect(console.warn).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it('should output structured JSON when configured', () => {
      configureLogger({ structured: true });

      const logger = createLogger({ component: 'Test' });
      logger.info('Structured message');

      expect(console.info).toHaveBeenCalled();
      const call = vi.mocked(console.info).mock.calls[0][0] as string;

      // Should be valid JSON
      const parsed = JSON.parse(call);
      expect(parsed.level).toBe('info');
      expect(parsed.message).toBe('Structured message');
      expect(parsed.timestamp).toBeDefined();
      expect(parsed.meta.component).toBe('Test');
    });
  });

  describe('logError', () => {
    it('should log Error objects with stack trace', () => {
      const logger = createLogger({ component: 'ErrorTest' });
      const testError = new Error('Test error message');

      logger.logError('An error occurred', testError);

      expect(console.error).toHaveBeenCalled();
      const call = vi.mocked(console.error).mock.calls[0][0] as string;
      expect(call).toContain('An error occurred');
      expect(call).toContain('Test error message');
      expect(call).toContain('errorName');
    });

    it('should log non-Error objects as strings', () => {
      const logger = createLogger({ component: 'ErrorTest' });

      logger.logError('An error occurred', 'string error');

      expect(console.error).toHaveBeenCalled();
      const call = vi.mocked(console.error).mock.calls[0][0] as string;
      expect(call).toContain('An error occurred');
      expect(call).toContain('string error');
    });

    it('should log Error with additional metadata', () => {
      const logger = createLogger({ component: 'ErrorTest' });
      const testError = new Error('Test error');

      logger.logError('Error with meta', testError, { userId: '123' });

      expect(console.error).toHaveBeenCalled();
      const call = vi.mocked(console.error).mock.calls[0][0] as string;
      expect(call).toContain('userId');
      expect(call).toContain('123');
    });

    it('should handle Error without stack trace', () => {
      const logger = createLogger();
      const errorWithoutStack = new Error('No stack');
      delete errorWithoutStack.stack;

      logger.logError('Error without stack', errorWithoutStack);

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('default logger exports', () => {
    it('should export debug function', () => {
      debug('Debug from export');
      expect(console.debug).toHaveBeenCalled();
    });

    it('should export info function', () => {
      info('Info from export');
      expect(console.info).toHaveBeenCalled();
    });

    it('should export warn function', () => {
      warn('Warn from export');
      expect(console.warn).toHaveBeenCalled();
    });

    it('should export error function', () => {
      error('Error from export');
      expect(console.error).toHaveBeenCalled();
    });

    it('should export logError function', () => {
      logError('LogError from export', new Error('test'));
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('log formatting', () => {
    it('should include timestamp in structured output', () => {
      configureLogger({ structured: true });

      const logger = createLogger();
      logger.info('Timestamped message');

      const call = vi.mocked(console.info).mock.calls[0][0] as string;
      const parsed = JSON.parse(call);

      expect(parsed.timestamp).toBeDefined();
      // Check it's a valid ISO date string
      expect(() => new Date(parsed.timestamp)).not.toThrow();
    });

    it('should format level in uppercase for human-readable output', () => {
      configureLogger({ structured: false });

      const logger = createLogger();
      logger.info('Test');

      const call = vi.mocked(console.info).mock.calls[0][0] as string;
      expect(call).toContain('[INFO');
    });

    it('should not include empty meta object', () => {
      configureLogger({ structured: true });

      const logger = createLogger();
      logger.info('No meta');

      const call = vi.mocked(console.info).mock.calls[0][0] as string;
      const parsed = JSON.parse(call);

      expect(parsed.meta).toBeUndefined();
    });
  });
});
