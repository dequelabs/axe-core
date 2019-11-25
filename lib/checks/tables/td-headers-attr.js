import tdHeadersAttrEvaluate from './td-headers-attr-evaluate';

const tdHeadersAttrMetadata = {
	id: 'td-headers-attr',
	evaluate: tdHeadersAttrEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "The headers attribute is exclusively used to refer to other cells in the table",
			"fail": "The headers attribute is not exclusively used to refer to other cells in the table"
		}
	}
};

export default tdHeadersAttrMetadata;