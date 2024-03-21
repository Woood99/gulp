function config(mode) {
	return {
		mode: mode,
		entry: {
			home: './src/js/pages/home.js'
		},
		output: {
			filename: '[name].js',
		},
		module: {
			rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}, ],
		},
	}
}

module.exports = config;