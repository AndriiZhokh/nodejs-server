const { getDb } = require('../util/database');

class Product {
	constructor(title, price, description, imageUrl) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
	}

	async save() {
		const db = getDb();

		try {
			const result = await db.collection('products').insertOne(this);
			console.log(result);

			return result;
		} catch(error) {
			console.log(error);
		}
	}
}

module.exports = Product;
