const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const { spawn } = require('child_process');
const exampleDirs = readdirSync(__dirname)
	.map(dir => join(__dirname, dir))
	.filter(dir => statSync(dir).isDirectory());

async function runner(dir) {
	let child = spawn('npm install && npm test', {
		cwd: dir,
		shell: true,
		stdio: 'inherit'
	});

	return new Promise((resolve, reject) => {
		child.on('close', code => {
			if (code === 0) {
				resolve();
			} else {
				reject();
			}
		});
	});
}

(async () => {
	await Promise.all(exampleDirs.map(runner))
		.then(() => {
			// Return successful exit
			process.exit();
		})
		.catch(err => {
			console.log(err);
			process.exit(1);
		});
})();
