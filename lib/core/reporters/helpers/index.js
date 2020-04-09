import failureSummary from './failure-summary';
import getEnvironmentData from './get-environment-data';
import incompleteFallbackMessage from './incomplete-fallback-msg';
import processAggregate from './process-aggregate';

/*eslint no-unused-vars: 0, no-undef: 0*/
/* exported helpers */
// Kept here for the tests, which cannot yet `import/export` things.
// Some other file in the codebase does `var helpers`, so we're not _actually_ exposing a global here.
axe.__this_will_be_deleted_soon__DO_NOT_USE__ = {
	helpers: {
		failureSummary,
		getEnvironmentData,
		incompleteFallbackMessage,
		processAggregate
	}
};

export {
	failureSummary,
	getEnvironmentData,
	incompleteFallbackMessage,
	processAggregate
};
