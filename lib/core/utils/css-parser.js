import { CssSelectorParser } from '../imports';

const parser = new CssSelectorParser();
parser.registerSelectorPseudos('not');
parser.registerSelectorPseudos('is');
parser.registerNestingOperators('>');
parser.registerAttrEqualityMods('^', '$', '*', '~');

export default parser;
