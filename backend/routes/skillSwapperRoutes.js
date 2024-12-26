const express = require('express');
const { registerUser , signinSkillSwapper } = require('../controllers/SkillSwapperController');
const router = express.Router();

// POST route for user registration
router.post('/register', registerUser);
router.post('/signin', signinSkillSwapper);

module.exports = router;
