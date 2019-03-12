const mysql = require('mysql');

const {database} = require('./key');

const { promisify } = require('util');
//BUENA ESA
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE_CONENECTION WAS CLOSED');
        }
        
        if(err.code === 'ER_COUNT_ERROR'){
            console.error('DATABASE TOO MANY CONENECTIONS ');
        }

        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONENECTION WAS REFUSED');
        }
    }

    if(connection){
        connection.release();
        console.log('DB IS CONNECTED');
        return;
    }
});

//promisify pool query
pool.query = promisify(pool.query);

module.exports = pool;