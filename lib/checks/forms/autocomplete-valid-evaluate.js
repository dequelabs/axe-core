import { isValidAutocomplete } from '../../commons/text';

function autocompleteValidEvaluate(_node, options, virtualNode) {
  const autocomplete = virtualNode.attr('autocomplete') || '';
  const hasReadonlyAttr = virtualNode.hasAttr('readonly');
  if (hasReadonlyAttr) {
    return true;
  }
  return isValidAutocomplete(autocomplete, options);
}

export default autocompleteValidEvaluate;
