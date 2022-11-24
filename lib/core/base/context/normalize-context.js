/**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} context  The configuration object passed to `Context`
 * @return {Object}         Normalized context spec to include both `include` and `exclude` arrays
 */
export function normalizeContext(context) {
  if (!context) {
    return defaultContext();
  }
  if (typeof context === 'string') {
    return defaultContext({ include: [[context]] });
  }
  if (context instanceof window.Node) {
    return defaultContext({ include: [context] });
  }
  if (context instanceof window.NodeList) {
    return defaultContext({ include: context });
  }
  if (typeof context === 'object' && context.length === +context.length) {
    // TODO: validate the content
    return defaultContext({ include: context });
  }

  if (
    typeof context === 'object' &&
    (context.hasOwnProperty('include') || context.hasOwnProperty('exclude'))
  ) {
    const exclude =
      context.exclude && +context.exclude.length ? context.exclude : [];
    const include =
      context.include && +context.include.length ? context.include : [document];
    return { include, exclude };
  }

  return defaultContext();
}

const defaultContext = ({ include = [document], exclude = [] } = {}) => {
  return { include, exclude };
};
