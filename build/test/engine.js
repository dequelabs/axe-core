/*eslint no-unused-vars: ["off"]*/
/*global axe */

var checks;
var commons = axe.commons;
var origLoad = axe._load;
axe._load = function(r) {
	origLoad(r);
	checks = {};
	var props = Object.keys(axe._audit.checks);
	for (var i = 0; i < props.length; i++) {
		var prop = props[i];
		checks[prop] = axe._audit.checks[prop];
	}
};
