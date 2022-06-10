// Mysql DB
// module.exports = (sequelize, Sequelize) => {
//     const User = sequelize.define("users", {
//         id: {
//             type: Sequelize.STRING,
//             primaryKey: true
//         },
//         name: {
//             type: Sequelize.STRING
//         },
//         email: {
//             type: Sequelize.STRING
//         },
//         password: {
//             type: Sequelize.STRING
//         }
//     });
//     return User;
// };

// Mongo DB
const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        id: String,
        name: String,
        email: String,
        password: String,
    })
);

module.exports = User;
