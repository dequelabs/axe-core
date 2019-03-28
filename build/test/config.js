exports = module.exports = function(grunt, options) {
	var host = 'localhost';

	if (process.env.REMOTE_TESTSERVER_HOST) {
		host = process.env.REMOTE_TESTSERVER_HOST;
	}

	function mapToUrl(files, port) {
		return grunt.file.expand(files).map(function(file) {
			return 'http://' + host + ':' + port + '/' + file;
		});
	}

	return {
		options: options,
		unit: {
			options: {
				logErrors: true,
				log: true,
				urls: [
					'http://' +
						host +
						':<%= connect.test.options.port %>/ts-out/test/core/',
					'http://' +
						host +
						':<%= connect.test.options.port %>/ts-out/test/checks/',
					'http://' +
						host +
						':<%= connect.test.options.port %>/ts-out/test/rule-matches/',
					'http://' +
						host +
						':<%= connect.test.options.port %>/ts-out/test/commons/',
					'http://' +
						host +
						':<%= connect.test.options.port %>/ts-out/test/integration/rules/'
				],
				run: true,
				growlOnSuccess: false,
				mocha: {
					grep: grunt.option('grep')
				}
			}
		},
		integration: {
			options: {
				log: true,
				urls: mapToUrl(
					[
						'ts-out/test/integration/full/**/*.html',
						'!ts-out/test/integration/full/**/frames/**/*.html'
					],
					'<%= connect.test.options.port %>'
				),
				run: true,
				growlOnSuccess: false,
				mocha: {
					grep: grunt.option('grep')
				}
			}
		}
	};
};
