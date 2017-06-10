var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var stockRouter = require('./stocks');

app.use(morgan('dev'))
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/stocks', stockRouter);

app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

app.listen(3000);
console.log('listening on port 3000...');
