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

exports.getCart = async (req, res, next) => {
  const cart = await Cart.getCart();
  const products = await Product.fetchAll();
  const cartProducts = [];

  for (product of products) {
    const cartProductData = cart?.products.find((prod) => Number(prod.id) === Number(product.id));

    if (cartProductData) {
      cartProducts.push({ productData: product, qty: cartProductData.qty });
    }
  }

  res.render('shop/cart', { pageTitle: 'Cart', path: '/cart', products: cartProducts });
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  await Cart.addProduct(productId, product.price);

  res.redirect('/cart');
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const product = await Product.findById(prodId);

  await Cart.deleteProduct(prodId, product.price);

  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

