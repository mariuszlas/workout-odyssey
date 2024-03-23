import mysql2 from 'mysql2';
import { Sequelize } from 'sequelize';

const dbUri = process.env.DB_URI;

if (!dbUri) {
    throw new Error('Database URI was not provided');
}

const connection = new Sequelize(dbUri, {
    logging: false,
    dialectModule: mysql2,
});

export default connection;
