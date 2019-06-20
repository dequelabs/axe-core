const { text } = axe.commons;
const possibleImageExtensions = [`.jpg`, `.jpeg`, `.png`, `.gif`, `.tif`];

const accText = text.accessibleText(node).toLowerCase();

/**
 * Check if accessible name, uses filename (along with file extension)
 * eg: Download image of Tajmahal.jpg
 */
const fileExtnInAccText = accText.match(/\.[0-9a-z]+$/i);
if (
	fileExtnInAccText &&
	possibleImageExtensions.includes(fileExtnInAccText[0])
) {
	return undefined;
}

/**
 * Get source value & check of filename is used in accessible name
 */
const srcValue = node.getAttribute('src').toLowerCase();
const fileName = text.sanitize(srcValue.split('/').pop());
const fileNameWithoutExtn = fileName.split('.').shift();

if (accText.includes(fileNameWithoutExtn)) {
	return true;
}

return undefined;
