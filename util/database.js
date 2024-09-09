const { mongodbPassword } = require('../secrets');

const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const mongoConnect = async () => {
	try {
		const client = await MongoClient.connect(`mongodb+srv://andriizhokh:${mongodbPassword}@cluster0.max1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
		console.log('Connected!');

		return client;
	} catch (error) {
		console.log(error);
	}
};

module.exports = mongoConnect;

