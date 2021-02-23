import "reflect-metadata";
import express from "express";
import "./database";
import { router } from "./routes";

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => console.log("Server is running"));