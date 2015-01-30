(function (global) {
	function noop() {}
	function createObject(type, methods) {
		global[type] = {};
		var o;
		for (var i = 0, l = module.exports[type].length; i < l; i++) {
			o = module.exports[type][i];
			global[type][o.id] = o;
			for (var j = 0, ll = methods.length; j < ll; j++) {
				global[type][o.id][methods[j]] = o[methods[j]] ? new Function('return ' + o[methods[j]])() : null;
			}
		}
	}
	createObject('checks', ['evaluate', 'after', 'matches']);
	createObject('tools', ['source']);
	createObject('rules', ['matches']);
	createObject('classifiers', ['evaluate']);
	createObject('analyzers', ['evaluate']);

}(this));