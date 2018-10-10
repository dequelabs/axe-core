if (
	axe.utils.querySelectorAll(
		virtualNode,
		'input[type="submit"]:not([disabled]), img[type="submit"]:not([disabled]), button:not([type="reset"],[type="button"],[disabled])'
	).length
) {
	return true;
}
return undefined;
