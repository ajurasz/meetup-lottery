const express = require('express');
const app = express();
const http = require('http').Server(app);
const api = require('./api');

const production = process.env.NODE_ENV === 'production';
const unit = process.env.NODE_ENV === 'unit';

if (! (production || unit)) {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpack = require('webpack');

    const webpackConfig = require('./../webpack.config.js');

    const compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(__dirname + '/../client/dist'))

console.log(__dirname);

app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

app.use('/api', api);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/../client/dist/index.html');
});

http.listen(5000, function () {
    console.log('listening on port 5000');
});

module.exports = app;