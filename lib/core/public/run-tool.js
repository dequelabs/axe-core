/*exported runTool */

function runTool(toolId, selector) {
	'use strict';

	utils.toArray(document.querySelectorAll('iframe, frame')).forEach(function(frame) {
		axe.utils.sendCommandToFrame(frame, {
			options: {},
			command: 'run-tool',
			parameter: toolId,
			selectorArray: selector
		});

	});

	utils.toArray(document.querySelectorAll(selector)).forEach(function(node) {
		axe._audit.tools[toolId].run(node, null);
	});
}
axe.tool = runTool;
