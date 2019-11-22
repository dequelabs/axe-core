import hiddenContentEvaluate from './hidden-content-evaluate';

const metadata = {
	id: 'hidden-content',
	evaluate: hiddenContentEvaluate,
	metadata: {
		impact: 'minor',
		messages: {
			pass: 'All content on the page has been analyzed.',
			fail: 'There were problems analyzing the content on this page.',
			incomplete: 'There is hidden content on the page that was not analyzed. You will need to trigger the display of this content in order to analyze it.'
		}
	}
}

export default metadata;