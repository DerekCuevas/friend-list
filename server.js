const express = require('express');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

if (app.settings.env === 'production') {
  app.use(express.static(path.join(__dirname, './static')));
} else {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
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
