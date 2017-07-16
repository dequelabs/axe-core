var tracks = axe.utils.querySelectorAll(virtualNode, 'track');

if (tracks.length) {
  // return false if any track has kind === 'caption'
  return !tracks.some(({ actualNode }) => (
    (actualNode.getAttribute('kind') || '').toLowerCase() === 'captions'
  ));
}
// Undefined if there are no tracks - media may be decorative
return undefined;
