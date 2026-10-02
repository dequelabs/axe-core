function metaViewportScaleEvaluate(node, options, virtualNode) {
  const { scaleMinimum = 2, lowerBound = false } = options || {};

  const content = virtualNode.attr('content') || '';
  if (!content) {
    return true;
  }

  const result = content.split(/[;,]/).reduce((out, item) => {
    const contentValue = item.trim();
    if (!contentValue) {
      return out;
    }

    const [key, value] = contentValue.split('=');
    if (!key || !value) {
      return out;
    }
    const curatedKey = key.toLowerCase().trim();
    let curatedValue = value.toLowerCase().trim();

    // convert `yes` to `1`
    if (curatedKey === 'maximum-scale' && curatedValue === 'yes') {
      curatedValue = 1;
    }
    // when negative ignore key
    if (curatedKey === 'maximum-scale' && parseFloat(curatedValue) < 0) {
      return out;
    }

    out[curatedKey] = curatedValue;
    return out;
  }, {});

  const maximumScale = translateMaximumScale(result['maximum-scale']);
  if (lowerBound && maximumScale !== undefined && maximumScale < lowerBound) {
    return true;
  }

  if (!lowerBound && result['user-scalable'] === 'no') {
    this.data('user-scalable=no');
    return false;
  }

  const userScalable = translateUserScalable(result['user-scalable']);
  if (
    !lowerBound &&
    userScalable !== undefined &&
    userScalable > -1 &&
    userScalable < 1
  ) {
    this.data('user-scalable');
    return false;
  }

  if (maximumScale !== undefined && maximumScale < scaleMinimum) {
    this.data('maximum-scale');
    return false;
  }

  return true;
}

// Browsers translate values that aren't numbers: the device-width and
// device-height keywords become 10, and any other string becomes 0
// @see https://www.w3.org/TR/css-device-adapt-1/#translate-meta-to-at-viewport
const DEVICE_KEYWORDS = ['device-width', 'device-height'];

/**
 * Translate a maximum-scale value into a number
 * @param {String|Number} [value]
 * @return {Number|undefined} undefined if maximum-scale is not set
 */
function translateMaximumScale(value) {
  if (value === undefined) {
    return undefined;
  }
  if (DEVICE_KEYWORDS.includes(value)) {
    return 10;
  }
  return parseFloat(value) || 0;
}

/**
 * Translate a user-scalable value into a number
 * @param {String} [value]
 * @return {Number|undefined} undefined if user-scalable is not set
 */
function translateUserScalable(value) {
  if (value === undefined) {
    return undefined;
  }
  if (value === 'yes' || DEVICE_KEYWORDS.includes(value)) {
    return 1;
  }
  return parseFloat(value) || 0;
}

export default metaViewportScaleEvaluate;
