const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const path = require('path');

const production = process.env.NODE_ENV === 'production';

let plugins = [
    new ExtractTextPlugin("css/bundle.css"),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })          
]

if (production) {
    plugins = plugins.concat([

        new CleanPlugin('./client/dist/assets/css'),
        new CleanPlugin('./client/dist/assets/js'),
        new CleanPlugin('./client/dist/assets/**.*'),

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),

        // This plugins defines various variables that we can set to false
        // in production to avoid code related to them from being compiled
        // in our final bundle
        new webpack.DefinePlugin({
            __SERVER__: !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__: !production,
            'process.env': {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),

    ]);
}

module.exports = {
    debug: !production,
    devtool: production ? false : 'source-map',
    entry: [
        'script!jquery/dist/jquery.js',
        'script!bootstrap/dist/js/bootstrap.js',
        './client/src/main.js'
    ],
    externals: {
        jquery: 'jQuery'
    },    
    output: {
        path: path.resolve(__dirname, 'client/dist/assets'),
        publicPath: '/assets',
        filename: 'js/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel',
                include: __dirname + '/client/src/',
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                loader: 'url-loader'
            },
            { 
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192' 
            }        
        ]
    },
    plugins: plugins
}