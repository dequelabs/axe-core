const { aria, text } = axe.commons;

const role = aria.getRole(node);
const accText = text.accessibleText(node);

return role === `link` && !!accText;
