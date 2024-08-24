//webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const  HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].${ext}`

const plugins = () => {
    const base = [
          new HtmlWebpackPlugin({
            template: './src/pug/index.pug',
            filename: 'index.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/shop.pug',
            filename: 'shop.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/about.pug',
            filename: 'about.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/product.pug',
            filename: 'product.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/cart.pug',
            filename: 'cart.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/checkout.pug',
            filename: 'checkout.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/delivery.pug',
            filename: 'delivery.html',
            chunks: ['home'],
            minify: false
          }),
          new HtmlWebpackPlugin({
            template: './src/pug/faq.pug',
            filename: 'faq.html',
            chunks: ['home'],
            minify: false
          }),
          new MiniCssExtractPlugin({
            filename: './assets/css/' + filename('css')
          }),
          new CopyWebpackPlugin({
            patterns: [
              // {
              //   from: path.resolve(__dirname, 'src/assets/favicon.ico'),
              //   to: path.resolve(__dirname, 'assets')
              // },
              // {
              //   from: path.resolve(__dirname, 'src/assets/fonts'),
              //   to: path.resolve(__dirname, 'fonts')
              // },
              // {
              //   from: path.resolve(__dirname, 'src/assets/pics'),
              //   to: path.resolve(__dirname, 'assets/pics')
              // },
              {
                from: path.resolve(__dirname, 'src/assets/images'),
                to: path.resolve(__dirname, 'dist/assets/images')
              },
              {
                from: path.resolve(__dirname, 'src/assets/svg'),
                to: path.resolve(__dirname, 'dist/assets/svg')
              },
            ]
          }),
          new SpriteLoaderPlugin({ plainSprite: true }),
          new LiveReloadPlugin({
            appendScriptTag: true
          }),
    ]

    return base;
}

const cssLoaders = extra => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    // options: {
    //   hrm: true,
    // }
  }, 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};


const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }];
  return loaders;
}

module.exports = {
    mode: 'development',
    output: {
      filename: './assets/js/' + filename('js'),
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: './dist/assets/images/[name][ext]',
    },
    entry: {
        home: path.resolve(__dirname, 'src/assets/js/home.js'),
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
          '@js': path.resolve(__dirname, 'src/assets/js'),
          '@': path.resolve(__dirname, 'src'),
          '@styles' : path.resolve(__dirname, 'src/assets/sass'),
          '@images' : path.resolve(__dirname, 'src/assets/images'),
          '@svg' : path.resolve(__dirname, 'src/assets/images/svg')
        }
    },
    devServer: {
      watchFiles: path.join(__dirname, 'src'),
      port: 4000,
      open: true,
      hot: true,
      compress: true,
      liveReload: true,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'assets'),
      },
    },
    // devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: true,
          }
        },
        {
          test: /\.css$/,
          use: cssLoaders()
        },
        {
          test: /\.s[ac]ss$/,
          use: cssLoaders('sass-loader', {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              minimize: false,
              outputStyle: 'expanded'
            }
          })
        },
        {
          test: /\.(png|jpg|jpeg|gif|webp)$/i,
          type: 'asset',
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/,
          type: 'asset',
          include: path.resolve(__dirname, 'src/assets/fonts'),
          generator: {
            filename: path.join('icons', '[name].[contenthash][ext]'),
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                extract: true,
                spriteFilename: 'sprite.svg',
                runtimeCompat: true
              }
            },
            'svgo-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: jsLoaders()
        }
      ]
    },
};