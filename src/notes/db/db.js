const { Pool } = require('pg');
const pool = new Pool(
    {
        user: 'postgres',
        host: '172.23.0.1',
        
    }
);
module.exports = pool;