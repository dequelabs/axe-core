const landmarks = axe.commons.aria.getRolesByType('landmark');
const sectioning = ['article', 'aside', 'main', 'navigation', 'section'];
const nodeIsHeader = node.tagName.toLowerCase() === 'header' && node.getAttribute('role') !== 'banner';
const nodeIsFooter = node.tagName.toLowerCase() === 'footer' && node.getAttribute('role') !== 'contentinfo';
var parent = axe.commons.dom.getComposedParent(node);

while (parent) {
	var parentRole = parent.getAttribute('role');
	if (!parentRole && (parent.tagName.toLowerCase() !== 'form')) {
		parentRole = axe.commons.aria.implicitRole(parent);
	}
  if (parentRole && (nodeIsHeader || nodeIsFooter) && sectioning.includes(parentRole)) {
		return true;
  }
	if (parentRole && landmarks.includes(parentRole)){
		return false;
	}
	parent = axe.commons.dom.getComposedParent(parent);
}
return true;
