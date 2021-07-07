import processMessage from './process-message';
import clone from './clone';
import findBy from './find-by';
import extendMetaData from './extend-meta-data';
import { incompleteFallbackMessage } from '../reporters/helpers';
import { getAudit } from '../globals';

/**
 * Construct incomplete message from check.data
 * @param  {Object} checkData Check result with reason specified
 * @param  {Object} messages Source data object with message options
 * @return  {String}
 * @private
 */
function getIncompleteReason(checkData, messages) {
<<<<<<< Updated upstream
  function getDefaultMsg(messages) {
    if (messages.incomplete && messages.incomplete.default) {
      // fall back to the default message if no reason specified
      return messages.incomplete.default;
    } else {
      return incompleteFallbackMessage();
    }
  }
  if (checkData && checkData.missingData) {
    try {
      const msg = messages.incomplete[checkData.missingData[0].reason];
      if (!msg) {
        throw new Error();
      }
      return msg;
    } catch (e) {
      if (typeof checkData.missingData === 'string') {
        // return a string with the appropriate reason
        return messages.incomplete[checkData.missingData];
      } else {
        return getDefaultMsg(messages);
      }
    }
  } else if (checkData && checkData.messageKey) {
    return messages.incomplete[checkData.messageKey];
  } else {
    return getDefaultMsg(messages);
  }
=======
	function getDefaultMsg(messages) {
		if (messages.incomplete && messages.incomplete.default) {
			// fall back to the default message if no reason specified
			return messages.incomplete.default;
		} else {
			return incompleteFallbackMessage();
		}
	}
	if (checkData && checkData.missingData) {
		try {
			var msg = messages.incomplete[checkData.missingData[0].reason];
			if (!msg) {
				throw new Error();
			}
			return msg;
		} catch (e) {
			if (typeof checkData.missingData === 'string') {
				// return a string with the appropriate reason
				return messages.incomplete[checkData.missingData];
			} else {
				return getDefaultMsg(messages);
			}
		}
	} else if (checkData && checkData.messageKey) {
		return messages.incomplete[checkData.messageKey];
	} else {
		return getDefaultMsg(messages);
	}
>>>>>>> Stashed changes
}

/**
 * Extend checksData with the correct result message
 * @param  {Object} checksData The check result data
 * @param  {Boolean} shouldBeTrue Result of pass/fail check run
 * @param  {Object} rule The rule metadata
 * @return {Function}
 * @private
 */
<<<<<<< HEAD
<<<<<<< Updated upstream
function extender(checksData, shouldBeTrue) {
=======
<<<<<<< Updated upstream
function extender(checksData, shouldBeTrue, rule) {
>>>>>>> Stashed changes
=======
function extender(checksData, shouldBeTrue, rule) {
>>>>>>> develop
  return check => {
    const sourceData = checksData[check.id] || {};
    const messages = sourceData.messages || {};
    const data = Object.assign({}, sourceData);
    delete data.messages;
    if (!rule.reviewOnFail && check.result === undefined) {
      // handle old doT template
      if (
        typeof messages.incomplete === 'object' &&
        !Array.isArray(check.data)
      ) {
        data.message = getIncompleteReason(check.data, messages);
      }
=======
function extender(checksData, shouldBeTrue) {
	return function(check) {
		var sourceData = checksData[check.id] || {};
		var messages = sourceData.messages || {};
		var data = Object.assign({}, sourceData);
		delete data.messages;
		if (check.result === undefined) {
			// handle old doT template
			if (
				typeof messages.incomplete === 'object' &&
				!Array.isArray(check.data)
			) {
				data.message = getIncompleteReason(check.data, messages);
			}
>>>>>>> Stashed changes

			// fallback to new process message style
			if (!data.message) {
				data.message = messages.incomplete;
			}
		} else {
			data.message =
				check.result === shouldBeTrue ? messages.pass : messages.fail;
		}

		// don't process doT template functions
		if (typeof data.message !== 'function') {
			data.message = processMessage(data.message, check.data);
		}

		extendMetaData(check, data);
	};
}

/**
 * Publish metadata from audit.data
 * @param  {RuleResult} result Result to publish to
 * @private
 */
function publishMetaData(ruleResult) {
<<<<<<< Updated upstream
  // TODO: es-modules_audit
<<<<<<< HEAD
<<<<<<< Updated upstream
  var checksData = axe._audit.data.checks || {};
  var rulesData = axe._audit.data.rules || {};
  var rule = findBy(axe._audit.rules, 'id', ruleResult.id) || {};
=======
  const checksData = axe._audit.data.checks || {};
  const rulesData = axe._audit.data.rules || {};
  const rule = findBy(axe._audit.rules, 'id', ruleResult.id) || {};
=======
	const audit = getAudit();
	var checksData = audit.data.checks || {};
	var rulesData = audit.data.rules || {};
	var rule = findBy(audit.rules, 'id', ruleResult.id) || {};
>>>>>>> Stashed changes
>>>>>>> Stashed changes
=======
  const checksData = axe._audit.data.checks || {};
  const rulesData = axe._audit.data.rules || {};
  const rule = findBy(axe._audit.rules, 'id', ruleResult.id) || {};
>>>>>>> develop

	ruleResult.tags = clone(rule.tags || []);

<<<<<<< HEAD
<<<<<<< Updated upstream
  var shouldBeTrue = extender(checksData, true);
  var shouldBeFalse = extender(checksData, false);
=======
<<<<<<< Updated upstream
  const shouldBeTrue = extender(checksData, true, rule);
  const shouldBeFalse = extender(checksData, false, rule);
>>>>>>> Stashed changes
=======
  const shouldBeTrue = extender(checksData, true, rule);
  const shouldBeFalse = extender(checksData, false, rule);
>>>>>>> develop
  ruleResult.nodes.forEach(detail => {
    detail.any.forEach(shouldBeTrue);
    detail.all.forEach(shouldBeTrue);
    detail.none.forEach(shouldBeFalse);
  });
  extendMetaData(ruleResult, clone(rulesData[ruleResult.id] || {}));
=======
	var shouldBeTrue = extender(checksData, true);
	var shouldBeFalse = extender(checksData, false);
	ruleResult.nodes.forEach(function(detail) {
		detail.any.forEach(shouldBeTrue);
		detail.all.forEach(shouldBeTrue);
		detail.none.forEach(shouldBeFalse);
	});
	extendMetaData(ruleResult, clone(rulesData[ruleResult.id] || {}));
>>>>>>> Stashed changes
}

export default publishMetaData;
