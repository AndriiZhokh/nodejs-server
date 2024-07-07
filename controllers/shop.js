const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getShopPage = (req, res, next) => {
  res.render('shop/index', { pageTitle: 'Shop', path: '/'});
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path: '/products' });
};

exports.getProduct = async (req, res, next) => {
  const productId = Number(req.params.productId);
  const product = await Product.findById(productId);
  res.render('shop/product-detail', { product, pageTitle: 'Product Details', path: '/products' });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart' });
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  await Cart.addProduct(productId, product.price);

  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

