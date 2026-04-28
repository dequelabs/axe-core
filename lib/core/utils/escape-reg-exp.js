/**
 * Escape a string for use in a regular expression
 * @private
 * @param {String} string String to escape
 * @return {String} Escaped string
 */
export default function escapeRegExp(string) {
  /*! Credit: XRegExp 0.6.1 (c) 2007-2008 Steven Levithan <http://stevenlevithan.com/regex/xregexp/> MIT License */
  const from = /(?=[\-\[\]{}()*+?.\\\^$|,#\s])/g;
  const to = '\\';
  return string.replace(from, to);
}
