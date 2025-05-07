const Product = require('../models/product');
// const Order = require('../models/order');

exports.getShopPage = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();

    res.render('shop/index', { prods: products, pageTitle: 'Shop', path: '/'});
  } catch(error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();

    res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path: '/products' });
  } catch(error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    res.render('shop/product-detail', { product, pageTitle: 'Product Details', path: '/products' });
  } catch(error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const products = await req.user.getCart();

    res.render('shop/cart', { pageTitle: 'Cart', path: '/cart', products: products });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const product = await Product.findById(productId);
    await req.user.addToCart(product);

    res.redirect('/cart')
  } catch(error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    await req.user.deleteItemFromCart(prodId);

    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    await req.user.addOrder();

    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders();

    res.render('shop/orders', { pageTitle: 'Orders', path: '/orders', orders });
  } catch (error) {
    console.log(error)
  }
};

