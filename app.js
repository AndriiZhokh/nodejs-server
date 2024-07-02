const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./utils/path');

const { homeRoutes } = require('./routes/home');
const { usersRoutes } = require('./routes/users');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use(homeRoutes);
app.use(usersRoutes);

app.listen(port, () => console.log(`listening on port ${port}`));

