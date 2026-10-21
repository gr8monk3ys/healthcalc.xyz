import { after } from 'next/server';
import { createLogger } from '@/utils/logger';

const logger = createLogger({ component: 'afterResponse' });

/**
 * Run non-critical work (logging, analytics, cleanup) after the response has
 * been sent, via Next's after(). Outside a request scope (scripts, unit tests)
 * after() throws, so the task starts immediately instead. Errors are logged,
 * never thrown back into the request.
 */
export function runAfterResponse(task: () => unknown): void {
  const guarded = async (): Promise<void> => {
    try {
      await task();
    } catch (error) {
      logger.logError('Deferred task failed', error);
    }
  };

  try {
    after(guarded);
  } catch {
    void guarded();
  }
}
