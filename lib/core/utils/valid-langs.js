/**
 * Determine if a string is a valid language code
 * @method isValidLang
 * @memberof axe.utils
 * @param {String} lang String to test if a valid language code
 * @returns {Boolean}
 */
function isValidLang(lang) {
  let valid = true;
  try {
    // @ts-ignore getCanonicalLocales not in draft but, available on all main browsers
    !!Intl.getCanonicalLocales(lang);
  } catch (err) {
    valid = false;
  }
  return valid;
}

export default isValidLang;
