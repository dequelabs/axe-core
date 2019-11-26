import hasCaptionEvaluate from './has-caption-evaluate';

const hasCaptionMetadata = {
	id: 'has-caption',
	evaluate: hasCaptionEvaluate,
	deprecated: true,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Layout table does not use <caption> element',
			fail: 'Layout table uses <caption> element'
		}
	}
};

export default hasCaptionMetadata;