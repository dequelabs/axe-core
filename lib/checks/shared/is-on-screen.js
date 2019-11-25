import isOnScreenEvaluate from './is-on-screen-evaluate';

const isOnScreenMetadata = {
	id: 'is-on-screen',
	evaluate: isOnScreenEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "Element is not visible",
			"fail": "Element is visible"
		}
	}
};

export default isOnScreenMetadata;