/*exported text */
var text = commons.text = { EdgeFormDefaults: {} };

// These defaults are only available in IE and Edge
const input = document.createElement('input');
input.type = 'submit';
text.EdgeFormDefaults.submitDefault = input.getAttribute('value');
input.type = 'reset';
text.EdgeFormDefaults.resetDefault = input.getAttribute('value');
