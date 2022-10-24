import cache from '../../core/base/cache';
import standards from '../../standards';

/**
 * Return a list of global aria attributes.
 * @return {String[]} List of all global aria attributes
 */
function getGlobalAriaAttrs() {
  return cache.get('globalAriaAttrs', () =>
    Object.keys(standards.ariaAttrs).filter(attrName => {
      return standards.ariaAttrs[attrName].global;
    })
  );
}

export default getGlobalAriaAttrs;
