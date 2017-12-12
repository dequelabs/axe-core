var text = node.textContent;
return !(!text || axe.commons.text.sanitize(text).trim() === '');
