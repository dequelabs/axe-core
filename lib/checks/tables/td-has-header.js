import tdHasHeaderEvaluate from './td-has-header-evaluate';

const tdHasHeaderMetadata = {
	id: 'td-has-header',
	evaluate: tdHasHeaderEvaluate,
	metadata: {
		impact: 'critical',
		message: {
			pass: 'All non-empty data cells have table headers',
			fail: 'Some non-empty data cells do not have table headers'
		}
	}
};

export default tdHasHeaderMetadata;