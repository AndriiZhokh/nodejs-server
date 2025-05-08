const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongodbPassword } = require('./secrets');

const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

// const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

// app.use(async (req, res, next) => {
//     try {
//         const { name, email, cart, _id } = await User.findById('681471724d95f94415982c54');
//         req.user = new User(name, email, cart, _id);
//         next();
//     } catch(error) {
//         console.log(error);
//     }
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.getPageNotFound);

mongoose
  .connect(`mongodb+srv://andriizhokh:${mongodbPassword}@cluster0.max1c.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));
