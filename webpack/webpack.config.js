// webpack
const webpack = require('webpack');
const path = require('path');

const parentPath = path.resolve(__dirname, '..');
module.exports = {
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_module/,
      },
      {
        test: /\.css$/,
        // include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')(
                    {
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie <9'
                      ],
                      flexbox: 'no-2009'
                    }
                )
              ],
              sourceMap: true
            }
          },
          {
            loader: "sass-loader"
          }

        ]
      },
    ],
  }
};


