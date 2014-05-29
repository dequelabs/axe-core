
/*exported Context */

function findFrame(frames, frame) {
	'use strict';

	var i, l;
	for (i = 0, l = frames.length; i < l; i++) {
		if (frames[i].node === frame) {
			return frames[i];
		}
	}
}

function pushUniqueFrame(context, type, frame) {
	'use strict';
	if (utils.isHidden(frame)) {
		return;
	}

	var fr = findFrame(context.frames, frame);

	if (!fr) {
		context.frames.push({
			node: frame,
			include: [],
			exclude: []
		});
	}

}

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

function normalizeContext(context) {
	'use strict';

	if (context && typeof context === 'object') {
		if (context.hasOwnProperty('include') || context.hasOwnProperty('exclude')) {
			return {
				include: context.include || [],
				exclude: context.exclude || []
			};
		}

		if (context.length === +context.length) {
			return {
				include: context,
				exclude: []
			};
		}

		if (context instanceof Node) {
			return {
				include: [context],
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

	return {};
}

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
				pushUniqueFrame(context, type, element);
				return false;
			}
			utils.toArray(element.querySelectorAll('iframe, frame')).forEach(function (frame) {
				pushUniqueFrame(context, type, frame);
			});
		}
		return element;
	});
}

function Context(spec) {
	'use strict';

	this.frames = [];
	spec = normalizeContext(spec);
	this.exclude = spec.exclude || [];
	this.include = spec.include || [];

	this.include = parseSelectorArray(this, 'include');
	this.exclude = parseSelectorArray(this, 'exclude');



}