// by "renaming" (but not really) the exports we can see what the export is
// called here rather than having to dive into each of the files to figure
// out its name
export { default as failureSummary } from './failure-summary.js';
export { default as getEnvironmentData } from './get-environment-data.js';
export {
	default as incompleteFallbackMessage
} from './incomplete-fallback-message.js';
export { default as processAggregate } from './process-aggregate.js';
