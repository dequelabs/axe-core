import pageHasElmEvaluate from './page-has-elm-evaluate';
import pageHasElmAfter from './page-has-elm-after';

const pageHasHeadingOneMetadata = {
	id: 'page-has-heading-one',
	evaluate: pageHasElmEvaluate,
	after: pageHasElmAfter,
	options: {
		selector: 'h1:not([role]), [role=\heading\][aria-level=\1\]'
	},
	metadata: {
		impact: 'moderate',
		message: {
			pass: 'Page has at least one level-one heading',
			fail: 'Page must have a level-one heading'
		}
	}
};

export default pageHasHeadingOneMetadata;