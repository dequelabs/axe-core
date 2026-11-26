import { getRole } from '../../commons/aria';
import { accessibleTextVirtual, sanitize } from '../../commons/text';

export default function landmarkIsUniqueEvaluate(node, options, virtualNode) {
  const role = getRole(node);
  let accessibleText = accessibleTextVirtual(virtualNode);
  accessibleText = accessibleText ? accessibleText.toLowerCase() : null;
  const data = { role: role, accessibleText: accessibleText };

  // Labelled landmarks that repeat identical content (such as pagination
  // above and below a table) may share a label. Store a short hash of the
  // content so the after method can compare it without bloating the results.
  // textContent is used rather than walking the tree, as labelled landmarks
  // such as main can contain most of the page.
  if (accessibleText && node.textContent) {
    const content = sanitize(node.textContent);
    if (content) {
      data.contentHash = hashString(content);
    }
  }

  this.data(data);
  this.relatedNodes([node]);

  return true;
}

/**
 * Return a short, non-cryptographic hash of a string
 * @param {String} str
 * @return {String}
 */
function hashString(str) {
  // Largest prime below 2^32, so `hash * 31 + charCode` stays a safe integer
  const modulus = 4294967291;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % modulus;
  }
  return hash.toString(36);
}
