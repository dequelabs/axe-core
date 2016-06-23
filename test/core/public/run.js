describe('axe.run', function () {
	'use strict';

	var fixture = document.getElementById('fixture');
	var noop = function () {};
	var origRunRules = axe._runRules;

	beforeEach(function () {
		axe._load({
			rules: [{
				id: 'test',
				selector: '*',
				none: ['fred']
			}],
			checks: [{
				id: 'fred',
				evaluate: function () {
					return true;
				}
			}]
		});
	});

	afterEach(function () {
		fixture.innerHTML = '';
		axe._audit = null;
		axe._runRules = origRunRules;
	});


	it('takes context, options and callback as parameters', function (done) {
		fixture.innerHTML = '<div id="t1"></div>';
		var options = {
			runOnly: {
			    type: 'rule',
			    values: ['test']
			  }
		};

		axe.run(['#t1'], options, function () {
			assert.ok(true, 'test completed');
			done();
		});
	});

	it('sets v1 as the default reporter if audit.reporter is null', function (done) {
		axe._runRules = function (ctxt, opt) {
			assert.equal(opt.reporter, 'v1');
			done();
		};
		axe._audit.reporter = null;
		axe.run(document, noop);
	});

	it('uses the audit.reporter if no reporter is set in options', function (done) {
		axe._runRules = function (ctxt, opt) {
			assert.equal(opt.reporter, 'raw');
			done();
		};
		axe._audit.reporter = 'raw';
		axe.run(document, noop);
	});

	it('does not override if another reporter is set', function (done) {
		axe._runRules = function (ctxt, opt) {
			assert.equal(opt.reporter, 'raw');
			done();
		};
		axe._audit.reporter = null;
		axe.run(document, {reporter: 'raw'}, noop);
	});

	it('uses document as content if it is not specified', function (done) {
		axe._runRules = function (ctxt) {
			assert.equal(ctxt, document);
			done();
		};

		axe.run({ someOption: true }, noop);
	});

	it('uses an object as options if it is not specified', function (done) {
		axe._runRules = function (ctxt, opt) {
			assert.isObject(opt);
			done();
		};
		axe.run(document, noop);
	});

	it('treats objects with include or exclude as the option object', function (done) {
		axe._runRules = function (ctxt) {
			assert.deepEqual(ctxt, {include: '#BoggyB'});
			done();
		};

		axe.run({include: '#BoggyB'}, noop);
	});

	it('treats objects with neither inlude or exclude as the option object', function (done) {
		axe._runRules = function (ctxt, opt) {
			assert.deepEqual(opt.HHG, 'hallelujah');
			done();
		};

		axe.run({HHG: 'hallelujah'}, noop);
	});

	it('does not fail if no callback is specified', function (done) {
		assert.doesNotThrow(function () {
			axe.run(done);
		});
	});

	it('gives errors to the first argument on the callback', function (done) {
		axe._runRules = function (ctxt, opt, resolve, reject) {
			reject('Ninja rope!');
		};

		axe.run({ reporter: 'raw' }, function (err) {
			assert.equal(err, 'Ninja rope!');
			done();
		});
	});

	it('gives results to the second argument on the callback', function (done) {
		axe._runRules = function (ctxt, opt, resolve) {
			resolve('MB Bomb');
		};

		axe.run({ reporter: 'raw' }, function (err, result) {
			assert.equal(err, null);
			assert.equal(result, 'MB Bomb');
			done();
		});
	});


	it('does not run the callback twice if it throws', function (done) {
		var calls = 0;
		axe._runRules = function (ctxt, opt, resolve) {
			resolve([]);
		};

		var log = axe.log;
		axe.log = function (e) {
			assert.equal(e.message, 'err');
			axe.log = log;
		}
		axe.run(function (err, result) {
			calls += 1;
			if (calls === 1) {
				setTimeout(function () {
					assert.equal(calls, 1);
					axe.log = log;
					done();
				}, 20);
			}
			throw new Error('err');
		});
	});

	it('returns a promise if no callback was given',
	(!window.Promise) ? undefined :  function (done) {
		axe._runRules = function (ctxt, opt, resolve) {
			axe._runRules = origRunRules;
			resolve('World party');
		};

		var p = axe.run({ reporter: 'raw' });
		p.then(function (result) {
			assert.equal(result, 'World party');
			done();
		});

		assert.instanceOf(p, window.Promise);
	});

	it('returns an error to catch if axe fails',
	(!window.Promise) ? undefined :  function (done) {
		axe._runRules = function (ctxt, opt, resolve, reject) {
			axe._runRules = origRunRules;
			reject('I surrender!');
		};

		var p = axe.run({ reporter: 'raw' });
		p.then(noop, function (err) {
			assert.equal(err, 'I surrender!');
			done();
		});

		assert.instanceOf(p, window.Promise);
	});


	it('does not error if then() throws',
	(!window.Promise) ? undefined :  function (done) {
		axe._runRules = function (ctxt, opt, resolve) {
			resolve([])
		};

		axe.run()
		.then(function (result) {
			throw new Error('err');
		}, function (e) {
			assert.isNotOk(e, 'Caught callback error in the wrong place');
			done();

		}).catch(function (e) {
			assert.equal(e.message, 'err');
			done();
		});
	});
});
