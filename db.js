const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'jsdno4273!',
    database: 'postgres',
    host: 'localhost',
    port: '5432'
});

module.exports = pool;