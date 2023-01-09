import React from 'react';
import { mount, render } from 'enzyme';
import axe from 'axe-core';

import Link from './link';

test('Link has no axe violations', done => {
  const fixture = document.createElement('div');
  document.body.appendChild(fixture);

  const linkComponent = mount(
    <Link page="http://www.axe-core.org">axe website</Link>,
    { attachTo: fixture }
  );

  const config = {
    rules: {
      'color-contrast': { enabled: false },
      'link-in-text-block': { enabled: false }
    }
  };
  axe.run(fixture, config, (err, { violations }) => {
    expect(err).toBe(null);
    expect(violations).toHaveLength(0);
    done();
  });
});
