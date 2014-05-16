//global kslib, module, global

if (typeof module === 'object' && module.exports) {
	module.exports = kslib;
} else {
	global.kslib = kslib;
}
