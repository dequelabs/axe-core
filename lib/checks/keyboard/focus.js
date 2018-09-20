if (node.getAttribute('onFocus') === 'this.blur()') {
	return false;
} else if (node.getAttribute('onFocus').indexOf('this.blur()') > -1) {
	return undefined;
} else {
	return true;
}
