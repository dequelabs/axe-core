import { hasContentVirtual, getComposedParent } from '../../commons/dom'

const metadata = {
	id: 'hidden-content',
	evaluate: hiddenContentEvaluate,
	metadata: {
		impact: 'minor',
		messages: {
			pass: 'All content on the page has been analyzed.',
			fail: 'There were problems analyzing the content on this page.',
			incomplete: 'There is hidden content on the page that was not analyzed. You will need to trigger the display of this content in order to analyze it.'
		}
	}
}

function hiddenContentEvaluate(node, options, virtualNode, context) {
	const whitelist = ['SCRIPT', 'HEAD', 'TITLE', 'NOSCRIPT', 'STYLE', 'TEMPLATE'];
	if (
		!whitelist.includes(node.nodeName.toUpperCase()) &&
		hasContentVirtual(virtualNode)
	) {
		const styles = window.getComputedStyle(node);
		if (styles.getPropertyValue('display') === 'none') {
			return undefined;
		} else if (styles.getPropertyValue('visibility') === 'hidden') {
			// Check if visibility isn't inherited
			const parent = getComposedParent(node);
			const parentStyle = parent && window.getComputedStyle(parent);
			if (
				!parentStyle ||
				parentStyle.getPropertyValue('visibility') !== 'hidden'
			) {
				return undefined;
			}
		}
	}
	return true;
}

export default metadata;