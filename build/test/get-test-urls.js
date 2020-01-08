const globby = require('globby');

const getTestUrls = async (host = `localhost`, port = `9876`) => {
	const urls = [
		/**
		 * Unit tests -> Core
		 */
		`http://${host}:${port}/test/core/`,
		/**
		 * Unit tests -> Checks
		 */
		`http://${host}:${port}/test/checks/`,
		/**
		 * Unit tests -> Matches
		 */
		`http://${host}:${port}/test/rule-matches/`,
		/**
		 * Unit tests -> Commons
		 */
		`http://${host}:${port}/test/commons/`,
		/**
		 * Integration tests -> rules
		 */
		`http://${host}:${port}/test/integration/rules`,
		/**
		 * Integration tests -> full
		 */
		...(
			await globby([
				'test/integration/full/**/*.html',
				'!test/integration/full/**/frames/**/*.html'
			])
		).map(file => `http://${host}:${port}/${file}`)
	];
	return urls;
};

module.exports = getTestUrls;
