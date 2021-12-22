const express = require('express');
const router = express.Router();
const productController = require('../controllers/product')

router.route('/')
    .get(productController.getAll)

module.exports = router