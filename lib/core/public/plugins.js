/*eslint no-use-before-define:0 */

function Plugin(spec) {
	this._run = spec.run;
	this._collect = spec.collect;
	this._registry = {};
	spec.commands.forEach(function(command) {
		axe._audit.registerCommand(command);
	});
}

Plugin.prototype.run = function() {
	return this._run.apply(this, arguments);
};

Plugin.prototype.collect = function() {
	return this._collect.apply(this, arguments);
};

Plugin.prototype.cleanup = function(done) {
	var q = axe.utils.queue();
	var that = this;
	Object.keys(this._registry).forEach(function(key) {
		q.defer(function(done) {
			that._registry[key].cleanup(done);
		});
	});
	q.then(function() {
		done();
	});
};

Plugin.prototype.add = function(impl) {
	this._registry[impl.id] = impl;
};

function registerPlugin(plugin) {
	axe.plugins[plugin.id] = new Plugin(plugin);
}

export default registerPlugin;
