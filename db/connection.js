const { Sequelize } = require('sequelize');

const db = new Sequelize('budget', 'root', 'qwe123', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

module.exports = db;