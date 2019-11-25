import structuredDlitemsEvaluate from './structured-dlitems-evaluate';

const structuredDlitemsMetadata = {
	id: 'structured-dlitems',
	evaluate: structuredDlitemsEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'When not empty, element has both <dt> and <dd> elements',
			fail: 'When not empty, element does not have at least one <dt> element followed by at least one <dd> element'
		}
	}
};

export default structuredDlitemsMetadata;