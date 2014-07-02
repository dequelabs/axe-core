/*jshint node: true */
'use strict';

var validateProperties = function (actual, expected, objName, error) {
	for (var prop in actual) {
		if (expected.indexOf(prop) === -1) {
			error('Invalid "' + prop + '" property on ' + objName);
		}
	}
};

var verifyString = function(val, name, error) {
	if (val && typeof val !== 'string') {
		error('The "' + name + '" property must be a string');
	}
};

module.exports = function (grunt) {
	grunt.registerMultiTask('validatechecks', function() {
		var success = true;
		this.files.forEach(function (f) { 
			f.src.map(function(filepath) {
				var error = function (msg) {
					grunt.log.error(filepath + ': ' + msg);
					success = false;
				};

				//verify legit JSON
				var check;
				try {
					check = grunt.file.readJSON(filepath);
				} catch (e) {
					error('Invalid JSON');
					return;
				}

				//verify that mandatory elements are there
				if (!check.id) { error('Missing required "id" property'); }
				if (!check.help) { error('Missing required "help" property'); }
				if (!check.evaluate) { error('Missing required "evaluate" property'); }

				//verify that simple elements are the correct type
				verifyString(check.id, 'id', error);
				verifyString(check.help, 'help', error);
				verifyString(check.selector, 'selector', error);
				verifyString(check.evaluate, 'evaluate', error);
				verifyString(check.after, 'after', error);
				verifyString(check.matches, 'matches', error);
				verifyString(check.type, 'type', error);

				//verify that non-permitted elements are not there
				validateProperties(check, ['id', 'help', 'evaluate', 'after', 'selector', 'type', 'matches', 'options'], 'check', error);

				grunt.verbose.ok(filepath + ": Checked");
			});
		});
		return success;
	});


	grunt.registerMultiTask('validaterules', function () {
		var success = true;
		this.files.forEach(function (f) {
			f.src.map(function (filepath) {
				var error = function (msg) {
					grunt.log.error(filepath + ': ' + msg);
					success = false;
				};

				//verify legit JSON
				var rule;
				try {
					rule = grunt.file.readJSON(filepath);
				} catch (e) {
					error('Invalid JSON');
					return;
				}

				//verify that mandatory elements are there
				if (!rule.id) { error('Missing required "id" property'); }
				if (!rule.help) { error('Missing required "help" property'); }
				if (!rule.checks) { error('Missing required "checks" property'); }
				if (!rule.tags) { error('Missing required "tags" property'); }

				//verify that simple elements are the correct type
				verifyString(rule.id, 'id', error);
				verifyString(rule.help, 'help', error);
				verifyString(rule.selector, 'selector', error);

				//verify that pageLevel is true or false, as a string
				if (rule.pageLevel && rule.pageLevel !== 'true' && rule.pageLevel !== 'false') {
					error('The "pageLevel" property must be "true" or "false"');
				}

				//verify that 'tags' is an array of strings
				if (rule.tags) {
					if (!Array.isArray(rule.tags)) {
						error('The "tags" property must be an array');
					} else {
						rule.tags.map(function (t) {
							if (typeof t !== 'string') {
								error('Elements of the "tags" array must be strings');
							}
						});
					}
				}

				//verify that non-permitted elements are not there
				validateProperties(rule, ['id', 'help', 'checks', 'tags', 'selector', 'pageLevel'], 'rule', error);

				//verify that checks is an array of the right things	
				if (rule.checks) {
					if (!Array.isArray(rule.checks)) {
						error('The "checks" property must be an array');
					} else {
						rule.checks.map(function (c) {
							if (typeof c !== 'object' && typeof c !== 'string') {
								error('Elements of the "checks" array must be strings or objects');
							}

							if (typeof c === 'object') {
								if (!c.id) { error('Missing required "id" property on check'); }
								verifyString(c.id, 'checks.id', error);
								validateProperties(c, ['id', 'options'], 'check', error);
							}
						});
					}
				}

				grunt.verbose.ok(filepath + ": Checked");
			});
		});
		return success;
	});
};
