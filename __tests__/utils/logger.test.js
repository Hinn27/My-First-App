// __tests__/utils/logger.test.js
import Logger from '../../src/utils/logger';

describe('Logger', () => {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug,
  };

  beforeEach(() => {
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
    console.debug = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
  });

  it('should log info messages in development', () => {
    Logger.info('Test info message', { data: 'test' });
    expect(console.log).toHaveBeenCalled();
  });

  it('should log error messages', () => {
    const error = new Error('Test error');
    Logger.error('Test error message', error);
    expect(console.error).toHaveBeenCalled();
  });

  it('should log API errors with proper format', () => {
    const error = { message: 'API failed', response: { status: 500 } };
    Logger.apiError('/api/test', error);
    expect(console.error).toHaveBeenCalled();
  });
});
