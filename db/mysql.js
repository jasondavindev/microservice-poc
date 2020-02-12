const { Sequelize } = require('sequelize');
const { MYSQL_CONNECTION_URL } = require('../config');

module.exports = new Sequelize(MYSQL_CONNECTION_URL, { logging: false });
