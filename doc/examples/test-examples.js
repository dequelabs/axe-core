const { readdirSync, statSync } = require('fs');
const { join } = require('path');
const execa = require('execa');
const exampleDirs = readdirSync(__dirname)
	.map(dir => join(__dirname, dir))
	.filter(dir => statSync(dir).isDirectory());

async function runner(dir) {
	const config = { cwd: dir, stdio: 'inherit', shell: true };
	await execa('npm install', config);
	return execa('npm test', config);
}

async function main() {
	for (let i = 0; i < exampleDirs.length; i++) {
		const dir = exampleDirs[i];
		await runner(dir);
	}
}

main();
// process.exit();

// Promise.all(exampleDirs.map(runner))
// 	.then(() => {
// 		// Return successful exit
// 		process.exit();
// 	})
// 	.catch(err => {
// 		console.error(err);
// 		process.exit(1);
// 	});
