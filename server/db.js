var Sequelize = require('sequelize');
var config = require('./config');

var sequelize = new Sequelize('stocks_db', config.user, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    omitNull: true
});

sequelize
    .authenticate()
    .then(function(){
        console.log('Connection has been established successfully.');
    })
    .catch(function(err){
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;
