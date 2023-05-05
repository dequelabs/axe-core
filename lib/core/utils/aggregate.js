const criteriaMap = {
  minor: 0,
  cantTell: 1,
  passed: 1,
  moderate: 2,
  serious: 3,
  failed: 3,
  critical: 3
};

/**
 * From a list of values, find the one with the greatest weight according to
 * the supplied map
 * @param  {Array} params Contains 3 properties:
 * - map: a map indicating the order of values to run in
 *        example: ['small', 'medium', 'large']
 * @param {Array} values of values to take the highest from
 * @param {String} initial: optional starting value
 */
function aggregate(map, values, initial) {
  const valSize = values.length;
  const maxPoint = valSize  / 2;
  let mapIndex = initial ? criteriaMap[initial] : 0;

  if (mapIndex !== 3) {
    for (let i = 0; i < valSize; i++) {
      // double ended iterator max
      if(i > maxPoint) {
        break
      }
      const head = values[i];
      const tail = values[i - valSize];
      const h = criteriaMap[head];
      const t = criteriaMap[tail];
  
      const maxV = t > h ? t : h;
  
      if (maxV > mapIndex) {
        mapIndex = maxV;
      }
  
      if (mapIndex === 3) {
        break;
      }
    }
  }

  return map[mapIndex];
}

export default aggregate;
