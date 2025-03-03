const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl);

  try {
    const result = await product.save();

    console.log('PRODUCT CREATED');
    res.redirect('/admin/products');
  } catch(error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit === 'true' ? true : false;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  try {
    const product = await Product.findById(prodId);

    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', { pageTitle: 'Edit Product', path: '/admin/edit-product', editing: editMode, product: product });
  } catch(error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  try {
    const product = await Product.findByPk(prodId);
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;

    await product.save();
    console.log('UPDATED PRODUCT');

    res.redirect('/admin/products');
  } catch(error) {
    console.log(error);
  }
};

exports.getAdminProducts = async (req, res, next) => {
  const prods = await Product.fetchAll();
  res.render('admin/products', { pageTitle: 'Admin Products', path: '/admin/products', prods });
};

// exports.postDeleteProduct = async (req, res, next) => {
//   const productId = req.body.productId;
//
//   try {
//     const product = await Product.findByPk(productId);
//     console.log('DESTROYED PRODUCT');
//     await product.destroy();
//
//     res.redirect('/admin/products');
//   } catch(error) {
//     console.log(error);
//   }
// };

