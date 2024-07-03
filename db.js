const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOSTNAME,
    port: process.env.DB_PORT,
});