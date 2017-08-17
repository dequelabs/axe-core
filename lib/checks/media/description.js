var tracks = axe.utils.querySelectorAll(virtualNode, 'track');

if (tracks.length) {
  // return false if any track has kind === 'description'
  var out = !tracks.some(({ actualNode }) => (
    (actualNode.getAttribute('kind') || '').toLowerCase() === 'descriptions'
  ));
  return out;
}
// Undefined if there are no tracks - media may be decorative
return undefined;
