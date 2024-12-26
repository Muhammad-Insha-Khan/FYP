const express = require('express');
const { registerSeller , signinSeller} = require('../controllers/sellerController');

const router = express.Router();

router.post('/register', registerSeller); // Endpoint to register a seller

router.post('/signin', signinSeller);


module.exports = router;
