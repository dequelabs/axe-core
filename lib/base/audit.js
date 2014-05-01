/*global DqDocument, Rule */
function Audit(frames) {
	'use strict';

	this.rules = [];
	this.document = new DqDocument(document, frames);
}

Audit.prototype.addRule = function (spec) {
	'use strict';

	this.rules.push(new Rule(spec));
};

Audit.prototype.run = function (context, fn) {
	'use strict';

	var q = utils.queue();
	this.rules.forEach(function (rule) {
		q.defer(function (cb) {
			rule.run(context, cb);
		});
	});
	q.then(fn);
};