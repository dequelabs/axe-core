/*exported Listener */

function Listener(spec) {
  'use strict';
  spec.source = spec.source || {};

  this.id = spec.id;
  this.options = spec.options;
  this._run = spec.source.run;
  this._end = spec.source.end;
  this._control = spec.source.control;
  this._cleanup = spec.source.cleanup;

  this.active = false;
}

Listener.prototype.run = function (options, callback) {
  'use strict';
  options = typeof options === 'undefined' ? this.options : options;

  this.active = true;
  this._run(options, callback);
};

Listener.prototype.cleanup = function (callback) {
  'use strict';

  this.active = false;
  this._cleanup(callback);
};

Listener.prototype.end = function () {
  'use strict';

  this._end();
};

Listener.prototype.control = function (callback) {
  'use strict';

  this._control(callback);
};
