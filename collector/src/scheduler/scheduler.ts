import { CollectionEngine } from '../engine';
import { logger } from '../logger/logger';

export interface SchedulerOptions {
  intervalSeconds: number; // e.g. 300 for 5 minutes
  runImmediately?: boolean;
}

export class TaskScheduler {
  private timer: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private isExecutingCycle: boolean = false;

  constructor(
    private readonly engine: CollectionEngine,
    private readonly options: SchedulerOptions = { intervalSeconds: 300, runImmediately: true }
  ) {}

  public start(): void {
    if (this.isRunning) {
      logger.warn('Scheduler is already running');
      return;
    }

    this.isRunning = true;
    logger.info(`Starting scheduler with interval of ${this.options.intervalSeconds}s`);

    if (this.options.runImmediately) {
      this.triggerCycle();
    }

    this.timer = setInterval(() => {
      this.triggerCycle();
    }, this.options.intervalSeconds * 1000);
  }

  public stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.isRunning = false;
    logger.info('Scheduler stopped');
  }

  /**
   * Triggers a single execution cycle while preventing overlapping runs
   */
  public async triggerCycle(): Promise<void> {
    if (this.isExecutingCycle) {
      logger.warn('Skipping scheduled run: previous collection cycle is still executing');
      return;
    }

    this.isExecutingCycle = true;
    try {
      await this.engine.executeCycle();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error('Unhandled error during scheduled cycle execution', { error: msg });
    } finally {
      this.isExecutingCycle = false;
    }
  }

  public getStatus(): { isRunning: boolean; intervalSeconds: number; isExecutingCycle: boolean } {
    return {
      isRunning: this.isRunning,
      intervalSeconds: this.options.intervalSeconds,
      isExecutingCycle: this.isExecutingCycle
    };
  }
}
