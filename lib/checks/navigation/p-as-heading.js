let siblings = Array.from(node.parentNode.children);
let currentIndex = siblings.indexOf(node);

let nextSibling = siblings.slice(currentIndex+1)
.find(elm => elm.nodeName.toUpperCase() === 'P')

let prevSibling = siblings.slice(0, currentIndex).reverse()
.find(elm => elm.nodeName.toUpperCase() === 'P')

function getTextContainer(elm) {
	let nextNode = elm;
	let outerText = elm.textContent.trim();
	let innerText = outerText;

	while(innerText === outerText && nextNode !== undefined) {
		let i = -1;
		elm = nextNode;
		if (elm.children.length === 0) {
			return elm;
		}

		do { // find the first non-empty child
			i++;
			innerText = elm.children[i].textContent.trim();
		} while(innerText === '' && i + 1 < elm.children.length);
		nextNode = elm.children[i];
	}

	return elm;
}

function normalizeFontWeight(weight) {
	switch (weight) {
		case 'lighter': return 100;
		case 'normal': return 400;
		case 'bold': return 700;
		case 'bolder': return 900;
	}
	weight = parseInt(weight);
	return (weight !== NaN) ? weight : 400;
}

function getStyleValues(node) {
	let style = window.getComputedStyle(getTextContainer(node));
	return {
		fontWeight: normalizeFontWeight(style.getPropertyValue('font-weight')),
		fontSize: parseInt(style.getPropertyValue('font-size')),
		isItalic: style.getPropertyValue('font-style') === 'italic'
	};
}

const currStyle = getStyleValues(node);
const nextStyle = getStyleValues(nextSibling);
const prevStyle = prevSibling ? getStyleValues(prevSibling) : null;

if (
	currStyle.fontWeight - 100 <= nextStyle.fontWeight &&
	currStyle.fontSize - 1 <= nextStyle.fontSize &&
	(!currStyle.isItalic || nextStyle.isItalic)
) {
	return true;
}

let blockquote = axe.commons.dom.findUp(node, 'blockquote');
if (blockquote && blockquote.nodeName.toUpperCase() === 'BLOCKQUOTE') {
	return undefined;
}

if (prevStyle && (
	currStyle.fontWeight - 100 <= prevStyle.fontWeight &&
	currStyle.fontSize - 1 <= prevStyle.fontSize &&
	(!currStyle.isItalic || prevStyle.isItalic)
)) {
	return undefined;
}

return false;