import regionEvaluate from './region-evaluate';
import regionAfter from './region-after';

const regionMetadata = {
	id: 'region',
	evaluate: regionEvaluate,
	after: regionAfter,
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'All page content is contained by landmarks',
			fail: 'Some page content is not contained by landmarks'
		}
	}
};

export default regionMetadata;