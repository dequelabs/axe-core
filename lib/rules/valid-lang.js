import notHtmlMatches from './not-html-matches';

const validLangMetadata = {
	id: 'valid-lang',
	selector: '[lang], [xml\\:lang]',
	matches: notHtmlMatches,
	tags: ['cat.language', 'wcag2aa', 'wcag312'],
	metadata: {
		description: 'Ensures lang attributes have valid values',
		help: 'lang attribute must have a valid value'
	},
	all: [],
	any: [],
	none: ['valid-lang']
};

export default validLangMetadata;