import failureSummary from './failure-summary';
import getEnvironmentData from './get-environment-data';
import incompleteFallbackMessage from './incomplete-fallback-msg';
import processAggregate from './process-aggregate';

/*eslint no-unused-vars: 0*/
/* exported helpers */
// Kept here for the tests, which cannot yet `import/export` things.
const helpers = {
	failureSummary,
	getEnvironmentData,
	incompleteFallbackMessage,
	processAggregate
};

export {
	failureSummary,
	getEnvironmentData,
	incompleteFallbackMessage,
	processAggregate
};
