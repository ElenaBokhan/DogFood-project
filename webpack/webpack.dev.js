const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, '../dist'),
		port: 8080,
		open: true,
		hot: true,
	},
	plugins: [new ReactRefreshWebpackPlugin()],
};
