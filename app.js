const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { engine, create } = require('express-handlebars');

const rootDir = require('./util/path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

const hbs = create({
  layoutDir: 'views/layouts/',
  defaultLayout: 'main-layout',
  extname: 'hbs', // extension for main layout
  helpers: {
    linkCSS: (path) => path === '/admin/add-product' ? `<link rel="stylesheet" href="/css/product.css">` : '',
    setActiveShop: (path) => path === '/' ? 'active' : '',
    setActiveAddProduct: (path) => path === '/admin/add-product' ? 'active' : '',
  },
});

app.engine('hbs', hbs.engine); // hbs extension for other views
app.set('view engine', 'hbs');
// setting directory path that contain views
// by default it is 'views' and this line could be skipped
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Not Found' });
});

app.listen(3000);
