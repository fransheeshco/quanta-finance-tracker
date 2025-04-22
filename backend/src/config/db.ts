import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['DB', 'DB_USERNAME', 'DB_PWORD', 'DB_HOST'] as const;
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`${varName} is missing in .env file!`);
  }
}

// Create Sequelize instance with validated env variables
const sequelize = new Sequelize({
  database: process.env.DB as string,
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PWORD as string,
  host: process.env.DB_HOST as string,
  dialect: 'postgres',
});

export default sequelize;
