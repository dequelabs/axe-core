import landmarkHasBodyContextMatches from './landmark-has-body-context-matches';

const landmarkContentinfoIsTopLevelMetadata = {
	id: 'landmark-contentinfo-is-top-level',
	selector: 'footer:not([role]), [role=contentinfo]',
	matches: landmarkHasBodyContextMatches,
	tags: ['cat.semantics', 'best-practice'],
	metadata: {
		description: 'Ensures the contentinfo landmark is at top level',
		help: 'Contentinfo landmark must not be contained in another landmark'
	},
	all: [],
	any: ['landmark-is-top-level'],
	none: []
};

export default landmarkContentinfoIsTopLevelMetadata;