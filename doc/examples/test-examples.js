const { readdirSync, statSync } = require('fs');
const { join, basename } = require('path');
const execa = require('execa');
const Listr = require('listr');

const exampleDirs = readdirSync(__dirname)
	.map(dir => join(__dirname, dir))
	.filter(dir => statSync(dir).isDirectory());

const tasks = new Listr([
	{
		title: 'Install dependencies',
		task: () =>
			new Listr(
				exampleDirs.map(dir => ({
					title: basename(dir),
					task: () => execa('npm install', { cwd: dir, shell: true })
				}))
			)
	},
	{
		title: 'Run tests',
		task: () =>
			new Listr(
				exampleDirs.map(dir => ({
					title: basename(dir),
					task: () => execa('npm test', { cwd: dir, shell: true })
				}))
			)
	}
]);

tasks.run().catch(err => {
	if (err.stdout) {
		process.stdout.write(err.stdout);
	}
	if (err.stderr) {
		process.stderr.write(err.stderr);
	}
	console.error(err);
	process.exit(1);
});
