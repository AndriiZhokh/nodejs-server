const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const { getFromFile, saveToFile } = require('../util/file-helpers.js');

const Cart = require('./cart');

const filePath = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	async save() {
		try {
			let products = await getFromFile(filePath);

			if (this.id) {
				const existingProductIndex = products.findIndex((prod) => Number(prod.id) === Number(this.id));
				const updatedProducts = [...products];
				updatedProducts[existingProductIndex] = this;
				
				await saveToFile(filePath, updatedProducts);
			} else {
				this.id = Date.now();

				if (products) {
					products.push(this);
				} else {
					products = [this];
				}

				await saveToFile(filePath, products);
			}
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

	static async deleteById(id) {
		try {
			const products = await getFromFile(filePath);

			const product = products.find((prod) => Number(prod.id) === Number(id));
			const updatedProducts = products.filter((prod) => Number(prod.id) !== Number(id));

			await saveToFile(filePath, updatedProducts);
			await Cart.deleteProduct(id, product.price);
		} catch(error) {
			console.log(error);
		}
	}
};
