import failureSummary from './failure-summary';
import incompleteFallbackMessage from './incomplete-fallback-msg';
import processAggregate from './process-aggregate';

// Setting up this private/temp namespace for the tests (which cannot yet `import/export` things).
// TODO: remove `_thisWillBeDeletedDoNotUse`
axe._thisWillBeDeletedDoNotUse = axe._thisWillBeDeletedDoNotUse || {};
axe._thisWillBeDeletedDoNotUse.helpers = {
  failureSummary,
  incompleteFallbackMessage,
  processAggregate
};

export {
  failureSummary,
  incompleteFallbackMessage,
  processAggregate
};
