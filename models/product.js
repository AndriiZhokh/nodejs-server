const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const { getFromFile, saveToFile } = require('../util/file-helpers.js');

const filePath = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	async save() {
		try {
			this.id = Date.now();
			let products = await getFromFile(filePath);

			if (products) {
				products.push(this);
			} else {
				products = [this];
			}

			await saveToFile(filePath, products);

		} catch(error) {
			console.log(error);
		}
	}

	static async fetchAll() {
		try {
			const products = await getFromFile(filePath);

			return products ? products : [];
		} catch(error) {
			return [];
		}
	}

	static async findById(id) {
		try {
			const products = await getFromFile(filePath);

			return products?.find((p) => Number(p.id) === Number(id));
		} catch(error) {
			console.log(error);
		}
	}
};
