const { text } = axe.commons;

const accText = text.accessibleText(node).toLowerCase();

/**
 * Check if accessible name, uses filename (along with file extension)
 * eg: Download image of Tajmahal.jpg
 */
const fileExtn = /[.]/.exec(accText)
	? /[^.]+$/.exec(accText)[0].toLowerCase()
	: undefined;

const allowedExtns = [`jpg`, `jpeg`, `png`, `gif`, `tif`, `webp`];
if (fileExtn && allowedExtns.includes(fileExtn)) {
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
