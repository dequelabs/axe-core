/*global window, Mocha*/
const setGlobals = reporter => {
	/**
	 * Set helper boolean to assert if tests are running in headless mode
	 */
	Object.defineProperty(window, 'isAxeHeadlessMode', {
		value: true,
		writable: false,
		configurable: false
	});

	/**
	 * Shim `mocha` runner, to allow for collecting results
	 */
	Object.defineProperty(window, 'mocha', {
		configurable: true,
		get: () => {
			return undefined;
		},
		set: mocha => {
			shimMochaInstance(mocha);
			delete window.mocha;
			window.mocha = mocha;
		}
	});
	function shimMochaInstance(mocha) {
		const originalReporter = mocha.reporter.bind(mocha);
		let reporterIsChanged = false;

		mocha.reporter = (...args) => {
			reporterIsChanged = true;
			originalReporter(...args);
		};

		const run = mocha.run.bind(mocha);

		mocha.run = () => {
			const all = [];
			const pending = [];
			const failures = [];
			const passes = [];

			function error(err) {
				if (!err) {
					return {};
				}

				let res = {};
				Object.getOwnPropertyNames(err).forEach(key => (res[key] = err[key]));
				return res;
			}

			function clean(test) {
				return {
					title: test.title,
					fullTitle: test.fullTitle(),
					duration: test.duration,
					err: error(test.err)
				};
			}

			function result(stats) {
				return {
					result: {
						stats: {
							tests: all.length,
							passes: passes.length,
							pending: pending.length,
							failures: failures.length,
							start: stats.start.toISOString(),
							end: stats.end.toISOString(),
							duration: stats.duration
						},
						tests: all.map(clean),
						pending: pending.map(clean),
						failures: failures.map(clean),
						passes: passes.map(clean)
					},
					coverage: window.__coverage__
				};
			}

			function setResult() {
				!window.__mochaResult__ &&
					(window.__mochaResult__ = result(this.stats));
			}

			!reporterIsChanged &&
				mocha.setup({
					reporter: Mocha.reporters[reporter] || Mocha.reporters.spec
				});

			const runner = run(() => setTimeout(() => setResult.call(runner), 0))
				.on('pass', test => {
					passes.push(test);
					all.push(test);
				})
				.on('fail', test => {
					failures.push(test);
					all.push(test);
				})
				.on('pending', test => {
					pending.push(test);
					all.push(test);
				})
				.on('end', setResult);

			return runner;
		};
	}

	/**
	 * Shim `Mocha` process
	 */
	Object.defineProperty(window, 'Mocha', {
		configurable: true,
		get: () => {
			return undefined;
		},
		set: Mocha => {
			shimMochaProcess(Mocha);
			delete window.Mocha;
			window.Mocha = Mocha;
		}
	});
	function shimMochaProcess(Mocha) {
		/**
		 * Mocha needs `process.stdout.write` to change the cursor position.
		 */
		!Mocha.process && (Mocha.process = {});
		!Mocha.process.stdout && (Mocha.process.stdout = {});

		Mocha.process.stdout.write = data => console.log('stdout:', data);

		Mocha.reporters.Base.useColors = true;

		Mocha.reporters.none = runner => {
			Mocha.reporters.Base.call(this, runner);
		};
	}
};

module.exports = setGlobals;
