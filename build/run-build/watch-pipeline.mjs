/**
 * Serial work pipeline with coalescing while a flush is already running.
 * @param {{
 *   drain: () => Promise<boolean>,
 *   shouldContinue?: () => boolean,
 *   onIdle?: () => void
 * }} options
 */
export function createWatchPipeline({
  drain,
  shouldContinue = () => true,
  onIdle
}) {
  let pipelineRunning = false;
  let pipelineScheduled = false;

  const flushPipeline = async () => {
    if (pipelineRunning) {
      pipelineScheduled = true;
      return;
    }
    pipelineRunning = true;
    try {
      do {
        pipelineScheduled = false;
        while (shouldContinue() && (await drain())) {
          /* drain queued steps until idle */
        }
      } while (pipelineScheduled && shouldContinue());
    } finally {
      pipelineRunning = false;
      onIdle?.();
    }
  };

  return {
    flushPipeline,
    isRunning: () => pipelineRunning,
    isScheduled: () => pipelineScheduled
  };
}
