(function(axe) {
	var parser = new axe.imports.CssSelectorParser.CssSelectorParser();
	parser.registerNestingOperators('>');
	axe.utils.cssParser = parser;
})(axe);
