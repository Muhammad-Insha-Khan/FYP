const express = require('express');
const { registerBuyer, signinBuyer } = require('../controllers/buyerController');

const router = express.Router();

// Register route
router.post('/register', registerBuyer);

// Sign-in route
router.post('/signin', signinBuyer);

module.exports = router;
