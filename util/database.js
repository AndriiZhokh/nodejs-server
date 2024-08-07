const { dataBasePassword } = require('../secrets');
const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node-complete',
	password: dataBasePassword,
});

module.exports = pool.promise();
