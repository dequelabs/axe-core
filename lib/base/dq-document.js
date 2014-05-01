/*exported DqDocument */
function DqDocument(doc) {
	'use strict';
	var location = null;

	try { // IE will throw
		location = doc.location && doc.location.href;
	} catch (e) {}


	return {
		location: location,
		source: doc.documentElement.outerHTML,
		frames: utils.getFrames(doc)
	};
}