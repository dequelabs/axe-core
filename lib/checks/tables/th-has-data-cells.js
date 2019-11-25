import thHasDataCellsEvaluate from './th-has-data-cells-evaluate';

const thHasDataCellsMetadata = {
	id: 'th-has-data-cells',
	evaluate: thHasDataCellsEvaluate,
	metadata: {
		impact: 'serious',
		message: {
			"pass": "All table header cells refer to data cells",
			"fail": "Not all table header cells refer to data cells",
			"incomplete": "Table data cells are missing or empty"
		}
	}
};

export default thHasDataCellsMetadata;