

const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController')


//defining our router

router.get('/', refreshTokenController.handleRefreshToken);


module.exports = router;