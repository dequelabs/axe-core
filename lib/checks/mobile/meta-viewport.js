var params,
	content = node.getAttribute('content') || '',
	parsedParams = content.split(';'),
	result = {};

for (var i = 0, l = parsedParams.length; i < l; i++) {
	params = parsedParams[i].split('=');
	var key = params.shift();
	if (key && params.length) {
		result[key.trim()] = params.join('=').trim();
	}
}

if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < 5) {
	return false;
}

if (result['user-scalable'] === 'no') {
	return false;
}


return true;