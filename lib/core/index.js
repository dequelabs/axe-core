/*exported axe, commons */
/*global axeFunction, module, define */
// exported namespace for aXe
var axe = axe || {};
axe.version = '<%= pkg.version %>';

if (typeof define === 'function' && define.amd) {
    this.axe = axe;
    define(axe);
}
if (typeof module === 'object' && module.exports && typeof axeFunction.toString === 'function') {
    axe.source = '(' + axeFunction.toString() + ')(this, this.document);';
    module.exports = axe;
}
if (typeof window.getComputedStyle === 'function') {
    window.axe = axe;
}
// local namespace for common functions
var commons;

/*jshint ignore:start */
var define = undefined;
var require = undefined;
/*jshint ignore:end */
