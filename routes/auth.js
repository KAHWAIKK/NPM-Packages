const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')


//defining our router

router.post('/',authController.handleLogin);


module.exports = router;