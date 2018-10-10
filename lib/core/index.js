/*exported axe, commons */
/*global axeFunction, module, define */
// exported namespace for aXe
/*eslint no-use-before-define: 0, no-unused-vars: 0*/
var axe = axe || {};
axe.version = '<%= pkg.version %>';

// Feature-test a few native methods. This allows axe to exit early
// with a helpful error message if the page is either missing
// required JavaScript features, or has overwritten them with
// broken code (see https://github.com/dequelabs/axe-core/issues/1136).

let testResult;

// Array.prototype.some
if (typeof [].some !== 'function' || ![1, 2, 3, 4, 5].some(e => e % 2 === 0)) {
	throw new SupportError('Array#some');
}

// Array.prototype.reduce
if (
	typeof [].reduce !== 'function' ||
	[1, 2, 3, 4].reduce((p, c) => p + c) !== 10
) {
	throw new SupportError('Array#reduce');
}

// Array.protoype.find
if (typeof [].find !== 'function' || [1, 11, 111].find(e => e > 10) !== 11) {
	throw new SupportError('Array#find');
}

// Array.protoype.filter
if (
	typeof [].filter !== 'function' ||
	((testResult = [0, 1].filter(x => x)),
	testResult && testResult.join('') !== '1')
) {
	throw new SupportError('Array#filter');
}

// Array.protoype.map
if (
	typeof [].map !== 'function' ||
	((testResult = [1, 2].map(e => e + 1)),
	testResult && testResult.join('') !== '23')
) {
	throw new SupportError('Array#map');
}

// Array.protoype.includes
if (typeof [].includes !== 'function' || ![1, 2, 3].includes(2)) {
	throw new SupportError('Array#includes');
}

// Object.assign
if (
	typeof Object.assign !== 'function' ||
	((testResult = Object.assign({}, { foo: true }, { foo: 'bar' })),
	testResult && testResult.foo !== 'bar')
) {
	throw new SupportError('Object.assign');
}

// Object.keys
if (
	typeof Object.keys !== 'function' ||
	((testResult = Object.keys({ foo: 1, bar: 2 })),
	testResult && testResult.join('') !== 'foobar')
) {
	throw new SupportError('Object.keys');
}

if (typeof define === 'function' && define.amd) {
	// Explicitly naming the module to avoid mismatched anonymous define() modules when injected in a page
	define('axe-core', [], function() {
		'use strict';
		return axe;
	});
}
if (
	typeof module === 'object' &&
	module.exports &&
	typeof axeFunction.toString === 'function'
) {
	axe.source =
		'(' +
		axeFunction.toString() +
		')(typeof window === "object" ? window : this);';
	module.exports = axe;
}
if (typeof window.getComputedStyle === 'function') {
	window.axe = axe;
}
// local namespace for common functions
var commons;

function SupportError(error) {
	if (typeof error === 'string') {
		error = { cause: error };
	}
	this.name = 'SupportError';
	this.cause = error.cause;
	this.message = `\`${
		error.cause
	}\` - feature unsupported in your environment.`;
	if (error.ruleId) {
		this.ruleId = error.ruleId;
		this.message += ` Skipping ${this.ruleId} rule.`;
	}
	this.stack = new Error().stack;
}
SupportError.prototype = Object.create(Error.prototype);
SupportError.prototype.constructor = SupportError;
