// TODO: axe.imports

var parser = new axe.imports.CssSelectorParser();
parser.registerSelectorPseudos('not');
parser.registerNestingOperators('>');
parser.registerAttrEqualityMods('^', '$', '*');

export default parser;
