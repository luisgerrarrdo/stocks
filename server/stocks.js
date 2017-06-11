var Sequelize = require('sequelize')
var sequelizeConnection = require('./db');

var Stock = sequelizeConnection
  .define('stocks', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    symbol: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.FLOAT
    },
    datetime: {
        type: Sequelize.STRING
    }
  }, { timestamps: false });

module.exports = Stock;