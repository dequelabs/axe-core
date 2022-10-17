/**
 * Provides a fallback message in case incomplete checks don't provide one
 * This mechanism allows the string to be localized.
 * @return {String}
 */
export default function incompleteFallbackMessage() {
  let { incompleteFallbackMessage } = axe._audit.data;
  if (typeof incompleteFallbackMessage === 'function') {
    incompleteFallbackMessage = incompleteFallbackMessage();
  }
  if (typeof incompleteFallbackMessage !== 'string') {
    return '';
  }
  return incompleteFallbackMessage;
}
