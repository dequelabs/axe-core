import { CssSelectorParser } from 'css-selector-parser';

const parser = new CssSelectorParser();
parser.registerSelectorPseudos('not');
parser.registerSelectorPseudos('is');
parser.registerSelectorPseudos('root');
parser.registerNestingOperators('>');
parser.registerAttrEqualityMods('^', '$', '*', '~');

export default parser;
