let label = node.getAttribute('alt');
let text = node.textContent;

return (!!label && axe.commons.text.sanitize(label).trim() !== '' && axe.commons.text.sanitize(text).trim() !== '');
