var parent = axe.commons.dom.getComposedParent(node);

var parentRole = (parent.getAttribute('role') || '').toLowerCase();

var isListRole = parentRole === 'list';

return (
	(['UL', 'OL'].includes(parent.nodeName.toUpperCase()) &&
		(!parentRole || isListRole)) ||
	isListRole
);
