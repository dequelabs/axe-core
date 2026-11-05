import { getRole } from '../../commons/aria';
import { accessibleTextVirtual, sanitize } from '../../commons/text';

const urlRegex = /^[a-z][a-z0-9+.-]*:\/\/\S+$/i;
const extensionRegex = /\.([a-z0-9]+)$/i;

/**
 * Check that an element's accessible name is not the file name, path or URL of
 * the image it labels.
 *
 * File name alternatives happen when an authoring tool defaults the `alt`
 * attribute to the name of the uploaded file. The name is read out verbatim,
 * extension included, and rarely describes the image.
 *
 * The result is always reported as needs review. Whether a file name is an
 * adequate alternative can only be decided by a person: the name may be
 * meaningful, or the image may be a screenshot of the file it is named after.
 *
 * ##### Data:
 * ```
 * undefined
 * ```
 *
 * @memberof checks
 * @return {Boolean} True if the accessible name is a file name, path or URL.
 */
function altFileNameEvaluate(node, options, virtualNode) {
  if (['none', 'presentation'].includes(getRole(virtualNode))) {
    return false;
  }

  const accessibleName = sanitize(accessibleTextVirtual(virtualNode));
  if (accessibleName === '') {
    return false;
  }

  if (urlRegex.test(accessibleName)) {
    return true;
  }

  const extension = accessibleName.match(extensionRegex)?.[1];
  if (!extension) {
    return false;
  }

  return options.extensions.includes(extension.toLowerCase());
}

export default altFileNameEvaluate;
