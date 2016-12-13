/*exported Context */
/*global isNodeInContext */
/**
 * Pushes a unique frame onto `frames` array, filtering any hidden iframes
 * @private
 * @param  {Array} collection The array of unique frames that is being operated on
 * @param  {HTMLElement} frame   The frame to push onto Context
 */
function pushUniqueFrame(collection, frame) {
	'use strict';
	if (axe.utils.isHidden(frame)) {
		return;
	}

	var fr = axe.utils.findBy(collection, 'node', frame);

	if (!fr) {
		collection.push({
			node: frame,
			include: [],
			exclude: []
		});
	}

}

/**
 * Unshift selectors of matching iframes
 * @private
 * @param  {Context} context 	  The context object to operate on and assign to
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
				include: (context.include && +context.include.length) ? context.include : [document],
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
			result = result.concat(axe.utils.toArray(document.querySelectorAll(item)));
			break;
		} else if (item && item.length && !(item instanceof Node)) {

			if (item.length > 1) {
				pushUniqueFrameSelector(context, type, item);
			} else {
				result = result.concat(axe.utils.toArray(document.querySelectorAll(item[0])));
			}
		} else {
			result.push(item);
		}
	}

	// filter nulls
	return result.filter(function (r) {
		return r;
	});
}


/**
 * Check that the context, as well as each frame includes at least 1 element
 * @private
 * @param  {context} context
 * @return {Error}
 */
function validateContext(context) {
	'use strict';

	if (context.include.length === 0) {
		if (context.frames.length === 0) {
			var env = axe.utils.respondable.isInFrame() ? 'frame' : 'page';
			return new Error('No elements found for include in ' + env + ' Context');
		}
		context.frames.forEach(function (frame, i) {
			if (frame.include.length === 0) {
				return new Error('No elements found for include in Context of frame ' + i);
			}
		});
	}
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
	var self = this;

	this.frames = [];
	this.initiator = (spec && typeof spec.initiator === 'boolean') ? spec.initiator : true;
	this.page = false;

	spec = normalizeContext(spec);
	this.exclude = spec.exclude;
	this.include = spec.include;

	this.include = parseSelectorArray(this, 'include');
	this.exclude = parseSelectorArray(this, 'exclude');

	axe.utils.select('frame, iframe', this).forEach(function (frame) {
		if (isNodeInContext(frame, self)) {
			pushUniqueFrame(self.frames, frame);
		}
	});

	if (this.include.length === 1 && this.include[0] === document) {
		this.page = true;
	}

	// Validate outside of a frame
	var err = validateContext(this);
	if (err instanceof Error) {
		throw err;
	}
}
