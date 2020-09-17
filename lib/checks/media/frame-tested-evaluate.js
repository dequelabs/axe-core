import { respondable } from '../../core/utils';

function frameTestedEvaluate(node, options) {
	const resolve = this.async();
	const { isViolation, timeout } = Object.assign(
		{ isViolation: false, timeout: 500 },
		options
	);

	// give the frame .5s to respond to 'axe.ping', else log failed response
	let timer = setTimeout(function() {
		// This double timeout is important for allowing iframes to respond
		// DO NOT REMOVE
		timer = setTimeout(function() {
			timer = null;
			resolve(isViolation ? false : undefined);
		}, 0);
	}, timeout);

	respondable(node.contentWindow, 'axe.ping', null, undefined, data => {
		if (timer !== null) {
			clearTimeout(timer);

			// verify axe is configured the same (allow axe test version)
			// TODO: es-modules-version
			if (data.version !== 'x.y.z' && data.version !== axe.version) {
				this.data({
					messageKey: 'version',
					version: axe.version,
					iframeVersion: data.version
				});
				return resolve(false);
			}

			// TODO: es-modules-_audit
			const config = JSON.stringify(axe._audit.spec || {});
			const iframeConfig = JSON.stringify(data.spec || {});
			if (config !== iframeConfig) {
				this.data({
					messageKey: 'configure',
					config,
					iframeConfig
				});
				return resolve(false);
			}

			resolve(true);
		}
	});
}

export default frameTestedEvaluate;
