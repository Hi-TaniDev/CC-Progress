import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./src/config/database.js";
import routes from "./src/routes/routes.js";
dotenv.config();

const app = express();
const port = 5000;

app.use(cors({credentials:true, origin:`http://localhost:${port}`}))
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, ()=> {
  console.log(`Listening on : http://localhost:${port}`)
});