import hasThEvaluate from './has-th-evaluate';

const hasThMetadata = {
	id: 'has-th',
	evaluate: hasThEvaluate,
	deprecated: true,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Layout table does not use <th> elements',
			fail: 'Layout table uses <th> elements'
		}
	}
};

export default hasThMetadata;