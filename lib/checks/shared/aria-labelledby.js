var getIdRefs = axe.commons.dom.idrefs;

return getIdRefs(node, 'aria-labelledby').some((elm) => {
	return (elm && axe.commons.text.accessibleText(elm, true));
});
