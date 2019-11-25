import hasLangEvaluate from './has-lang-evaluate';

const hasLangMetadata = {
	id: 'has-lang',
	evaluate: hasLangEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'The <html> element has a lang attribute',
			fail: 'The <html> element does not have a lang attribute'
		}
	}
};

export default hasLangMetadata;