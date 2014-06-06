var title = node.getAttribute('title');
return !!(title ? kslib.text.sanitize(title).trim() : '');
