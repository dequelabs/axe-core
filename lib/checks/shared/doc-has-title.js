var title = node.ownerDocument.title;
return !!(title ? kslib.text.sanitize(title).trim() : '');