const USER_SCALABLE_ALLOWED = ['yes', 'device-width', 'device-height'];
const MAXIMUM_SCALE_ALLOWED = ['device-width', 'device-height'];

export default function metaViewportScaleEvaluate(node, options, virtualNode) {
  const { scaleMinimum = 2, lowerBound = false } = options || {};

  const content = virtualNode.attr('content') || '';
  if (!content) {
    return true;
  }

  const items = content.toLowerCase().split(/[;,]/);
  for (const item of items) {
    const [key, value] = item.split('=').map(part => part.trim());

    if (!key || !value) {
      continue;
    }

    const floatValue = parseFloat(value);

    if (key === 'user-scalable') {
      // The large-page sibling rule (lowerBound set) only checks maximum-scale
      if (lowerBound) {
        continue;
      }

      const isUnknownString =
        isNaN(floatValue) && !USER_SCALABLE_ALLOWED.includes(value);
      const effectivelyDisabled = floatValue > -1 && floatValue < 1;

      if (isUnknownString || effectivelyDisabled) {
        this.data(`user-scalable=${value}`);
        return false;
      }
    }

    if (key === 'maximum-scale') {
      // negative values are OK
      if (floatValue < 0) {
        continue;
      }
      // don't double report the maximum-scale on the large-page sibling rule
      if (lowerBound && floatValue < lowerBound) {
        continue;
      }

      const isUnknownString =
        isNaN(floatValue) && !MAXIMUM_SCALE_ALLOWED.includes(value);
      const belowMinimum = floatValue < scaleMinimum;

      if (isUnknownString || belowMinimum) {
        this.data(`maximum-scale=${value}`);
        return false;
      }
    }
  }

  return true;
}
