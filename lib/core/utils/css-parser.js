(function(axe) {
	var parser = new axe.imports.CssSelectorParser();
	parser.registerNestingOperators('>');
	axe.utils.cssParser = parser;
})(axe);
