var webpack = require('webpack');
var package = require('./package.json');

module.exports = {
	entry: './src/jsObject.js',
	output: {
		path: './build',
		filename: 'jsObject-' + package.version + '.min.js',
		library: 'O',
		libraryTarget: 'umd'
	}
};
