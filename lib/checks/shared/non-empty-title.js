import nonEmptyTitleEvaluate from './non-empty-title-evaluate';

const nonEmptyTitleMetadata = {
	id: 'non-empty-title',
	evaluate: nonEmptyTitleEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "Element has a title attribute",
			"fail": "Element has no title attribute or the title attribute is empty"
		}
	}
};

export default nonEmptyTitleMetadata;