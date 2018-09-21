if (
	node.querySelector(
		'input[type="submit"]:not([disabled]), img[type="submit"]:not([disabled]), button[type="submit"]:not([disabled])'
	)
) {
	return true;
}

if (!node.querySelectorAll(':not(textarea)').length) {
	return false;
}

return undefined;
