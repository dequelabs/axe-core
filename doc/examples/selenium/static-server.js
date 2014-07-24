var st = require('st');
var http = require('http');

module.exports = function (path, port) {
	return http.createServer(
		st(path)
	).listen(port);
};