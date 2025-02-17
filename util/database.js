const { mongodbPassword } = require('../secrets');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async () => {
	try {
		const client = await MongoClient.connect(`mongodb+srv://andriizhokh:${mongodbPassword}@cluster0.max1c.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`)
		console.log('Connected!');

		_db = client.db();
		return client;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	
	throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

