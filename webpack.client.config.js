

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


/////////// Production environment //////////
var isProduction = process.env.NODE_ENV === 'production'
console.log("\nWebpack config: webpack.client.config.js")
console.log(`NODE_ENV: ${process.env.NODE_ENV}\n`);

if (isProduction) {
  plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      ONSERVER: false,
    }),
    new ExtractTextPlugin({
      filename: "styles.css", // output css file with same name as the entry point.
      allChunks: true,
      disable: false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].js',
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
        dead_code: true,
      }
    })
  ]
} else {
  plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      ONSERVER: false,
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally, do NOT use with webpack-dev-server --hot, applied twice
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: "styles.css",
      disable: true, // can give css style flashes
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].js',
    }),
  ]
}
//////////////////////////////////////////



const config = {
  entry: isProduction
    ? { bundle: path.resolve(__dirname, 'src', 'index.tsx') }
    : [
      'react-hot-loader/patch',
      // activate HMR for React
      'webpack-dev-server/client?http://localhost:3333',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      path.resolve(__dirname, 'src', 'index.tsx')
      // the entry point of our app
  ],

  output: {
    filename: "bundle.js", // [name].js = bundle.js
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isProduction ? false : 'source-map',
  devServer: {
      port: 3333,
      hot: true,
      contentBase: path.resolve(__dirname, 'dist'),
      // match the output path
      publicPath: '/'
      // match the output `publicPath`
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      // 'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl/dist/mapbox-gl.js'),
      'mapbox-gl': path.resolve(__dirname, 'node_modules/mapbox-gl'),
      'styles': path.resolve(__dirname, 'src', 'styles'),
    },
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ]
  },

  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    // "auth0-lock": "Auth0Lock",
    // "mapbox-gl": "mapboxgl",
    // // must keep mapboxgl external if not using alias.
    // "react-mapbox-gl": 'ReactMapboxGl'
  },

  target: 'web',
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
          'typings'
        ],
        include: [
          path.resolve(__dirname, 'src'),
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


