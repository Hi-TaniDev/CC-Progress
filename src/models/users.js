const Sequelize = require('sequelize');
const db = require('../config/dabatabase');

const users = db.define('users', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    refresh_token: {
        type: Sequelize.TEXT
    }
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = users;