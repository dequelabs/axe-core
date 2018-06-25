/**
 * Returns a then(able) queue of XHR's
 * @param {Object} config configuration for XMLHttpRequest
 * @return {Object}
 */
axe.utils.xhrQ = (config) => {
	'use strict';

	const request = new XMLHttpRequest(); // IE7+ friendly

	const q = axe.utils.queue();

	q.defer((resolve, reject) => {
		// wire up timeout
		request.timeout = config.timeout;

		// listen for timeout
		request.ontimeout = () => {
			reject({
				status: request.status,
				statusText: request.statusText
			});
		}

		// monitor ready state
		request.onreadystatechange = () => {
			// request is not complete.
			if (request.readyState !== 4) {
				return;
			}
			// process the response
			if (request.status >= 200 && request.status <= 300) {
				// success
				resolve(request);
			} else {
				// failure
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}
		};

		// setup request
		request.open(config.method || 'GET', config.url, true);

		// add headers if any
		if (config.headers) {
			Object
				.keys(config.headers)
				.forEach((k) => {
					request
						.setRequestHeader(k, config.headers[k]);
				});
		}

		// enumerate and construct params
		let params = config.params;
		if (params &&
			typeof params === 'object') {
			params = Object.keys(params)
				.map((k) => {
					return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`;
				})
				.join('&');
		}

		// send 
		request.send(params);
	});

	return q;
}