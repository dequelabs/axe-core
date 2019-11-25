import metaViewportScaleEvaluate from './meta-viewport-scale-evaluate';

const metaViewportMetadata = {
	id: 'meta-viewport',
	evaluate: metaViewportScaleEvaluate,
	options: {
		scaleMinimum: 2
	},
	metadata: {
		impact: 'critical',
		message: {
			pass: '<meta> tag does not disable zooming on mobile devices',
			fail: '{{=it.data}} on <meta> tag disables zooming on mobile devices'
		}
	}
};

export default metaViewportMetadata;