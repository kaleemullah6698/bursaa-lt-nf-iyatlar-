export interface LogContext {
  [key: string]: unknown;
}

export class StructuredLogger {
  constructor(private readonly serviceName: string = 'gold-collector') {}

  public info(message: string, context?: LogContext): void {
    this.output('INFO', message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.output('WARN', message, context);
  }

  public error(message: string, context?: LogContext): void {
    this.output('ERROR', message, context);
  }

  private output(level: string, message: string, context?: LogContext): void {
    const entry = {
      timestamp: new Date().toISOString(),
      service: this.serviceName,
      level,
      message,
      ...(context || {})
    };
    console.log(JSON.stringify(entry));
  }
}

export const logger = new StructuredLogger('bursa-gold-collector');
