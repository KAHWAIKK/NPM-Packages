const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController')


//defining our router

router.post('/',registerController.handleNewUser);


module.exports = router;