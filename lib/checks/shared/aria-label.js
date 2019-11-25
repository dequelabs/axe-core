import ariaLabelEvaluate from './aria-label-evaluate';

const ariaLabelMetadata = {
	id: 'aria-label',
	evaluate: ariaLabelEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "aria-label attribute exists and is not empty",
			"fail": "aria-label attribute does not exist or is empty"
		}
	}
};

export default ariaLabelMetadata;