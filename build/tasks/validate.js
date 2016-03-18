/*jshint node: true */
'use strict';

var revalidator = require('revalidator').validate,
	fs = require('fs'),
	path = require('path');


function fileExists(v, o) {
	var file = path.resolve(path.dirname(o._path), v);
	var exists;
	try {
		exists = fs.existsSync(file);
	} catch(e) {
		return false;
	}
	return exists;
}

function hasUniqueId() {
	var seen = {};
	return function (v, o) {
		if (!seen[v]) {
			seen[v] = o;
			return true;
		}
		return false;
	};
}

function createSchemas() {

	var schemas = {};

	schemas.tool = {
		properties: {
			id: {
				required: true,
				type: 'string',
				conform: hasUniqueId()
			},
			options: {
				type: 'object'
			},
			source: {
				type: 'string',
				required: true,
				conform: fileExists,
				messages: {
					conform: 'File does not exist'
				}
			}
		}
	};

	schemas.check = {
		properties: {
			id: {
				required: true,
				type: 'string',
				conform: hasUniqueId()
			},
			excludeHidden: {
				type: 'boolean'
			},
			evaluate: {
				type: 'string',
				required: true,
				conform: fileExists,
				messages: {
					conform: 'File does not exist'
				}
			},
			matches: {
				type: 'string',
				required: false,
				conform: fileExists,
				messages: {
					conform: 'File does not exist'
				}
			},
			metadata: {
				type: 'object',
				required: true,
				properties: {
					messages: {
						required: true,
						type: 'object',
						properties: {
							fail: {
								required: true,
								type: 'string'
							},
							pass: {
								required: true,
								type: 'string'
							}
						}
					},
					impact: {
						required: true,
						type: 'string',
						enum: ['minor', 'moderate', 'serious', 'critical']
					}
				}
			}
		}
	};

	schemas.rule = {
		seen: {},
		properties: {
			id: {
				required: true,
				type: 'string',
				conform: hasUniqueId()
			},
			selector: {
				type: 'string'
			},
			excludeHidden: {
				type: 'boolean'
			},
			enabled: {
				type: 'boolean'
			},
			pageLevel: {
				type: 'boolean'
			},
			any: {
				type: 'array',
				items: {
					type: ['string', 'object'],
					conform: function (v) {
						if (typeof v === 'string') {
							return true;
						}
						if (typeof v === 'object' && typeof v.id === 'string') {
							return true;
						}
						return false;
					},
					message: 'must be a string or an object with a key of id'
				}
			},
			all: {
				type: 'array',
				items: {
					type: ['string', 'object'],
					conform: function (v) {
						if (typeof v === 'string') {
							return true;
						}
						if (typeof v === 'object' && typeof v.id === 'string') {
							return true;
						}
						return false;
					},
					message: 'must be a string or an object with a key of id'
				}
			},
			none: {
				type: 'array',
				items: {
					type: ['string', 'object'],
					conform: function (v) {
						if (typeof v === 'string') {
							return true;
						}
						if (typeof v === 'object' && typeof v.id === 'string') {
							return true;
						}
						return false;
					},
					message: 'must be a string or an object with a key of id'
				}
			},
			tags: {
				type: 'array',
				items: {
					type: 'string'
				}
			},
			matches: {
				type: 'string',
				required: false,
				conform: fileExists,
				messages: {
					conform: 'File does not exist'
				}
			},
			metadata: {
				type: 'object',
				required: true,
				additionalProperties: false,
				properties: {
					help: {
						required: true,
						type: 'string'
					},
					description: {
						required: true,
						type: 'string'
					}
				}
			}
		}
	};

	return schemas;
}


function validateFiles(grunt, files, schema) {
	var valid = true;
	files.forEach(function (f) {
		f.src.forEach(function (path) {
			var file = grunt.file.readJSON(path);
			file._path = path;
			var result = revalidator(file, schema);

			if (!result.valid) {
				result.errors.forEach(function (err) {
					grunt.log.error(path, err.property + ' ' + err.message);
				});
				valid = false;
			} else {
				grunt.verbose.ok();
			}
		});
	});
	return valid;
}

module.exports = function (grunt) {
	grunt.registerMultiTask('validate', function () {
		var schemas = createSchemas();
		var options = this.options();
		if (!options.type || !schemas[options.type]) {
			grunt.log.error('Please specify a valid type to validate: ' + Object.keys(schemas));
			return false;
		}
		validateFiles(grunt, this.files, schemas[options.type]);
		schemas[options.type].seen = {};
	});
};
