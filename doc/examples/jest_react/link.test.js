import React from 'react';
import { render } from '@testing-library/react';
import axe from 'axe-core';

import Link from './link';

test('Link has no axe violations', done => {
  const { container } = render(
    <Link page="http://www.axe-core.org">axe website</Link>
  );

  const config = {
    rules: {
      'color-contrast': { enabled: false },
      'link-in-text-block': { enabled: false }
    }
  };
  axe.run(container, config, (err, { violations }) => {
    expect(err).toBe(null);
    expect(violations).toHaveLength(0);
    done();
  });
});
