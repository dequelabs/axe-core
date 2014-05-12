var result = felib.dom.idrefs(node, 'aria-labelledby');

return result.indexOf(null) === -1 && !!result.trim();