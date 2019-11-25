import validLangEvaluate from './valid-lang-evaluate';

const validLangMetadata = {
	id: 'valid-lang',
	evaluate: validLangEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Value of lang attribute is included in the list of valid languages',
			fail: 'Value of lang attribute not included in the list of valid languages'
		}
	}
};

export default validLangMetadata;