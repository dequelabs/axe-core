/*exported Tool */

function Tool(spec) {
  'use strict';

  this.id = spec.id;
  this.options = spec.options;
  this._run = spec.run;
  this._cleanup = spec.cleanup;

  this.active = false;
}

Tool.prototype.run = function (element, options, callback) {
  'use strict';
  options = typeof options === 'undefined' ? this.options : options;

  this.active = true;
  this._run(element, options, callback);
};

Tool.prototype.cleanup = function (callback) {
  'use strict';

  this.active = false;
  this._cleanup(callback);
};
