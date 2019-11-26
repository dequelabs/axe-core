import { getBaseLang, validLangs } from '../core/utils';

// using -> "selector": "html[lang][xml\\:lang]" to narrow down html with lang and xml:lang attributes
function xmlLangMismatchMatches(node, virtualNode, context) {
  // get primary base language for each of the attributes
  const primaryLangValue = getBaseLang(node.getAttribute('lang'));
  const primaryXmlLangValue = getBaseLang(node.getAttribute('xml:lang'));

  // ensure that the value specified is valid lang for both `lang` and `xml:lang`
  return (
  	validLangs().includes(primaryLangValue) &&
  	validLangs().includes(primaryXmlLangValue)
  );
}

export default xmlLangMismatchMatches;