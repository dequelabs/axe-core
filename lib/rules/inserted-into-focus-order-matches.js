import { insertedIntoFocusOrder } from '../commons/dom';

function insertedIntoFocusOrderMatches(node, virtualNode, context) {
  return insertedIntoFocusOrder(node);
}

export default insertedIntoFocusOrderMatches;
