const Product = require('../models/product');

exports.getShopPage = (req, res, next) => {
  res.render('shop/index', { pageTitle: 'Shop', path: '/'});
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path: '/products' });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  res.render('shop/product-detail', { productId, pageTitle: 'Product Details' });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

