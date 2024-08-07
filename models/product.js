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
		return await db.execute(
			'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.imageUrl, this.description]
		);
	}

	static async fetchAll() {
		return await db.execute('SELECT * FROM products');
	}

	static async findById(id) {
		return await db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
	}

	static async deleteById(id) {
	}
};
