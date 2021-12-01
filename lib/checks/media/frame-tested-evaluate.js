function frameTestedEvaluate(node, options) {
  // assume iframe is not tested
  return options.isViolation ? false : undefined;
}

export default frameTestedEvaluate;
