
utils.getFrames = function getFrames(context) {
	'use strict';

	return utils.select('frame, iframe', context);
};