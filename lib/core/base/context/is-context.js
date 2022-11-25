
export function isContext(potential) {
  // TODO: Need to allow labelled contexts here
  switch (true) {
    case typeof potential === 'string':
    // TODO: Should this allow other iterables?
    case Array.isArray(potential):
    case window.Node && potential instanceof window.Node:
    case window.NodeList && potential instanceof window.NodeList:
      return true;

    case typeof potential !== 'object':
      return false;

    case potential.include !== undefined:
    case potential.exclude !== undefined:
    case typeof potential.length === 'number':
      return true;

    default:
      return false;
  }
}

