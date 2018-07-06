/*eslint-env node */
module.exports = grunt => {
	grunt.registerTask(
		'generate-imports',
		'Task for generating an axe.imports module with external dependencies.',
		() => {
			// list of external dependencies, which needs to be added to axe.imports object
			const LIBS_TO_IMPORT = {
				axios: './node_modules/axios/dist/axios.js'
			};

			// convenience method to generate content of library to import
			// concerned library is exposed to axe.imports, axe.imports.axios
			// and if the library is mounted to window object, it is then deleted
			const getLibContent = (library, source) => {
				return `
				/* global axe, axios */
				axe.imports["${library}"] = (function() {
					let externalExistence = window["${library}"];
					${grunt.file.read(source)} 

					if(window["${library}"]) {
						delete window["${library}"];
					}
					if (externalExistence) {
						window["${library}"] = externalExistence
					}
					return ${library};
				})();
				`;
			};

			// const dismountGlobals = () => {
			// 	if(window["${library}"]) {
			// 		delete window["${library}"];
			// 	}
			// }

			// const getContent = (library, source) => {
			return `
				/* global axe, axios */
				axe.imports["${library}"] = (function() {
					let externalExistence = window["${library}"];
					${grunt.file.read(source)} 

					if(window["${library}"]) {
						delete window["${library}"];
					}
					if (externalExistence) {
						window["${library}"] = externalExistence
					}
					return ${library};
				})();
				`;
			// }

			// iterate every library to import
			const globalLibs = Object.keys(LIBS_TO_IMPORT);

			const result = globalLibs.reduce((out, key) => {
				const content = getLibContent(key, LIBS_TO_IMPORT[key]);
				out.push(content);
				return out;
			}, []);

			grunt.file.write('./lib/core/imports/all.js', result.join('\n'));
		}
	);
};
