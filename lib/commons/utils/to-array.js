/*global axe */
axe.utils.toArray = function (thing) {
	'use strict';
	return Array.prototype.slice.call(thing);
};