import config from '../config';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: any;
  stack?: string;
}

const LogColors = {
  debug: '#6366F1',
  info: '#3B82F6',
  warn: '#F59E0B',
  error: '#EF4444',
};

const LogEmojis = {
  debug: '🔍',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
};

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 500;

  private formatTimestamp(): string {
    const now = new Date();
    return now.toISOString().split('T')[1].split('.')[0];
  }

  private format(level: LogLevel, category: string, message: string, data?: any): void {
    const timestamp = this.formatTimestamp();
    const entry: LogEntry = { timestamp, level, category, message, data };

    this.logs.push(entry);

    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    if (!config.isDevelopment) {
      return;
    }

    const emoji = LogEmojis[level];
    const color = LogColors[level];
    const style = `color: ${color}; font-weight: bold; font-size: 12px;`;

    if (data) {
      console.log(
        `%c${emoji} [${timestamp}] ${category}:`,
        style,
        message,
        data
      );
    } else {
      console.log(
        `%c${emoji} [${timestamp}] ${category}:`,
        style,
        message
      );
    }
  }

  debug(category: string, message: string, data?: any): void {
    this.format('debug', category, message, data);
  }

  info(category: string, message: string, data?: any): void {
    this.format('info', category, message, data);
  }

  warn(category: string, message: string, data?: any): void {
    this.format('warn', category, message, data);
  }

  error(category: string, message: string, data?: any | Error): void {
    if (data instanceof Error) {
      this.format('error', category, message, {
        message: data.message,
        stack: data.stack,
      });
    } else {
      this.format('error', category, message, data);
    }
  }

  getLogs(level?: LogLevel, category?: string): LogEntry[] {
    return this.logs.filter(
      (log) =>
        (!level || log.level === level) &&
        (!category || log.category.includes(category))
    );
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  downloadLogs(): void {
    const logs = this.exportLogs();
    const blob = new Blob([logs], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const logger = new Logger();
