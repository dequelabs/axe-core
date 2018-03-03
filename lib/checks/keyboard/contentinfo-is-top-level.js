const landmarks = axe.commons.aria.getRolesByType('landmark');
const sectioning = ['article', 'aside', 'main', 'navigation', 'section'];
const nodeIsFooter = node.tagName.toLowerCase() === 'footer' && node.getAttribute('role') !== 'contentinfo';
var parent = axe.commons.dom.getComposedParent(node);

while (parent){
	var role = parent.getAttribute('role');
	if (!role && (parent.tagName.toLowerCase() !== 'form')){
		role = axe.commons.aria.implicitRole(parent);
	}
  if (role && nodeIsFooter && sectioning.includes(role)){
    return true;
  }
	if (role && landmarks.includes(role)){
		return false;
	}
	parent = axe.commons.dom.getComposedParent(parent);
}
return true;
