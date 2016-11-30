/*global utils, axe */
utils.performanceTimer = (function () {
	'use strict';

	var originalTime = null;

	function safeTime() {
		if (window.performance && window.performance) {
			return window.performance.now();
		}
		else {
			return new Date();
		}
	}
	var time = safeTime();

	return {
		start: function() {
			if (window.performance && window.performance.clearMeasures !== undefined) {
				window.performance.clearMeasures();
			}
			if (window.performance && window.performance.clearMarks !== undefined) {
				window.performance.clearMarks();
			}
			this.mark('mark_audit_start');
		},
		reset: function () {
			if (!originalTime) {
				originalTime = safeTime();
			}
			time = safeTime();
		},
		timeElapsed: function () {
			return safeTime() - time;
		},
		mark: function (markName) {
			if (window.performance && window.performance.mark !== undefined) {
				window.performance.mark(markName);
			}
		},
		measure: function (measureName, startMark, endMark) {
			if (window.performance && window.performance.measure !== undefined) {
				window.performance.measure(measureName, startMark, endMark);
			}
		},
		getMeasures: function() {
			if (window.performance && window.performance.getEntriesByType !== undefined) {
				var measures = window.performance.getEntriesByType('measure');
				for (var i = 0; i < measures.length; ++i) {
				  var req = measures[i];
				  axe.log('Measure ' + req.name + ' took ' + req.duration + 'ms');
				}
			}
		},
		total: function() {
			return safeTime() - originalTime;
		}
	};
})();
