"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Validate required environment variables
const requiredEnvVars = ['DB', 'DB_USERNAME', 'DB_PWORD', 'DB_HOST'];
for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        throw new Error(`${varName} is missing in .env file!`);
    }
}
// Create Sequelize instance with validated env variables
const sequelize = new sequelize_1.Sequelize({
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
});
exports.default = sequelize;
