var _ = require('lodash');
var stockRouter = require('express').Router();
var https = require('https');

var stocks = [{id:1, name:'simba'}];
var id = 0;
const url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22STOCK%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

var stockUrl = url.replace('STOCK', 'EPAM');

const getStockProps = (stockObj) => {
    return {
      symbol: stockObj.query.results.quote.Symbol,
      price: stockObj.query.results.quote.LastTradePriceOnly,
      datetime: stockObj.query.results.quote.LastTradeDate + ' ' + stockObj.query.results.quote.LastTradeTime
    };
}
/*
$('#button').button();

$('#button').click(function() {
    $(this).html('<img src="http://www.bba-reman.com/images/fbloader.gif" />');
});
*/
function getStock(stockUrl){
    return new Promise((resolve, reject) => {
        fetchStockInfo(stockUrl)
            .then(function(response){
              return JSON.parse(response)
            })
            .then(function(resObj){
                // stock.query.results.quote.LastTradePriceOnly
                // const { LastTradeDate, LastTradeTime, LastTradePriceOnly }
                let stockProps = getStockProps(resObj);
                //saveStockInfo(stockProps);
                resolve(stockProps);
            })
    });
}

function fetchStockInfo(stockUrl){
    return new Promise((resolve, reject) => {
        const request = https.get(stockUrl, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load resource, status code: ' + response.statusCode));
            }
            const body = [];
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')))
        });

        request.on('error', (err) => reject(err));
    });
}



var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

stockRouter.param('id', function(req, res, next, id) {
  var stock = _.find(stocks, {id: id})

  if (stock) {
    req.stock = stock;
    next();
  } else {
    res.send();
  }
});

stockRouter.get('/', function(req, res){
  getStock(stockUrl).then(function(data){
    res.json(data);
  });
});

stockRouter.get('/:id', function(req, res){
  var stock = req.stock;
  console.log('hi from stockjs');
  res.json(stock || {});
});

module.exports = stockRouter;