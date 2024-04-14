function config(mode) {
	return {
		mode: mode,
		entry: {
			global: './src/js/global.js',
			home: './src/js/pages/home.js'
		},
		output: {
			filename: '[name].js',
		},
		module: {
			rules: [{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			}, ],
		},
	}
}

module.exports = config;