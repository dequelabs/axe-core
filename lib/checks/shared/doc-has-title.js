var title = node.ownerDocument.title;
return !!(title ? commons.text.sanitize(title).trim() : '');