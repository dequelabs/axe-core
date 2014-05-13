//global felib, module, global

if (typeof module === 'object' && module.exports) {
	module.exports = felib;
} else {
	global.felib = felib;
}