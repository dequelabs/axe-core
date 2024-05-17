import { subtreeText } from '../../commons/text';

function svgNonEmptyTitleEvaluate(node, options, virtualNode) {
  if (!virtualNode.children) {
    return undefined;
  }

  const titleNode = virtualNode.children.find(({ props }) => {
    return props.nodeName === 'title';
  });

  if (!titleNode) {
    this.data({
      messageKey: 'noTitle'
    });
    return false;
  }

  try {
    const titleText = subtreeText(titleNode, { includeHidden: true }).trim();
    if (titleText === '') {
      this.data({
        messageKey: 'emptyTitle'
      });
      return false;
    }
  } catch {
    return undefined;
  }

  return true;
}

export default svgNonEmptyTitleEvaluate;
