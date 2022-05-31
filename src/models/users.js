import Sequelize from "sequelize";
import db from "../config/database.js"

const Users = db.define('users', {
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

export default Users;