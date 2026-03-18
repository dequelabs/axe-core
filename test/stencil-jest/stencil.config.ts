import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'testing',
  testing: {
    browserHeadless: 'shell',
    testPathPattern: 'src/test/.*\\.spec\\.ts$'
  },
  outputTargets: []
};
