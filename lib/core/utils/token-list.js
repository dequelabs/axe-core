/**
 * Converts space delimited token list to an Array
 * @method tokenList
 * @memberof axe.utils
 * @param  {String} str
 * @return {Array}
 */
function tokenList(str) {
  return (str || '')
    .trim()
    .replace(/\s{2,}|[\t\n\f\r]/g, ' ')
    .split(' ');
}

export default tokenList;
