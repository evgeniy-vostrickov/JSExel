import path from 'path'
import type {Configuration} from 'webpack';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'


type extensionsTypes = 'js' | 'ts' | 'css'
type Mode = 'development' | 'production'
interface EnvVariables {
  mode: Mode
}


export default (env: EnvVariables) => {
  const isProd = env.mode === 'production'
  const isDev = !isProd
  const filename = (ext: extensionsTypes) => isProd ?
  `bundle.[fullhash].${ext}` : `bundle.${ext}`
  const devServer: DevServerConfiguration = isDev ? {
    // static: {
    //     directory: path.join(__dirname, 'public'),
    // },
    // compress: true,
    port: 3000,
    open: isDev,
    hot: isDev,
  } : undefined;

  const config: Configuration = {
    context: path.resolve(__dirname, 'src'),
    mode: env.mode ?? 'development',
    entry: './index.ts',
    output: {
      filename: filename('js'),
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
        '@core': path.resolve(__dirname, 'src/core/'),
      },
      plugins: [new TsconfigPathsPlugin({
        extensions: ['.js', '.json', '.ts'],
      })],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: devServer,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname,
            path.resolve(__dirname, 'src', 'index.html')),
        minify: {
          collapseWhitespace: isProd,
          removeComments: isProd,
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
      new ESLintPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        // Webpack enables use of loaders to preprocess files.
        // This allows you to bundle any static resource way beyond JavaScript.
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
              ],
            },
          },
        },
      ],
    },
  }
  return config
}
