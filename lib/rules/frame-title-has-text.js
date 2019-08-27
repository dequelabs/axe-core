const { text } = axe.commons;

const name = !!text.sanitize(text.accessibleTextVirtual(virtualNode));
if (!name) {
	return false;
}

return true;
