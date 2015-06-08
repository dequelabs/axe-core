/*exported axe, require, define, commons */
// exported namespace for aXe
var axe = {};

// local namespace for common functions
var commons;

// locally override require and define to prevent conflicts with pages utilizing RequireJS
var require, define;
