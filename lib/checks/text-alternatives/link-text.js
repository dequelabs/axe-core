function getText(elem) {
	let returnObj = {};

	returnObj['link-text'] = elem.innerText;
	returnObj['link-title'] = elem.title;
	returnObj['link-href'] = elem.href;

	return returnObj;
}

let nodeText = getText(node);

var elems = document.body.querySelectorAll('a[href]');

// Loop trough all the elements to check against
for (var i = 0; i < elems.length; i++) {
	let elem = elems[i];
	if (elem !== node) {
		let newElemText = getText(elem);
		if (
			newElemText['link-text'] === nodeText['link-text'] &&
			nodeText['link-title'] === newElemText['link-title'] &&
			nodeText['link-href'] !== newElemText['link-href']
		) {
			return false;
		}
	}
}
return true;
