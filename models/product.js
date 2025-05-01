const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class Product {
	constructor(title, price, description, imageUrl, id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id ? new ObjectId(id) : null;
	}

	async save() {
		const db = getDb();

		try {
			if (this._id) {
				return await db.collection('products').updateOne({ _id: this._id }, { $set: this });
			} 

			return await db.collection('products').insertOne(this);
		} catch(error) {
			console.log(error);
		}
	}

	static async fetchAll() {
		const db = getDb();

		try {
			const products = await db.collection('products').find().toArray();

			return products;
		} catch(error) {
			console.log(error);
		}
	}

	static async findById(prodId) {
		const db = getDb();
		console.log({ prodId });

		try {
			const product = await db.collection('products').find({ _id: new ObjectId(prodId) }).next();
			console.log(product);

			return product;
		} catch(error) {
			console.log(error);
		}
	}

	static async deleteById(prodId) {
		const db = getDb();
		try {
			const result = await db.collection('products').deleteOne({ _id: new ObjectId(prodId) });
			console.log('Deleted', result);
			return result;
		} catch(error) {
			console.log(error);
		}
	}
}

module.exports = Product;
