describe('axe.utils.preloadCssom unit tests', function() {
	'use strict';

	var args;

	function addStyleToHead() {
		var css = 'html {font-size: inherit;}';
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');
		style.id = 'preloadCssomTestHeadSheet';
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
		head.appendChild(style);
	}

	function removeStyleFromHead() {
		var s = document.getElementById('preloadCssomTestHeadSheet');
		if (s) {
			s.parentNode.removeChild(s);
		}
	}

	beforeEach(function() {
		addStyleToHead();
		args = {
			asset: 'cssom',
			timeout: 10000,
			treeRoot: (axe._tree = axe.utils.getFlattenedTree(document))
		};
	});

	afterEach(function() {
		removeStyleFromHead();
	});

	it('should be a function', function() {
		assert.isFunction(axe.utils.preloadCssom);
	});

	it('should return a queue', function() {
		var actual = axe.utils.preloadCssom(args);
		assert.isObject(actual);
		assert.containsAllKeys(actual, ['then', 'defer', 'catch']);
	});

	it('should ensure result of cssom is an array of sheets', function(done) {
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				assert.lengthOf(results[0], 2); // returned from queue, hence the index look up
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('ensure that each of the cssom object have defined properties', function(done) {
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				// returned from queue, hence the index look up
				var cssom = results[0];
				assert.lengthOf(cssom, 2);
				cssom.forEach(function(o) {
					assert.hasAllKeys(o, ['root', 'shadowId', 'sheet', 'isExternal']);
				});
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should fail if number of sheets returned does not match stylesheets defined in document', function(done) {
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				assert.isFalse(results[0].length <= 1); // returned from queue, hence the index look up
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	it('should ensure all returned stylesheet is defined and has property cssRules', function(done) {
		var actual = axe.utils.preloadCssom(args);
		actual
			.then(function(results) {
				var sheets = results[0];
				sheets.forEach(function(s) {
					assert.isDefined(s.sheet);
					assert.property(s.sheet, 'cssRules');
				});
				done();
			})
			.catch(function(error) {
				done(error);
			});
	});

	/**
	 * NOTE: document.styleSheets does not recognise dynamically injected stylesheets after load via beforeEach/ before, so tests for disabled and external stylesheets are done in integration
	 * Refer Directory: ./test/full/preload-cssom/**.*
	 */
});
