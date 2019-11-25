import ariaLabelledbyEvaluate from './aria-labelledby-evaluate';

const ariaLabelledbyMetadata = {
	id: 'aria-labelledby',
	evaluate: ariaLabelledbyEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "aria-labelledby attribute exists and references elements that are visible to screen readers",
			"fail": "aria-labelledby attribute does not exist, references elements that do not exist or references elements that are empty"
		}
	}
};

export default ariaLabelledbyMetadata;