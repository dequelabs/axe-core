options = options || {};
var params,
	content = node.getAttribute('content') || '',
	parsedParams = content.split(/[;,]/),
	result = {},
	minimum = options.scaleMinimum || 2,
	lowerBound = options.lowerBound || false;

for (var i = 0, l = parsedParams.length; i < l; i++) {
	params = parsedParams[i].split('=');
	var key = params.shift().toLowerCase();
	if (key && params.length) {
		result[key.trim()] = params.shift().trim().toLowerCase();
	}
}

if (lowerBound && result['maximum-scale'] && parseFloat(result['maximum-scale']) < lowerBound) {
	return true;
}

if (!lowerBound && result['user-scalable'] === 'no') {
	return false;
}

if (result['maximum-scale'] && parseFloat(result['maximum-scale']) < minimum) {
	return false;
}


return true;