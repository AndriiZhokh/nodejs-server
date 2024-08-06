const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'node-complete',
	// TODO: change placeholder to password to the database
	password: 'paste_actual_password_here'
});

module.exports = pool.promise();
