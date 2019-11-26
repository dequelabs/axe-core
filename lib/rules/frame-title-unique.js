import frameTitleHasTextMatches from './frame-title-has-text-matches';

const frameTitleUniqueMetadata = {
	id: 'frame-title-unique',
	selector: 'frame[title], iframe[title]',
	matches: frameTitleHasTextMatches,
	tags: ['cat.text-alternatives', 'best-practice'],
	metadata: {
		description: 'Ensures <iframe> and <frame> elements contain a unique title attribute',
		help: 'Frames must have a unique title attribute'
	},
	all: [],
	any: [],
	none: ['unique-frame-title']
};

export default frameTitleUniqueMetadata;