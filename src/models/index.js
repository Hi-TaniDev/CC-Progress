// MysqlDB
// const config = require("../config/db.config.js");
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//     config.DB,
//     config.USER,
//     config.PASSWORD,
//     {
//         host: config.HOST,
//         dialect: config.dialect,
//         operatorsAliases: false,
//         pool: {
//             max: config.pool.max,
//             min: config.pool.min,
//             acquire: config.pool.acquire,
//             idle: config.pool.idle
//         }
//     }
// );

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.user = require("./users.model.js")(sequelize, Sequelize);
// module.exports = db;

//MongoDB
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};

db.mongoose = mongoose;
db.user = require("./users.model.js");
db.photo = require("./photo.model.js");
module.exports = db;