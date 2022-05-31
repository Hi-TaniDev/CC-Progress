const Sequelize = require("sequelize");

const db = new Sequelize('app_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;