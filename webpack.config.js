const path = require('path');

module.exports = {
	mode: 'development',
	entry: './lib/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'axe.js'
	},
  resolve: {
    alias: {
      '@/commons': path.resolve(__dirname, 'lib/commons/'),
      '@/utils': path.resolve(__dirname, 'lib/core/utils/')
    }
  }
};
