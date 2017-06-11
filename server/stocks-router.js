var _ = require('lodash');
var stockRouter = require('express').Router();
var https = require('https');

var stockModel = require('./stocks');

var stocks = [];
const URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22SYMBOL%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

function getStockProps(stockObj){
  return {
    symbol: stockObj.query.results.quote.Symbol,
    price: stockObj.query.results.quote.LastTradePriceOnly,
    datetime: stockObj.query.results.quote.LastTradeDate + ' ' + stockObj.query.results.quote.LastTradeTime
  };
}

function getStock(symbol){
  var stockUrl = URL.replace('SYMBOL', symbol);
  return new Promise((resolve, reject) => {
    callStockAPI(stockUrl)
      .then(function(response){
        return JSON.parse(response)
      })
      .then(function(resObj){
        var stockObj = getStockProps(resObj);
        insertToDb(stockObj);
        resolve(stockObj);
      })
  });
}

function callStockAPI(stockUrl){
  var acc = [];

  return new Promise((resolve, reject) => {
    var req = https.get(stockUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error('Error!: ' + res.statusCode));
      }
      res.on('data', function(partial){
        return acc.push(partial);
      })
      res.on('end', function(){
        resolve(acc.join(''));
      })
    });
    req.on('Error', function(e){
      return reject(e);
    })
  });
}

function insertToDb(stock){
  return stockModel.create({
    symbol: stock.symbol,
    price: stock.price,
    datetime: stock.datetime
  });
}

stockRouter.get('/:symbol', function(req, res){
  let symbol = req.params.symbol;
  getStock(symbol).then(function(stockObj){
    stocks.push(stockObj);
    res.json(stockObj);
  });

});

stockRouter.get('/', function(req, res){
  var promises = [];
  
  function getSymbolPromise(stockObj){
    return getStock(stockObj.symbol);
  }

  if(stocks.length===0){
    res.json([]);
  }else{
    promises = stocks.map(getSymbolPromise);
    Promise.all(promises)
      .then(function(result){
        res.json(result);
      }).catch(function(reason){ 
        console.log(reason);
        res.json(reason);
      });
  }
});

module.exports = stockRouter;
