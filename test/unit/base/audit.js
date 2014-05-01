/*global Audit, DqDocument, mockRules */
describe('Audit', function () {
	'use strict';

	var fixture = document.getElementById('fixture');

	afterEach(function () {
		fixture.innerHTML = '';
	});


	it('should be a function', function () {
		assert.isFunction(Audit);
	});

	describe('document', function () {
		it('should create a document based on the current window.document', function () {
			assert.deepEqual(new Audit({}).document, new DqDocument(document));
		});
	});

	it('should work', function (done) {
		fixture.innerHTML = '<input type="text" aria-label="monkeys">' +
			'<div id="monkeys">bananas</div>' +
			'<input type="text" aria-labelledby="monkeys">' +
			'<blink>FAIL ME</blink>';
		var a = new Audit();
		mockRules.forEach(function (rule) {
			a.addRule(rule);
		});
		a.run(document, function (result) {
			console.log(result);
			assert.ok('yay');
			done();
		});
	});


});