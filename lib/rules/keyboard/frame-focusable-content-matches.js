function frameFocusableContentMatches(node, virtualNode, context) {
  return (
    !context.initiator &&
    !context.focusable &&
    context.size?.width * context.size?.height > 1
  );
}

export default frameFocusableContentMatches;
