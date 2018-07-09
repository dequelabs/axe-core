/*eslint-env node */
const UglifyJS = require('uglify-js');

module.exports = grunt => {
	grunt.registerTask(
		'generate-imports',
		'Task for generating an axe.imports module with external dependencies.',
		function() {
			const done = this.async();
			// list of external dependencies,
			// which needs to be added to axe.imports object
			const LIBS_TO_IMPORT = {
				axios: './node_modules/axios/dist/axios.js'
			};

			// Convenience method that utilises uglifyjs tree-transformer to unwrap umd module resolver
			const removeUMD = new UglifyJS.TreeTransformer(node => {
				// Reference: http://lisperator.net/uglifyjs/transform
				const funcCall = new UglifyJS.AST_Call({
					expression: node.body[0].body.args[1],
					args: node.body[0].body.args[1].argnames // pass arguments into self invoking func
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
					/typeof define/ &&
					/typeof module/
				);
			};

			const writeLibrary = (libName, factory) => {
				const lib = `/* global axe */ axe.imports["${libName}"] = ${factory}`;
				const location = `./lib/core/imports/${libName}.js`;
				grunt.file.write(location, lib);
			};

			/**
			 * Process a given library to unwrapped UMD module if exists, and return the factory
			 * @param {string} libName name of the library
			 * @param {string} sourceUrl path to the distributable of the library
			 */
			const processImport = (libName, sourceUrl) => {
				const sourceCode = grunt.file.read(sourceUrl);
				if (hasUmdWrapper(sourceCode)) {
					unwrappedCode(sourceCode, (err, factory) => {
						if (err) {
							throw new Error(err);
						}
						writeLibrary(libName, factory);
					});
				} else {
					// assumption is that the library returns an IIFE
					writeLibrary(libName, sourceCode);
				}
			};

			// Iterate through each library to import and process the code
			Object.keys(LIBS_TO_IMPORT).forEach(key => {
				processImport(key, LIBS_TO_IMPORT[key]);
			});

			done();
		}
	);
};
