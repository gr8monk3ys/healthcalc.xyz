/**
 * Structured logging utility for the application
 *
 * Features:
 * - Log levels (debug, info, warn, error)
 * - Structured metadata support
 * - Environment-aware behavior
 * - Consistent log format
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMeta {
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  meta?: LogMeta;
}

interface LoggerConfig {
  /** Minimum log level to output */
  minLevel: LogLevel;
  /** Whether to output structured JSON (for production) */
  structured: boolean;
  /** Application name for log prefix */
  appName: string;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  debug: '\x1b[36m', // Cyan
  info: '\x1b[32m', // Green
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
};

const RESET_COLOR = '\x1b[0m';

// Default configuration based on environment
const getDefaultConfig = (): LoggerConfig => {
  const isProduction = typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
  const isServer = typeof window === 'undefined';

  return {
    minLevel: isProduction ? 'info' : 'debug',
    structured: isProduction && isServer,
    appName: 'healthcheck',
  };
};

let config: LoggerConfig = getDefaultConfig();

/**
 * Configure the logger
 */
export function configureLogger(newConfig: Partial<LoggerConfig>): void {
  config = { ...config, ...newConfig };
}

/**
 * Check if a log level should be output based on current config
 */
function shouldLog(level: LogLevel): boolean {
  return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[config.minLevel];
}

/**
 * Format a log entry for output
 */
function formatLogEntry(entry: LogEntry): string {
  if (config.structured) {
    // JSON format for production/server logs
    return JSON.stringify(entry);
  }

  // Human-readable format for development
  const color = LOG_LEVEL_COLORS[entry.level];
  const levelStr = entry.level.toUpperCase().padEnd(5);
  const metaStr = entry.meta ? ` ${JSON.stringify(entry.meta)}` : '';

  // Only use colors in Node.js environment (not browser)
  if (typeof window === 'undefined') {
    return `${color}[${levelStr}]${RESET_COLOR} ${entry.message}${metaStr}`;
  }

  return `[${levelStr}] ${entry.message}${metaStr}`;
}

/**
 * Output a log entry to the console
 */
function output(level: LogLevel, message: string, meta?: LogMeta): void {
  if (!shouldLog(level)) {
    return;
  }

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(meta && Object.keys(meta).length > 0 && { meta }),
  };

  const formatted = formatLogEntry(entry);

  switch (level) {
    case 'debug':
      // eslint-disable-next-line no-console
      console.debug(formatted);
      break;
    case 'info':
      // eslint-disable-next-line no-console
      console.info(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    case 'error':
      console.error(formatted);
      break;
  }
}

/**
 * Create a child logger with preset metadata
 */
export function createLogger(defaultMeta: LogMeta = {}) {
  return {
    debug: (message: string, meta?: LogMeta) =>
      output('debug', message, { ...defaultMeta, ...meta }),
    info: (message: string, meta?: LogMeta) => output('info', message, { ...defaultMeta, ...meta }),
    warn: (message: string, meta?: LogMeta) => output('warn', message, { ...defaultMeta, ...meta }),
    error: (message: string, meta?: LogMeta) =>
      output('error', message, { ...defaultMeta, ...meta }),

    /**
     * Log an error object with stack trace
     */
    logError: (message: string, error: unknown, meta?: LogMeta) => {
      const errorMeta: LogMeta = { ...defaultMeta, ...meta };

      if (error instanceof Error) {
        errorMeta.errorName = error.name;
        errorMeta.errorMessage = error.message;
        if (error.stack) {
          errorMeta.stack = error.stack;
        }
      } else {
        errorMeta.error = String(error);
      }

      output('error', message, errorMeta);
    },
  };
}

// Default logger instance
const logger = createLogger();

export default logger;

// Convenience exports for direct usage
export const { debug, info, warn, error, logError } = logger;
