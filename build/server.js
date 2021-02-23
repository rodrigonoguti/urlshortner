"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("./database");
const routes_1 = require("./routes");
const app = express_1.default();
require('dotenv').config();
app.use(express_1.default.json());
app.use(routes_1.router);
app.listen(process.env.PORT, () => console.log("Server is running"));
