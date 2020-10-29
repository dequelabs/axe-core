import cache from '../../core/base/cache';
import { getNodeFromTree } from '../../core/utils';

function regionAfter(results) {
	const regionlessNodes = cache.get('regionlessNodes');
	const frameResults = [];

	// adjust iframe results based on if the iframe is within a
	// region or if the iframe has a region inside of it.
	// basically we need to perform the same logic in region-evaluate
	// but across iframes
	results.forEach(result => {
		const vNode = getNodeFromTree(result.node._element);
		const isIframe = vNode.props.nodeName === 'iframe';

		// look at failing iframes after we process their results
		if (isIframe && !result.node._fromFrame && !result.result) {
			frameResults.push(result);
		} else if (result.node._fromFrame) {
			// if the iframe is inside of a region then all content
			// within the iframe passes
			if (!regionlessNodes.includes(vNode)) {
				result.result = true;
			}
			// if the iframe is not inside of a region, then we need to
			// determine the total results from the content within the
			// iframe
			else {
				frameResults.push(result);
				vNode._regionResults = vNode._regionResults || {
					numPass: 0,
					numFail: 0
				};
				const key = result.result ? 'numPass' : 'numFail';
				vNode._regionResults[key]++;
			}
		}
	});

	frameResults.forEach(result => {
		const vNode = getNodeFromTree(result.node._element);

		// something went wrong and the results didn't load (maybe
		// the iframe isn't being tested)
		if (!vNode._regionResults) {
			return;
		}

		const { numFail, numPass } = vNode._regionResults;

		// if all the iframe content passes, pass the iframe (treat it
		// as we would a container)
		if (numFail === 0) {
			result.result = true;
		}

		// if all the iframe content fails, pass the iframe content
		// but fail the iframe (treat the iframe as the "outer" element)
		else if (numPass === 0 && numFail >= 1 && result.node._fromFrame) {
			result.result = true;
		}

		// if there is mixed content then pass the iframe only so we get
		// only the failures from inside the iframe
		else if (numPass >= 1 && numFail >= 1 && !result.node._fromFrame) {
			result.result = true;
		}
	});

	return results;
}

export default regionAfter;
