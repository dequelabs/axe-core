const { dom } = axe.commons;

let elements = [node];

if (node.children.length) {
	const children = Array.prototype.slice.call(node.querySelectorAll('*'));
	elements = elements.concat(children);
}

const result = elements.every(element => {
	const output = dom.isFocusable(element, false) === false;
	return output;
});

return result;
