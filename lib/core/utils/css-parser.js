import { createParser } from 'css-selector-parser';

const parse = createParser({
  syntax: {
    pseudoClasses: {
      definitions: {
        Selector: ['is', 'not']
      }
    },
    combinators: ['>'],
    attributes: {
      operators: ['^=', '$=', '*=', '~=']
    }
  }
});

export default { parse };
