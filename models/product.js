const db = require('../util/database');
const Cart = require('./cart');


module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	async save() {
	}

	static async fetchAll() {
		return await db.execute('SELECT * FROM products');
	}

	static async findById(id) {
	}

	static async deleteById(id) {
	}
};
