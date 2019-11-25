import uniqueFrameTitleEvaluate from './unique-frame-title-evaluate';
import uniqueFrameTitleAfter from './unique-frame-title-after';

const uniqueFrameTitleMetadata = {
	id: 'unique-frame-title',
	evaluate: uniqueFrameTitleEvaluate,
	after: uniqueFrameTitleAfter,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "Element's title attribute is unique",
			"fail": "Element's title attribute is not unique"
		}
	}
};

export default uniqueFrameTitleMetadata;