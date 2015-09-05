var axe = axe || {};
axe.plugins = {};

function Plugin(spec) {
	'use strict';
	this._run = spec.run;
	this._registry = {};
	spec.commands.forEach(function (command) {
		axe._audit.registerCommand(command);
	});
}

Plugin.prototype.run = function () {
	'use strict';
	return this._run.apply(this, arguments);
};

Plugin.prototype.add = function (impl) {
	'use strict';
	this._registry[impl.id] = impl;
};

axe.registerPlugin = function (plugin) {
	'use strict';
	axe.plugins[plugin.id] = new Plugin(plugin);
};