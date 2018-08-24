const { dom, aria } = axe.commons;
const id = node.getAttribute('id').trim();
const idSelector = `*[id="${axe.utils.escapeSelector(id)}"]`;
const idMatchingElms = Array.from(
	dom.getRootNode(node).querySelectorAll(idSelector)
);

return idMatchingElms.some(dom.isFocusable) && !aria.isAccessibleRef(node);
