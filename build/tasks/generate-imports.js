/*eslint-env node */
const UglifyJS = require('uglify-js');
const assert = require('assert');

module.exports = grunt => {
	grunt.registerMultiTask(
		'generate-imports',
		'Task for generating an axe.imports module with external dependencies.',
		function() {
			// Convenience method that utilises uglifyjs tree-transformer to unwrap umd module resolver
			const removeUMD = new UglifyJS.TreeTransformer(node => {
				if (node.body[0].body.args.length <= 0) {
					throw new Error('Not a UMD wrapper as arguments are missing.');
				}

				// the last (or only) argument in umd resolver is the factory to be mounted
				const umdFactory =
					node.body[0].body.args[node.body[0].body.args.length - 1];
				const funcCall = new UglifyJS.AST_Call({
					expression: umdFactory,
					args: umdFactory.argnames // pass arguments into self invoking func
				});
				const statement = new UglifyJS.AST_SimpleStatement({
					body: funcCall,
					start: {
						comments_before: node.start.comments_before // bring over comments
					}
				});
				return new UglifyJS.AST_Toplevel({ body: [statement] });
			});

			// Convenience method that uses uglifyjs to parse a given code and run a transformer
			const unwrappedCode = (sourceCode, cb) => {
				try {
					const unWrappedCode = UglifyJS.parse(sourceCode)
						.transform(removeUMD)
						.print_to_string({ comments: true });
					cb(null, unWrappedCode);
				} catch (e) {
					cb(e, null);
				}
			};

			const hasUmdWrapper = sourceCode => {
				return (
					/typeof exports/.test(sourceCode) &&
					/typeof define/.test(sourceCode) &&
					/typeof module/.test(sourceCode)
				);
			};

			const writeLibrary = (libName, factory) => {
				const lib = `axe.imports["${libName}"] = ${factory}`;
				const location = `./lib/core/imports/${libName}.js`;
				grunt.file.write(location, lib);
			};

			/**
			 * Process a given library to unwrapped UMD module if exists, and return the factory
			 * @param {string} libName name of the library
			 * @param {string} sourceCode source code for the library
			 * @param {Object} [options] Optional options
			 * @property {Boolean} umd Does the library contain a UMD wrapper
			 * @property {String} global The library's global (`window.myLibrary`)
			 */
			const processImport = (libName, sourceCode, options) => {
				const hasUMD = options ? options.umd : hasUmdWrapper(sourceCode);
				const global = options && options.global;

				if (hasUMD) {
					// If the library has a "standard" UMD wrapper, we'll remove it
					// and expose the library directly.
					unwrappedCode(sourceCode, (err, factory) => {
						if (err) {
							// running uglifyjs transform in a try block, this is to catch any errors from the transform.
							throw new Error(err);
						}
						writeLibrary(libName, factory);
					});
				} else if (global) {
					// The global variable exposed by the library. This is not necessarily the same as "libName".
					const libraryGlobal = global;

					// We wrap the library's source code in an IFFE which voids
					// existing globals (module, define, process, etc.) forces and
					// forces it to export a global.
					//
					// This method should only be used for "universal" code that
					// follows the same code paths for all environments (Node,
					// browser, etc). If there are different paths for different
					// envs, the UMD method should be used instead.
					const wrappedLibrary = `
						(function (module, exports, define, require, process) {
							// Get a reference to the "true" global scope. This works in
							// ES5's "strict mode", browsers, node.js and other environments.
							var global = Function('return this')();

							// If there was a global prior to our script, make sure we
							// "save" it (think "$.noConflict()").
							var __old_global__ = global["${libraryGlobal}"];

							${sourceCode}

							// Preserve a reference to the library and remove it from
							// the global scope.
							var lib = global["${libraryGlobal}"];
							delete global["${libraryGlobal}"];

							// Reset a previous global when applicable.
							if (__old_global__) {
								global["${libraryGlobal}"] = __old_global__;
							}

							// Return the library to populate "axe.imports".
							return lib;
						})();
					`;
					writeLibrary(libName, wrappedLibrary);
				} else {
					// assumption is that the library returns an IIFE
					writeLibrary(libName, sourceCode);
				}
			};

			// Iterate through each library to import and process the code
			for (const name in this.data) {
				const val = this.data[name];
				if (typeof val === 'string') {
					// Provided a path to a file with no options
					const sourceCode = grunt.file.read(val);
					processImport(name, sourceCode);
				} else if (typeof val === 'object') {
					// Provided an object with options
					const { file, umd, global } = val;
					assert(file, 'File required');
					const sourceCode = grunt.file.read(file);
					processImport(name, sourceCode, { umd, global });
				} else {
					grunt.fail.warn(`Unsupported generate-import: "${name}"`);
				}
			}
		}
	);
};
