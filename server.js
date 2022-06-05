const express = require("express");
const cors = require("cors");
const app = express();

let corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({message: "GET HOME sukses"});
})

require("./src/routes/auth.routes.js")(app);
require("./src/routes/user.routes.js")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
});

const db = require("./src/models");
const authRoutes = require("./src/routes/auth.routes");
const dbConfig = require("./src/config/db.config");

// Mmysql DB
// db.sequelize.sync();

// MongoDB
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Succesfully connect to MongoDB.");
}).catch((err) => {
    console.error("Connection Error", err);
    process.exit();
});