var originalNode = node;

function getEventHandler(node) {
	return node.getAttribute('ng-click') || node.getAttribute('(click)');
}

function testNodeForA11y(currentNode) {
	var tabIndex = currentNode.getAttribute('tabindex'),
		focusableWithTabindex = axe.commons.dom.isFocusable(currentNode) && tabIndex > -1;

	// if the element is natively focusable without tabindex, it passes
	if (axe.commons.dom.isFocusable(currentNode) && tabIndex === null) {
		return true;
	}
	var accRoles = ['button', 'checkbox', 'tab', 'menuitem', 'menuitemcheckbox'],
		roleAttr = currentNode.getAttribute('role');

	currentNode.hasAccessibleRole = false;

	for (var i=0; i<accRoles.length; i++) {
		// if currentNode has accessible role and is focusable, it passes
		if (roleAttr && roleAttr === accRoles[i] && focusableWithTabindex) {
			currentNode.hasAccessibleRole = true;
		}
	}
	return currentNode.hasAccessibleRole;
}

// if original node isn't focusable, try one of the children
// and look for the same event handler on an interactive element

var origHandler = getEventHandler(originalNode);

if (testNodeForA11y(originalNode) === false) {
	// ensure we're looking at an element node
	if (originalNode.children.length) {
		var childStatus = [];
		axe.commons.dom.walkDomNode(originalNode, function (currNode) {
			if (currNode.nodeType === 1) {
				// if child node has accessible event handler, pass it
				var childHandler = getEventHandler(currNode);
				if (testNodeForA11y(currNode) && origHandler === childHandler) {
					childStatus.push(true);
				} else {
					childStatus.push(false);
				}
			}
		});
		return childStatus.some(function(isAMatch) {
			return isAMatch === true;
		});
	} else {
		// original node fails, and it has no children to check
		return false;
	}
} else {
	// top level node is good, pass the check
	return true;
}
