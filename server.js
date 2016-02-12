const express = require('express');
const path = require('path');
const compression = require('compression');
const chalk = require('chalk');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(compression());

if (app.settings.env === 'production') {
  app.use(express.static(path.join(__dirname, './static'), {
    maxAge: (60 * 60 * 1000),
  }));
} else {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('404');
});

app.listen(app.get('port'), () => {
  console.log(chalk.bold.blue(
    `=> app in ${app.get('env')} at http://localhost:${app.get('port')}`
  ));
});
