const express = require('express');
const path = require('path');
const chalk = require('chalk');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, './static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404');
});

app.listen(app.get('port'), () => {
  console.log(chalk.bold.blue(
    `=> app in ${app.get('env')} at http://localhost:${app.get('port')}`
  ));
});
