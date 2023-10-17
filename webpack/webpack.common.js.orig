const HTMLWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const {isProd, filename} = require(path.resolve(__dirname, 'consts.ts'));

module.exports = {
	entry: path.resolve(__dirname, '../src/index.tsx'),
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: filename('js', 'scripts')
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
				/** чтобы проиницилизовать его автоматически можно установить пакет typesctipt глобально или использовать npx выполнив команду npx tsc --init
				После создания конфига нужно включить "allowJs": true, чтобы работать не только c typescript, также меняем "jsx": "react" чтобы мы могли работать с react компонентами и включаем карту ресурсов "sourceMap": true, пока на этом все вернемся в этот конфиг позже*/
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|webp)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/images/[hash][ext][query]',
				},
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'static/fonts/[hash][ext][query]',
				},
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: ['@svgr/webpack', 'url-loader'],
			},
			{
				test: /\.css$/,
				use: [
					isProd ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								exportLocalsConvention: 'camelCaseOnly',
								localIdentName: '[local]__[hash:base64:5]',
								auto: /\.module\.\w+$/i,
							},
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.tsx', '.ts', '.json', '.css'],
		modules: ['node_modules', 'src'],
	},
	plugins: [
		new HTMLWebpackPlugins({
			template: path.resolve(__dirname, '../public/index.html')
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css', 'styles')
		}),
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
	],
};
