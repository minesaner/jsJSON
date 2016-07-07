var webpack = require('webpack');
var package = require('./package.json');

module.exports = {
	entry: './src/jsJSON.js',
	output: {
		path: './build',
		filename: 'jsJSON-' + package.version + '.min.js',
		library: 'J',
		libraryTarget: 'umd'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		})
	]
};
