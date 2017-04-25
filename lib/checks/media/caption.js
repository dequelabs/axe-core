var tracks = node.querySelectorAll('track');
if (tracks.length) {
	for (var i=0; i<tracks.length; i++) {
		var kind = tracks[i].getAttribute('kind');
		if (kind && kind === 'captions') {
			// only return for matching track, in case there are multiple
			return false;
		}
	}
	return true;
}
// for multiple track elements, return the first one that matches
return undefined;
