import pg from 'pg';
import { Sequelize } from 'sequelize';

const dbUri = process.env.DB_URI;

if (!dbUri) {
    throw new Error('Database URI was not provided');
}

const connection = new Sequelize(dbUri, { logging: false, dialectModule: pg });

export default connection;
