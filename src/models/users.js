const Sequelize = require('sequelize');
const db = require('../config/dabatabase');

const users = db.define('users', {
    nama: {
        type: Sequelize.DataTypes.STRING
    },
    email: {
        type: Sequelize.DataTypes.STRING
    },
    password: {
        type: Sequelize.DataTypes.STRING
    },
    refresh_token: {
        type: Sequelize.DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = users;