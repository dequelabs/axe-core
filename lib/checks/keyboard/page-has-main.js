import pageHasElmEvaluate from './page-has-elm-evaluate';
import pageHasElmAfter from './page-has-elm-after';

const pageHasMainMetadata = {
	id: 'page-has-main',
	evaluate: pageHasElmEvaluate,
	after: pageHasElmAfter,
	options: {
		selector: 'main:not([role]), [role="main"]'
	},
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Document has at least one main landmark',
			fail: 'Document does not have a main landmark'
		}
	}
};

export default pageHasMainMetadata;