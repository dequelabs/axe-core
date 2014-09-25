/* jshint node: true, -W054 */
'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var buildRules = require('../../build/build-rules');

var grunt = {
	file: {
		expand: function () {
		},
		readJSON: function () {
		},
		read: function () {
		}
	},
	template: {
		process: function () {
		}
	}
};

var areaAlt = {
	'id': 'area-alt',
	'selector': 'map area[href]',
	'excludeHidden': false,
	'checks': [
		'aria-label'

	],
	'tags': [
		'wcag2a',
		'wcag111',
		'section508',
		'section508a'
	],
	'metadata': {
		'helpUrl': 'https://dequeuniversity.com/courses/html-css/images/image-maps',
		'help': 'Active <area> elements need alternate text',
		'description': 'Checks the <area> elements of image maps to ensure that they have an alternative text'
	}
};

var ariaAllowedAttr = {
	'id': 'aria-allowed-attr',
	'checks': [
		'aria-allowed-attr'
	],
	'tags': [
		'wcag2a',
		'wcag411'
	],
	'metadata': {
		'helpUrl': 'https://dequeuniversity.com/issues/aria-allowed-attr',
		'help': 'ARIA attributes not allowed for role assigned to this element',
		'description': 'Checks all attributes that start with \'aria-\' to ensure that they are all official WAI-ARIA attributes'
	}
};

var allowedAttr = {
	'id': 'aria-allowed-attr',
	'matches': 'allowed-attr-matches.js',
	'evaluate': 'allowed-attr.js',
	'metadata': {
		'failureMessage': 'ARIA attribute{{=it.data && it.data.length > 1 ? \'s are\' : \' is\'}} not allowed:{{~it.data:value}} {{=value}}{{~}}'
	}
};

var ariaLabel = {
	'id': 'aria-label',
	'evaluate': 'aria-label.js',
	'metadata': {
		'failureMessage': 'aria-label attribute does not exist or is empty'
	}
};

var ariaLabelBody = 'fred';
var allowedAttrMatchesBody = 'bob';
var allowedAttrBody = 'joe';

var failureSummary = {
	'type': 'FAIL',
	'metadata': {
		'failureMessage': 'Fix all of the following:{{~it:value}}\n  {{=value.split(\'\\n\').join(\'\\n  \')}}{{~}}'
	}
};

describe('buildRules', function () {

	beforeEach(function () {
		var expandStub = sinon.stub(grunt.file, 'expand');
		expandStub.onFirstCall().returns(['lib/rules/area-alt.json', 'lib/rules/aria-allowed-attr.json']);
		expandStub.onSecondCall().returns(['lib/checks/aria/allowed-attr.json', 'lib/checks/shared/aria-label.json']);
		expandStub.onThirdCall().returns(['lib/misc/fail-failure-summary.json']);

		var readJSONStub = sinon.stub(grunt.file, 'readJSON');
		readJSONStub.onFirstCall().returns(areaAlt);
		readJSONStub.onSecondCall().returns(ariaAllowedAttr);
		readJSONStub.onThirdCall().returns(allowedAttr);
		readJSONStub.onCall(3).returns(ariaLabel);
		readJSONStub.onCall(4).returns(failureSummary);

		var readStub = sinon.stub(grunt.file, 'read');
		readStub.returns('');

		var processStub = sinon.stub(grunt.template, 'process');
		processStub.withArgs('function (node) {\n<%=source%>\n}', {data: {source: ''}}).returns('function (node) {' + allowedAttrMatchesBody + '}');
		processStub.withArgs('function (node, options) {\n<%=source%>\n}', {data: {source: ''}}).onFirstCall().returns('function (node, options) {' + ariaLabelBody + '}');
		processStub.withArgs('function (node, options) {\n<%=source%>\n}', {data: {source: ''}}).onSecondCall().returns('function (node, options) {' + allowedAttrBody + '}');
		processStub.withArgs('this is a fancy template', {data: {source: ''}}).returns('');

	});

	afterEach(function () {
		grunt.file.read.restore();
		grunt.file.readJSON.restore();
		grunt.file.expand.restore();
		grunt.template.process.restore();
	});

	it('verify rules and checks mapping', function () {

		var options = {
			rules: ['lib/rules/**/*.json'],
			checks: ['lib/checks/**/*.json'],
			misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			version: 'dev',
			tags: ''
		};

		var compiledStuff = buildRules(grunt, options);

		var v = new Function('return ' + compiledStuff.rules)();
		v.rules.forEach(function (rule) {
			if (rule.id === 'area-alt') {
				assert.equal(rule.checks[0].id, 'aria-label');
				assert.equal(rule.checks[0].evaluate.toString(), 'function (node, options) {' + ariaLabelBody + '}');
			} else if (rule.id === 'aria-allowed-attr') {
				assert.equal(rule.checks[0].id, 'aria-allowed-attr');
				assert.equal(rule.checks[0].matches.toString(), 'function (node) {' + allowedAttrMatchesBody + '}');
				assert.equal(rule.checks[0].evaluate.toString(), 'function (node, options) {' + allowedAttrBody + '}');
			}
		});
	});

	it('verify rules disable', function () {

		var options = {
			rules: ['lib/rules/**/*.json'],
			checks: ['lib/checks/**/*.json'],
			misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			version: 'dev',
			tags: 'bob'
		};

		var compiledStuff = buildRules(grunt, options);

		var v = new Function('return ' + compiledStuff.rules)();
		v.rules.forEach(function (rule) {
			assert.notOk(rule.enabled);
		});
	});

	it('missing check', function () {

		var options = {
			rules: ['lib/rules/**/*.json'],
			checks: ['lib/checks/**/*.json'],
			misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			version: 'dev',
			tags: ''
		};
		grunt.file.readJSON.onCall(3).returns('');
		try {
			buildRules(grunt, options);
			assert.ok(false);
		} catch (e) {
			assert.ok(true);
		}

	});

	it('verify failure summaries', function () {
		var options = {
			rules: ['lib/rules/**/*.json'],
			checks: ['lib/checks/**/*.json'],
			misc: ['lib/misc/**/*.json'],
			blacklist: ['metadata'],
			version: 'dev',
			tags: ''
		};

		var compiledStuff = buildRules(grunt, options);

		var v = new Function('return ' + compiledStuff.rules)();
		assert.isNotNull(v.data.failureSummaries.FAIL);
		assert.equal(typeof v.data.failureSummaries.FAIL.failureMessage, 'function');
	});

});

