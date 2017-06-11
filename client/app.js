function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var stocks = [];

function getAllStocks() {
  fetch('/stocks')
    .then(function(resp) {
      return resp.json();
    })
    .then(function(data) {
      stocks = data;
      showList(stocks);
    });
}

function getStock(reqStock) {
  var symbol = reqStock.symbol;
  fetch('/stocks/'+symbol)
    .then(function(resp) {
      return resp.json();
    })
    .then(function(newStock) {
      let stockIndex = _.findIndex(stocks, function(stock){ return stock.symbol === symbol });
      if(stockIndex>-1){
        stocks.splice(stockIndex, 1, newStock);
      }else{
        stocks.push(newStock);
      }
      showList(stocks);
    });
}

function showList(stocks) {
  $('#stock-list button').remove();
  stocks.forEach(function(stock){
    $('#stock-list').append('<button class="list-group-item"><h3>'+stock.symbol+' <span class="badge xl">'+stock.price+'</span></h3></button>');
  });
}

function getValues(){
  var symbol = document.querySelector('input[name=symbol-name]').value.toUpperCase();
  document.querySelector('input[name=symbol-name]').value = '';
  return { symbol: symbol };
};


ready(function() {
  var minute = 60*1000;
  var refreshTime = 5*minute;
  var interval = setInterval(getAllStocks, refreshTime);
  var form = document.querySelector('form');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var stock = getValues();
    getStock(stock);
    return false;
  });

  getAllStocks();
});
