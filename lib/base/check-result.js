/*exported CheckResult */
function CheckResult(check) {
	'use strict';

	this.id = check.id;

	this.result = dqre.constants.result[check.result] || dqre.constants.result.PASS;
	this.data = null;
	this.async = false;
	this.value = null;
	this.error = null;

}