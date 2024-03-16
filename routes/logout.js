



const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logoutController')


//defining our router

router.get('/', logoutController.handleLogout);


module.exports = router;