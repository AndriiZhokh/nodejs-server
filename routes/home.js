const express = require('express');

const router = express.Router();
const users = [];

router.get('/', (req, res, next) => {
    res.render('add-user', { pageTitle: 'Add Users' });
});

router.post('/add-user', (req, res, next) => {
    const { userName } = req.body
    users.push({ userName });
    res.redirect('/users');
});

exports.homeRoutes = router;
exports.users = users;
