/*
 * Test target application that just serves a simple HTML page
 */
require('http').createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end('<!doctype html><html lang="en">' +
		'<head><title>Test Page</title></head>' +
		'<body><div role="main">' +
		'<h1>This is a test</h1><p>This is a test page with no violations</p>' +
		'</div></body></html>');

}).listen('5005');