import scrollableRegionFocusableMatches from './scrollable-region-focusable-matches';

const scrollableRegionFocusableMetadata = {
	id: 'scrollable-region-focusable',
	matches: scrollableRegionFocusableMatches,
	tags: ['wcag2a', 'wcag211'],
	metadata: {
		description: 'Elements that have scrollable content should be accessible by keyboard',
		help: 'Ensure that scrollable region has keyboard access'
	},
	all: [],
	any: ['focusable-content', 'focusable-element'],
	none: []
};

export default scrollableRegionFocusableMetadata;