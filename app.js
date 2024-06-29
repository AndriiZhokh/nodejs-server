const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
// setting directory path that contain views
// by default it is 'views' and this line could be skipped
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Not Found', path: null });
});

app.listen(3000);
