module.exports = {
	evaluate: 'function (node, options) {\n<%=source%>\n}',
	after: 'function (results, options) {\n<%=source%>\n}',
	gather: 'function (context) {\n<%=source%>\n}',
	matches: 'function (node) {\n<%=source%>\n}',
	source: '(function () {\n<%=source%>\n}())',
	commons: '<%=source%>'
};
