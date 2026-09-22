import { SourceAdapter, NormalizedGoldRecord, SourceType, DataScope } from '../types';

export abstract class BaseSourceAdapter implements SourceAdapter {
  abstract readonly name: string;
  abstract readonly sourceType: SourceType;
  abstract readonly defaultDataScope: DataScope;

  abstract fetchPrices(): Promise<NormalizedGoldRecord[]>;
  abstract isAvailable(): Promise<boolean>;

  protected log(level: 'info' | 'warn' | 'error', message: string, meta?: Record<string, unknown>): void {
    const timestamp = new Date().toISOString();
    console.log(JSON.stringify({
      timestamp,
      level,
      adapter: this.name,
      message,
      ...meta
    }));
  }
}
