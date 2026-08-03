import { getBaseLang, isValidLang } from '../core/utils';

function xmlLangMismatchMatches(node, virtualNode) {
  // using -> "selector": "html[lang][xml\\:lang]" to narrow down html with lang and xml:lang attributes

  // get primary base language for each of the attributes
  const primaryLangValue = getBaseLang(virtualNode.attr('lang'));
  const primaryXmlLangValue = getBaseLang(virtualNode.attr('xml:lang'));

  // ensure that the value specified is valid lang for both `lang` and `xml:lang`
  return isValidLang(primaryLangValue) && isValidLang(primaryXmlLangValue);
}

export default xmlLangMismatchMatches;
