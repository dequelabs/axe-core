var title = node.getAttribute('title');
return !!(title ? commons.text.sanitize(title).trim() : '');
