const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'products.json');

function getProductsFromFile() {
	return new Promise((resolve, rejects) => {
		fs.readFile(filePath, (error, fileContent) => {
			if (error) {
				resolve([]);
			} else {
				const products = JSON.parse(fileContent);
				resolve(products ? products : []);
			}
		});
	});
}

function saveProductsToFile(products) {
	return new Promise((resolve, rejects) => {
		fs.writeFile(filePath, JSON.stringify(products), (error) => {
			if (error) {
				rejects(error);
			} else {
				resolve();
			}
		});
	});
}

module.exports = class Product {
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	async save() {
		try {
			const products = await getProductsFromFile();
			products.push(this);

			await saveProductsToFile(products);

		} catch(error) {
			console.log(error);
		}
	}

	static async fetchAll() {
		try {
			return await getProductsFromFile();
		} catch(error) {
			return [];
		}
	}
};
