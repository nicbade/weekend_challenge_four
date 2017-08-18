var pg = require('pg');

var config = {
    database: 'nicbade',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 1500
};

module.exports = pg.Pool(config);