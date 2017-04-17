

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


/////////// Production environment //////////
var isProduction = process.env.NODE_ENV === 'production';
console.log("\nWebpack config: webpack.server.config.js")
console.log(`NODE_ENV: ${process.env.NODE_ENV}\n`);
//////////////////////////////////////////
const plugins = [
  new webpack.DefinePlugin({
    // http://stackoverflow.com/a/35372706/2177568
    // for server side code, just require, don't chunk
    // use `if (ONSERVER) { ...` for server specific code
    'process.env.NODE_ENV': JSON.stringify('production'),
    ONSERVER: true,
  }),
  new ExtractTextPlugin({
    filename: "stylesSSR.css", // output css file with same name as the entry point.
    allChunks: true,
    disable: false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    minimize: true,
    output: { comments: false },
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      // comparisons: false, // uglify bug: fails with mapbox
      // https://github.com/mapbox/mapbox-gl-js/issues/4359
      comparisons: true,
      sequences: true,
      evaluate: true,
      join_vars: true,
      if_return: true,
      unused: true,
      dead_code: true
    }
  })
]



const config = {

  entry: {
    // server: path.join(__dirname, 'dist', 'server.tsx')
    serverSSR: path.join(__dirname, 'dist', 'serverSSR.tsx')
    // [name].js = server.js
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
    // libraryTarget: 'commonjs2'
    // // server-side commonjs
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isProduction ? false : 'source-map',

  resolve: {
    extensions: [".webpack.js", ".ts", ".tsx", ".js"],
    alias: {
      // 'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl/dist/mapbox-gl.js'),
      'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl'),
      'styles': path.resolve(__dirname, 'src/styles')
    },
    modules: [
      "node_modules",
    ]
  },

  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM",
    // "auth0-lock": "Auth0Lock",
    // "mapbox-gl": "mapboxgl",
    // // must keep mapboxgl external if not using alias.
    // "react-mapbox-gl": 'ReactMapboxGl'
  },

  target: "node",
  // in order to ignore built-in modules like path, fs, etc.

  module: {
    noParse: /(mapbox-gl)\.js$/,
    rules: [
      {
        test: function (fpath) {
          isTsFile = (fpath.endsWith('.tsx') || fpath.endsWith('.ts'))
          testFile = fpath.match(/.spec.ts[x]/)
          return isTsFile && !testFile
        },
        exclude: [
          'node_modules',
          path.resolve(__dirname, 'src', 'typings'),
        ],
        use: [
          {
            loader: 'awesome-typescript-loader',
            // loader: 'ts-loader',
            options: {
              transpileOnly: true,
              useTranspileModule: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap'
          ]
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap',
            'resolve-url-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?sourceMap',
            'resolve-url-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.(jpg|svg|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              publicPath: isProduction ? '/dist/img/' : '/src/img/'
            }
          }
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              publicPath: isProduction ? '/dist/font/' : '/src/font/'
            }
          }
        ]
      }
    ]
  },

  plugins: plugins,

};

module.exports = config;


