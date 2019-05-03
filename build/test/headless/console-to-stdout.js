const util = require('util');

const consoleToStdOut = msg => {
	const args = msg._args;
	Promise.all(
		args.map(a => {
			return a.jsonValue();
		})
	).then(args => {
		// process stdout stub
		let isStdout = args[0] === 'stdout:';
		isStdout && (args = args.slice(1));
		//
		let msg = util.format(...args);
		!isStdout && (msg += '\n');
		process.stdout.write(msg);
	});
};

module.exports = consoleToStdOut;
