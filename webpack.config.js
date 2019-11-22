const path = require('path');

module.exports = {
	mode: 'development',
  watch: true,
	entry: './lib/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'axe.js'
	}
};
