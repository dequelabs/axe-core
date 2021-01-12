function frameFocusableMatches(node, virtualNode, context) {
	return !context.initiator && !context.focusable;
}

export default frameFocusableMatches;
