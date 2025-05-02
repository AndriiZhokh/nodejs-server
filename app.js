const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

const { mongoConnect } = require('./util/database');
const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(async (req, res, next) => {
    try {
        const { name, email, cart, _id } = await User.findById('681471724d95f94415982c54');
        req.user = new User(name, email, cart, _id);
        next();
    } catch(error) {
        console.log(error);
    }
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

mongoConnect()
  .then(() => {
    app.listen(3000);
  })
