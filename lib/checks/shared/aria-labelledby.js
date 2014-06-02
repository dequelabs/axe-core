var result = kslib.dom.idrefs(node, 'aria-labelledby');

return !!result.length && result.indexOf(null) === -1;