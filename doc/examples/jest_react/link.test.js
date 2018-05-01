import React from 'react';
import axe from 'axe-core';
import { mountToDoc } from './test-helpers';

import Link from './Link';

test('Link has no aXe violations', (done) => {
  const linkComponent = mountToDoc(
    <Link page="http://www.axe-core.org">aXe website</Link>
  );
  const linkNode = linkComponent.getDOMNode();

  axe.run(linkNode, (err, { violations }) => {
    expect(err).toBe(null);
    expect(violations).toHaveLength(0);
    done();
  });
});
