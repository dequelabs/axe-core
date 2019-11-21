import { CssSelectorParser } from '../imports';

var parser = new CssSelectorParser();
parser.registerSelectorPseudos('not');
parser.registerNestingOperators('>');
parser.registerAttrEqualityMods('^', '$', '*');

export default parser;
