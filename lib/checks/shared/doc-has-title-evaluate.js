function docHasTitleEvaluate(node, options, virtualNode) {
	var title = document.title;
	return !!(title ? axe.commons.text.sanitize(title).trim() : "");
}

export default docHasTitleEvaluate;
