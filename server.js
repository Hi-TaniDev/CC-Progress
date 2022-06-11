const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const conn = mongoose.connection;
const Grid = require("gridfs-stream");

const db = require("./src/models");
const dbConfig = require("./src/config/db.config");
const cookieParser = require("cookie-parser");

let gfs;

let corsOptions = {
    origin: "*"
};

// Mmysql DB
// db.sequelize.sync();

// MongoDB
const initDB = async () => {
    // db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    db.mongoose.connect(`${dbConfig.HOST}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then( () => {
        console.log("Succesfully connect to MongoDB.");
    }).catch((err) => {
        console.error("Connection Error", err);
        process.exit();
    });
};

initDB();

conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({message: "GET HOME sukses"});
})

require("./src/routes/auth.routes.js")(app);
require("./src/routes/user.routes.js")(app);
require("./src/routes/upload.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});





