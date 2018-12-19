'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var db = {};

// const sequelize = new Sequelize('autoflow', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
//   operatorsAliases: false,
//   logging: console.log
// });

const sequelize = new Sequelize('mohsende_autoflow', 'mohsende_memo', 'memo@autoflow', {
  host: 'gator3278.hostgator.com',
  dialect: 'mysql',
  operatorsAliases: false
  // logging: console.log
});

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
