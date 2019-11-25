import captionFakedEvaluate from './caption-faked-evaluate';

const captionFakedMetadata = {
	id: 'caption-faked',
	evaluate: captionFakedEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "The first row of a table is not used as a caption",
			"fail": "The first child of the table should be a caption instead of a table cell"
		}
	}
};

export default captionFakedMetadata;