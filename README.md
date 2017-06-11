## Stocks App

This is a simple exercise of a Node+Express Server that connects to Mysql DB.

Setup steps:
  1. `git clone https://github.com/luisgerrarrdo/stocks.git`
  2. `cd stocks`
  3. `npm install`
  4. change the user and password to your mysql valid user and password in the /server/config.js
  5. make sure your MySql server is running
  6. copy the content of the script located at 'database/script.sql' into your MySql Command Line Client
  7. `npm start`
  8. go to http://localhost:3000 in your browser


This project is using the following dependencies and versions:
  * body-parser: 1.13.2
  * bootstrap: 3.3.7
  * express: 4.13.1
  * lodash: 3.10.0
  * mysql2: 1.3.3
  * sequelize: 4.0.0
