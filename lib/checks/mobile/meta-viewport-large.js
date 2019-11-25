import metaViewportScaleEvaluate from './meta-viewport-scale-evaluate';

const metaViewportLargeMetadata = {
	id: 'meta-viewport-large',
	evaluate: metaViewportScaleEvaluate,
	options: {
		scaleMinimum: 5,
		lowerBound: 2
	},
	metadata: {
		impact: 'minor',
		message: {
			pass: '<meta> tag does not prevent significant zooming on mobile devices',
			fail: '<meta> tag limits zooming on mobile devices'
		}
	}
};

export default metaViewportLargeMetadata;