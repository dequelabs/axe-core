import labelContentNameMismatchEvaluate from './label-content-name-mismatch-evaluate';

const labelContentNameMismatchMetadata = {
	id: 'label-content-name-mismatch',
	evaluate: labelContentNameMismatchEvaluate,
	options: {
		pixelThreshold: 0.1,
		occuranceThreshold: 3
	},
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Element contains visible text as part of it\'s accessible name',
			fail: 'Text inside the element is not included in the accessible name'
		}
	}
};

export default labelContentNameMismatchMetadata;