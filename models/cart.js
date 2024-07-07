const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const { getFromFile, saveToFile } = require('../util/file-helpers');

const cartPath = path.join(
	rootDir,
	'data',
	'cart.js',
);

module.exports = class Cart {
	static async addProduct(productId, productPrice) {
		try {
			let cart = { products: [], totalPrice: 0 };
			const cartContent = await getFromFile(cartPath);
			if (cartContent) {
				cart = cartContent;
			}

			const existingProductIndex = cart.products.findIndex((prod) => prod.id === productId);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;

			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: productId, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}

			cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);

			await saveToFile(cartPath, cart);
		} catch(error) {
			console.log(error);
		}
	}
}

