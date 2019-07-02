const { aria, text } = axe.commons;

const role = aria.getRole(node);
const accText = text.accessibleTextVirtual(virtualNode);

return role === `link` && !!accText;
