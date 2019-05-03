const globby = require('globby');

const getTestFiles = async () => {
	const host = `localhost`;
	const port = `9876`;

	// const unitTestFiles = [
	// 	`http://${host}:${port}/test/core/`,
	// 	`http://${host}:${port}/test/checks/`,
	// 	`http://${host}:${port}/test/rule-matches/`,
	// 	`http://${host}:${port}/test/commons/`,
	// 	`http://${host}:${port}/test/integration/rules`
	// ];

	const integrationFileGlobs = [
		'test/integration/full/**/*.html',
		'!test/integration/full/**/frames/**/*.html'
	];

	if (process.env.APPVEYOR) {
		integrationFileGlobs.push(
			'!test/integration/full/preload-cssom/preload-cssom.html'
		);
	}

	const integrationFiles = await globby(integrationFileGlobs);

	const integrationTestFiles = integrationFiles.map(file => {
		return `http://${host}:${port}/${file}`;
	});

	return [
		// ...unitTestFiles
		...integrationTestFiles
	];
};

module.exports = getTestFiles;
