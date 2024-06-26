const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin.js');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    // render view with selected template engine
    // for this file extension is not needed
    res.render('shop', { prods: products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;
