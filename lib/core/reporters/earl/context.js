/**
 * JSON-LD `@context` for the EARL reports produced by the `earl` reporter.
 * Maps the compact terms used in each assertion to their EARL, Dublin Core,
 * schema.org, and WCAG vocabularies.
 *
 * @see https://www.w3.org/TR/EARL10-Schema/
 */
const earlContext = {
  '@vocab': 'http://www.w3.org/ns/earl#',
  earl: 'http://www.w3.org/ns/earl#',
  WCAG2: 'http://www.w3.org/TR/WCAG21/#',
  dct: 'http://purl.org/dc/terms/',
  sch: 'https://schema.org/',
  source: 'dct:source',
  title: 'dct:title',
  assertedBy: { '@type': '@id' },
  outcome: { '@type': '@id' },
  mode: { '@type': '@id' },
  isPartOf: {
    '@id': 'http://purl.org/dc/terms/isPartOf',
    '@type': '@id'
  }
};

export default earlContext;
