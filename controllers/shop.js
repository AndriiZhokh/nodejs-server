const Product = require('../models/product');
const Order = require('../models/order');

exports.getShopPage = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render('shop/index', { prods: products, pageTitle: 'Shop', path: '/'});
  } catch(error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render('shop/product-list', { prods: products, pageTitle: 'All Products', path: '/products' });
  } catch(error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const productId = Number(req.params.productId);

  try {
    const product = await Product.findByPk(productId);
    res.render('shop/product-detail', { product, pageTitle: 'Product Details', path: '/products' });
  } catch(error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    res.render('shop/cart', { pageTitle: 'Cart', path: '/cart', products: products });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  const { productId } = req.body;

  try {
    const cart = await req.user.getCart()
    const products = await cart.getProducts({ where: { id: productId } })
    let newQuantity = 1;
    let product

    if (products.length) {
      product = products[0];
    }

    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    } else {
      product = await Product.findByPk(productId);
    }


    await cart.addProduct(product, { through: { quantity: newQuantity } });
    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const cart = await req.user.getCart();
    const products = await cart.getProducts({ where: { id: prodId } })
    const product = products[0];
    await product.cartItem.destroy();

    res.redirect('/cart');
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();
    const order = await req.user.createOrder();
    await order.addProducts(products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    }));
    await cart.setProducts(null);

    res.redirect('/orders');
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({ include: ['products'] });

    res.render('shop/orders', { pageTitle: 'Orders', path: '/orders', orders });
  } catch (error) {
    console.log(error)
  }
};

