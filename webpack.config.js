const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DEFAULT_GOOGLE_CLIENT_ID =
  '119207245132-lvund6pai0duaj668susvv16og66j3t2.apps.googleusercontent.com';

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  // Backend location is build-time configurable:
  //   API_BASE_URL=https://api.example.com/api npm run build
  // Production defaults to a same-origin path so the app can sit behind a reverse proxy.
  const apiBaseUrl =
    process.env.API_BASE_URL || (isProduction ? '/api' : 'http://localhost:5000/api');
  const googleClientId = process.env.GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;

  return {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.[contenthash].js',
      clean: true,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
      }),
      // Images in public/ are referenced by URL (e.g. '/images/company-logo.png') rather than
      // imported, so webpack would not emit them. The dev server serves public/ directly;
      // production needs them copied into dist/.
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public',
            globOptions: { ignore: ['**/index.html', '**/favicon.ico'] },
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.API_BASE_URL': JSON.stringify(apiBaseUrl),
        'process.env.GOOGLE_CLIENT_ID': JSON.stringify(googleClientId),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 3000,
      hot: true,
      historyApiFallback: true,
      open: true,
    },
  };
};
