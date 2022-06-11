// Mysql test (auth)
// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "",
//     DB: "app_db",
//     dialect: "mysql",
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// }

// MongoDB
// module.exports = {
//     HOST: "localhost",
//     PORT: 27017,
//     DB: "app_db",
//     PHOTOBUCKET: "photos"
// }

const dbUrl = "mongodb+srv://admin:" + encodeURIComponent("admin") + "@hitani.0dt11yi.mongodb.net"

module.exports = {
    HOST : dbUrl,
    DB : "hitani",
    PHOTOBUCKET: "photos"
}