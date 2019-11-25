import onlyDlitemsEvaluate from './only-dlitems-evaluate';

const onlyDlitemsMetadata = {
	id: 'only-dlitems',
	evaluate: onlyDlitemsEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			pass: 'List element only has direct children that are allowed inside <dt> or <dd> elements',
			fail: 'List element has direct children that are not allowed inside <dt> or <dd> elements'
		}
	}
};

export default onlyDlitemsMetadata;