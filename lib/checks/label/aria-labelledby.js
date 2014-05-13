var result = felib.dom.idrefs(node, 'aria-labelledby');

return !!result.length && result.indexOf(null) === -1;