const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./src/config/dabatabase");
const routes = require("./src/routes/routes");
dotenv.config();
const app = express();
const port = 5000;

app.use(cors({credentials:true, origin:`http://localhost:${port}`}))
app.use(cookieParser());
app.use(express.json())
app.use(routes);

app.listen(port, ()=> {
  console.log(`Listening on : http://localhost:${port}`)
})