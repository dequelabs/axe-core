/*exported Context */

/**
 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
 * @private
 * @param  {Context} context The context object to operate on and assign to
 * @param  {HTMLElement} frame   The frame to push onto Context
 */
function pushUniqueFrame(context, frame) {
	'use strict';
	if (utils.isHidden(frame)) {
		return;
	}

	var fr = utils.findBy(context.frames, 'node', frame);

	if (!fr) {
		context.frames.push({
			node: frame,
			include: [],
			exclude: []
		});
	}

}

/**
 * Unshift selectors of matching iframes
 * @private
 * @param  {Context} context The context object to operate on and assign to
 * @param  {String} type          The "type" of context, 'include' or 'exclude'
 * @param  {Array} selectorArray  Array of CSS selectors, each element represents a frame;
 * where the last element is the actual node
 */
function pushUniqueFrameSelector(context, type, selectorArray) {
	'use strict';

	context.frames = context.frames || [];

	var result, frame;
	var frames = document.querySelectorAll(selectorArray.shift());

	frameloop:
	for (var i = 0, l = frames.length; i < l; i++) {
		frame = frames[i];
		for (var j = 0, l2 = context.frames.length; j < l2; j++) {
			if (context.frames[j].node === frame) {
				context.frames[j][type].push(selectorArray);
				break frameloop;
			}
		}
		result = {
			node: frame,
			include: [],
			exclude: []
		};

		if (selectorArray) {
			result[type].push(selectorArray);
		}

		context.frames.push(result);
	}
}

/**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} context  The configuration object passed to `Context`
 * @return {Object}         Normalized context spec to include both `include` and `exclude` arrays
 */
function normalizeContext(context) {
	'use strict';

	// typeof NodeList.length in PhantomJS === function
	if (context && typeof context === 'object' || context instanceof NodeList) {

		if (context instanceof Node) {
			return {
				include: [context],
				exclude: []
			};
		}

		if (context.hasOwnProperty('include') || context.hasOwnProperty('exclude')) {
			return {
				include: context.include || [document],
				exclude: context.exclude || []
			};
		}

		if (context.length === +context.length) {
			return {
				include: context,
				exclude: []
			};
		}
	}

	if (typeof context === 'string') {
		return {
			include: [context],
			exclude: []
		};
	}

	return {
		include: [document],
		exclude: []
	};
}

/**
 * Finds frames in context, converts selectors to Element references and pushes unique frames
 * @private
 * @param  {Context} context The instance of Context to operate on
 * @param  {String} type     The "type" of thing to parse, "include" or "exclude"
 * @return {Array}           Parsed array of matching elements
 */
function parseSelectorArray(context, type) {
	'use strict';

	var item,
		result = [];
	for (var i = 0, l = context[type].length; i < l; i++) {
		item = context[type][i];
		// selector
		if (typeof item === 'string') {
			result = result.concat(utils.toArray(document.querySelectorAll(item)));
			break;
		} else if (item && item.length) {

			if (item.length > 1) {
				pushUniqueFrameSelector(context, type, item);
			} else {
				result = result.concat(utils.toArray(document.querySelectorAll(item[0])));
			}
		} else {
			result.push(item);
		}
	}

	return result.filter(function (element) {

		if (element) {
			if ((element.nodeName === 'IFRAME' || element.nodeName === 'FRAME')) {
				pushUniqueFrame(context, element);
				return false;
			}
			utils.toArray(element.querySelectorAll('iframe, frame')).forEach(function (frame) {
				pushUniqueFrame(context, frame);
			});
		}
		return element;
	});
}

/**
 * Holds context of includes, excludes and frames for analysis.
 *
 * @todo  clarify and sync changes to design doc
 * Context : {IncludeStrings} || {
 *   // defaults to document/all
 *   include: {IncludeStrings},
 *   exclude : {ExcludeStrings}
 * }
 *
 * IncludeStrings : [{CSSSelectorArray}] || Node
 * ExcludeStrings : [{CSSSelectorArray}]
 * `CSSSelectorArray` an Array of selector strings that addresses a Node in a multi-frame document. All addresses
 * are in this form regardless of whether the document contains any frames.To evaluate the selectors to
 * find the node referenced by the array, evaluate the selectors in-order, starting in window.top. If N
 * is the length of the array, then the first N-1 selectors should result in an iframe and the last
 * selector should result in the specific node.
 *
 * @param {Object} spec Configuration or "specification" object
 */
function Context(spec) {
	'use strict';

	this.frames = [];
	this.initiator = (spec && typeof spec.initiator === 'boolean') ? spec.initiator : true;
	this.page = false;

	spec = normalizeContext(spec);
	this.exclude = spec.exclude;
	this.include = spec.include;

	this.include = parseSelectorArray(this, 'include');
	this.exclude = parseSelectorArray(this, 'exclude');

	if (this.include.length === 1 && this.include[0] === document) {
		this.page = true;
	}

}
