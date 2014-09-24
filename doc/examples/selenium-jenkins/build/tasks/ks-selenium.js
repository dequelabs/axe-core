/*jshint node: true, maxstatements: 56, maxcomplexity: 11 */
'use strict';

var WebDriver = require('selenium-webdriver'),
	SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
	path = require('path'),
	ksInject = require('../inject'),
	ks = path.resolve(__dirname, '../../../../../kensington.min.js'),
	jar = path.resolve(__dirname, '../../build/selenium-server-standalone-2.41.0.jar');


var tagsToReplace = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'.': '&#46;'
};

function replaceTag(tag) {
	return tagsToReplace[tag] || tag;
}

function safeTagsReplace(str) {
	if (str) {
		return str.replace(/[&<>.]/g, replaceTag);
	} else {
		return '';
	}
}

module.exports = function (grunt) {
	var ksSource = grunt.file.read(ks);
	grunt.registerMultiTask('ks-selenium', function () {

		var done = this.async(),
			count = this.data.length;

		// start the selenium server
		var server = new SeleniumServer(jar, {
			port: 4444,
			args: ['-Xmx512m']
		});

		server.start();

		var driver = new WebDriver.Builder()
			.usingServer(server.address())
			.withCapabilities(WebDriver.Capabilities.firefox())
			.build();


		driver.manage().timeouts().setScriptTimeout(10000);

		this.data.forEach(function (testUrl) {
			driver.get(testUrl)
				.then(function () {
					ksInject(ksSource, driver, function () {
						driver.executeAsyncScript(function () {
							/*global document, dqre, window */
							var callback = arguments[arguments.length - 1];
							dqre.a11yCheck(document, null, function (results) {
								callback({results: results, url: window.location.href});
							});
						})
						.then(function (result) {
							var violations = result.results.violations;
							var passes = result.results.passes;
							var rules = {};
							var totalTests = 0;
							var totalRules = 0;
							var totalErrors = 0;
							var site = result.url.replace(/[^a-z0-9]/gi, '-')
								.replace(/-{2,}/g, '-').replace(/^-|-$/g, '').toLowerCase();

							var i, j, nodes, start;
							for (i = 0; i < violations.length; i++) {
								rules[violations[i].id] = {};
								rules[violations[i].id].name = violations[i].id;
								rules[violations[i].id].label = violations[i].help;
								rules[violations[i].id].testCases = violations[i].nodes.length;
								totalTests += violations[i].nodes.length;
								totalRules++;
								nodes = violations[i].nodes;
								rules[violations[i].id].errors = [];
								for (j = 0; j < nodes.length; j++) {
									rules[violations[i].id].errors[j] = {messages: nodes[j].failureSummary, target: nodes[j].target};
								}
								rules[violations[i].id].errorCount = nodes.length;
								totalErrors += nodes.length;
							}
							for (i = 0; i < passes.length; i++) {
								if (rules[passes[i].id]) {
									rules[passes[i].id].testCases += passes[i].nodes.length;
								} else {
									totalRules++;
									rules[passes[i].id] = {};
									rules[passes[i].id].name = passes[i].id;
									rules[passes[i].id].label = passes[i].help;
									rules[passes[i].id].errors = [];
									rules[passes[i].id].errorCount = 0;
									rules[passes[i].id].testCases = passes[i].nodes.length;
								}
								nodes = passes[i].nodes;
								start = rules[passes[i].id].errors.length;
								for (j = start; j < start + nodes.length; j++) {
									rules[passes[i].id].errors[j] = {messages: [], target: nodes[j - start].target};
								}
								totalTests += passes[i].nodes.length;
							}
							var report = '<testsuites failures="' + totalErrors + '" errors="0" tests="' + totalTests + '">';

							for (var rule in rules) {
								if (rules.hasOwnProperty(rule)) {
									report += '<testsuite failures="' + rules[rule].errorCount + '" errors="0" tests="' +
										rules[rule].errors.length + '" package="' + rules[rule].name + '">';
									var testCase;
									for (i = 0; i < rules[rule].errors.length; i++) {
										testCase = '<testcase name="' + safeTagsReplace(rules[rule].label) + '[' +
											safeTagsReplace(rules[rule].errors[i].target.toString()) + ']" classname="' +
											rules[rule].name + '.' + site + '">';

										if (rules[rule].errors[i].messages) {
											testCase += '<failure type="failure">';
											testCase += safeTagsReplace(rules[rule].errors[i].messages[j]) + '\n';
											testCase += '</failure>';
										}
										testCase += '</testcase>';
										report += testCase;
									}
									report += '</testsuite>';

								}
							}

							report += '</testsuites>';
							grunt.file.write(site + '.xml', report);

							if (!--count) {
								driver.quit().then(function () {
									server.stop();
									done();
								});
							}
						});

					});
				});
		});

	});
};