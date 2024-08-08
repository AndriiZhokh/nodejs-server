const { dataBasePassword } = require('../secrets');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', dataBasePassword, {
	dialect: 'mysql',
	host: 'localhost',
});

module.exports = sequelize;
