const { promisify } = require('util');
const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const exec = promisify(require('child_process').exec);
const exampleDirs = readdirSync(__dirname)
	.map(dir => join(__dirname, dir))
	.filter(dir => statSync(dir).isDirectory());

async function runner(dir) {
	let { stdout } = await exec(`npm install && npm test`, { cwd: dir });
	console.log(stdout);
}

(async () => {
	await Promise.all(exampleDirs.map(runner)).catch(err => {
		console.log(err.stdout);
		console.error(err.stderr);
		process.exit(1);
	});
})();
