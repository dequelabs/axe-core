/**
 * Check if two ancestries are identical
 */
export default function matchAncestry(ancestryA, ancestryB) {
  if (ancestryA.length !== ancestryB.length) {
    return false;
  }
  return ancestryA.every((selectorA, ancestorIndex) => {
    const selectorB = ancestryB[ancestorIndex];
    if (!Array.isArray(selectorA)) {
      return selectorA === selectorB;
    }
    if (selectorA.length !== selectorB.length) {
      return false;
    }
    return selectorA.every(
      (str, selectorIndex) => selectorB[selectorIndex] === str
    );
  });
}
