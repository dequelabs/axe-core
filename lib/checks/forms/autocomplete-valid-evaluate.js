import { isValidAutocomplete } from '../../commons/text';

function autocompleteValidEvaluate(_node, options, virtualNode) {
  const autocomplete = virtualNode.attr('autocomplete') || '';
  return isValidAutocomplete(autocomplete, options);
}

export default autocompleteValidEvaluate;
