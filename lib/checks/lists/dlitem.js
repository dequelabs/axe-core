import dlitemEvaluate from './dlitem-evaluate';

const dlitemMetadata = {
	id: 'dlitem',
	evaluate: dlitemEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'Description list item has a <dl> parent element',
			fail: 'Description list item does not have a <dl> parent element'
		}
	}
};

export default dlitemMetadata;