/**
 * Check if two ancestries are identical
 */
function matchAncestry(ancestryA, ancestryB) {
  if (ancestryA.length !== ancestryB.length) {
    return false;
  }
  return ancestryA.every((selectorA, index) => {
    const selectorB = ancestryB[index];
    if (!Array.isArray(selectorA)) {
      return selectorA === selectorB;
    }
    if (selectorA.length !== selectorB.length) {
      return false;
    }
    return selectorA.every((str, index) => selectorB[index] === str);
  });
}

export default matchAncestry;
