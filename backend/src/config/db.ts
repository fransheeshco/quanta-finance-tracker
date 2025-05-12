import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Recommended for Heroku Postgres
      rejectUnauthorized: false, // Depending on your setup
    },
  },
});

export default sequelize;