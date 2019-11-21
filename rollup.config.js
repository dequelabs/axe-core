const pkg = require('./package.json');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const year = new Date().getFullYear();
const banner = `/*! axe v${pkg.version}
 * Copyright (c) ${year} Deque Systems, Inc.
 *
 * Your use of this Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * This entire copyright notice must appear in every copy of this file you
 * distribute or in any file that contains substantial portions of this source
 * code.
 */
(function axeFunction (window) {
  // A window reference is required to access the axe object in a "global".
  var global = window;
  var document = window.document;
  var axe = {};`;

const footer = `
}( typeof window === 'object' ? window : this ));
`;

export default {
	input: 'lib/index.js',
	output: {
		file: 'dist/axe.js',
		format: 'iife',
		banner,
		footer
	},
	plugins: [resolve(), commonjs()]
};
