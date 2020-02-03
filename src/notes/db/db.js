const { Pool } = require('pg');
const pool = new Pool(
    {
        user: 'postgres',
        host: '172.23.0.1',
        database: 'database1',
        password: 'example',
        port: 5432
        
    }
);
module.exports = pool;