const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, description, price);
  await product.save();
  res.redirect('/');
};

exports.getAdminProducts = async (req, res, next) => {
  const prods = await Product.fetchAll();
  res.render('admin/products', { pageTitle: 'Admin Products', path: '/admin/products', prods });
};

