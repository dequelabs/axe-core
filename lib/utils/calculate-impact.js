
utils.calculateImpact = function (impacts) {
  var highestImpact = 0,
    potentialImpact;
  var i, l, check;
  for (var i = 0, length = impacts.length; i < l; i++) {
    check = impacts[i];
    potentialImpact = dqre.constants.impact.indexOf(nodeData)
    highestImpact = highestImpact < potentialImpact ? potentialImpact : highestImpact
  }

  return dqre.constants.impact[highestImpact];
};
