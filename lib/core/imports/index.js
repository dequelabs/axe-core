/* global axe */

// Note: the below is run via `browserify` build task - `build/imports-generator` and output into the `tmp` directory.

axe.imports = {
	axios: require('axios'),
	doT: require('dot')
};
