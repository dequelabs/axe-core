exports = module.exports = function (grunt, options) {

	function mapToUrl(files, port) {
		return grunt.file.expand(files).map(function (file) {
			return 'http://localhost:' + port + '/' + file;
		});
	}

	return {
		options: options,
		unit: {
			options: {
				urls: [
					'http://localhost:<%= connect.test.options.port %>/test/core/',
					'http://localhost:<%= connect.test.options.port %>/test/checks/',
					'http://localhost:<%= connect.test.options.port %>/test/commons/',
					'http://localhost:<%= connect.test.options.port %>/test/integration/rules/'
				],
				run: true,
				reporter: 'Spec',
				mocha: {
					grep: grunt.option('grep')
				}
			}
		},
		integration: {
			options: {
				urls: mapToUrl(['test/integration/full/**/*.html', '!test/integration/full/**/frames/**/*.html'],
					'<%= connect.test.options.port %>'),
				run: true,
				mocha: {
					grep: grunt.option('grep')
				}
			}
		}
	};
};
