/**
 * Normalize the input of "context" so that many different methods of input are accepted
 * @private
 * @param  {Mixed} context  The configuration object passed to `Context`
 * @return {Object}         Normalized context spec to include both `include` and `exclude` arrays
 */
export function normalizeContext(context) {
  // typeof NodeList.length in PhantomJS === function
  if (
    (context && typeof context === 'object') ||
    context instanceof window.NodeList
  ) {
    if (context instanceof window.Node) {
      return {
        include: [context],
        exclude: []
      };
    }

    if (
      context.hasOwnProperty('include') ||
      context.hasOwnProperty('exclude')
    ) {
      return {
        include:
          context.include && +context.include.length
            ? context.include
            : [document],
        exclude: context.exclude || []
      };
    }

    if (context.length === +context.length) {
      return {
        include: context,
        exclude: []
      };
    }
  }

  if (typeof context === 'string') {
    return {
      include: [[context]],
      exclude: []
    };
  }

  return {
    include: [document],
    exclude: []
  };
}
