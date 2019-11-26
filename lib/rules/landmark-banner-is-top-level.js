import landmarkHasBodyContextMatches from './landmark-has-body-context-matches';

const landmarkBannerIsTopLevelMetadata = {
	id: 'landmark-banner-is-top-level',
	selector: 'header:not([role]), [role=banner]',
	matches: landmarkHasBodyContextMatches,
	tags: ['cat.semantics', 'best-practice'],
	metadata: {
		description: 'Ensures the banner landmark is at top level',
		help: 'Banner landmark must not be contained in another landmark'
	},
	all: [],
	any: ['landmark-is-top-level'],
	none: []
};

export default landmarkBannerIsTopLevelMetadata;