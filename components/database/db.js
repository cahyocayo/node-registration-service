'use strict';

/**
 * @name db
 * @author M H Nurcahyo
 * @version 1.0.0
 */

const mysql = require('mysql');

const model = require('./model');

let config = {};

config = require('../../config/config.json')

// let db = {}
let con = mysql.createPool(config.sql);
con.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), '[MYSQL] error', err+'\n');
  });
  connection.on('close', function (err) {
    console.error(new Date(), '[MYSQL] close', err+'\n');
  });

});

module.exports = con;
