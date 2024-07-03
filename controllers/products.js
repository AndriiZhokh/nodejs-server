const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = async (req, res, next) => {
	const product = new Product(req.body.title);
	await product.save();
    res.redirect('/');
};

exports.getProducts = async (req, res, next) => {
	const products = await Product.fetchAll();
    res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
};
