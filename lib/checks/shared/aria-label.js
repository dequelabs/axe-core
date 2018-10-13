const { text, aria } = axe.commons;
return !!text.sanitize(aria.getAriaLabelText(node));
