/*jshint node: true */
'use strict';
var http = require('http');
var Promise = require('promise');
module.exports = function (grunt) {
	function getLine(data, start) {
		var len = data.length;
		var index = start;
		while(index < len) {
			if (data.charAt(index) === '\n') {
				break;
			}
			index += 1;
		}
		var retVal = data.substring(start, index+1);
		return retVal;
	}
	function getEntry(data, start) {
		var entry = [];
		var line;
		var len = data.length;
		var index = start;
		while(index < len) {
			line = getLine(data, index);
			if (line.indexOf('%') === 0) {
				index += line.length;
				// end of entry
				break;
			}
			index += line.length;
			line = line.substring(0, line.length - 1);
			entry.push(line);
		}
		entry.used = index - start;
		return entry;
	}
	function generateOutput(langs, checkPath) {
		var path = checkPath + '.json';
		var check = grunt.file.readJSON(path);
		check.options = langs;
		grunt.file.write(path, JSON.stringify(check, null, ' '));
	}
	grunt.registerMultiTask('langs', function () {
		var done = this.async();
		var ianaLangsURL = 'http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry';
		if (!this.data.check) {
			done(false);
			return;
		}
		var check = this.data.check;
		var langs = [];
		new Promise(function (resolve, reject) {
			var data = '';
			http.get(ianaLangsURL, function(res) {
				res.on('data', function(chunk) {
					data += chunk;
				}).on('end', function () {
					resolve(data);
				});
			}).on('error', function(e) {
				grunt.log.error('Got error: ' + e.message);
				reject(false);
			});
		}).then(function (data) {
			var entry = getEntry(data, 0);
			var pos = entry.used;
			while(true) {
				entry = getEntry(data, pos);
				pos += entry.used;
				if (!entry.used) {
					break;
				}
				if (entry[0] !== 'Type: language') {
					continue;
				}
				var lang = entry[1].replace('Subtag: ', '').trim();
				langs.push(lang);
			}
			generateOutput(langs, check);
		}).then(function () {
			done();
		}).catch(function (result) {
			done(result);
		});
	});
};