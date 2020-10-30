const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {title: "Landing Page"});
});

router.get('/register', (req, res) => {
    res.render('register.hbs', {title: "Registration"})
})

router.get('/login', (req, res) => {
    res.render('login', {title: "Login"})
})

router.get('/logout', (req, res) => {
    res.render('login', {title: "Login"})
})

router.get('/cart', (req, res) => {
    res.render('cart', {title: "Shopping Cart"})
})

router.get('/error', (req, res) => {
    res.render('error', {title: "Error"})
})

router.get('/post', (req, res) => {
    res.render('post', {title: "Post"})
})

router.get('/products', (req, res) => {
    res.render('products', {title: "Products"})
})

router.get('/profile', (req, res) => {
    res.render('profile', {title: "Profile"})
})

module.exports = router;