var title = document.title;
return !!(title ? commons.text.sanitize(title).trim() : '');