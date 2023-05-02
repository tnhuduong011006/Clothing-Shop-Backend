const express = require("express");
const products = require('../controllers/product.controller');

const router = express.Router();

router.route("/:id")
    .get(products.findOne)
    .post(products.update)
    .delete(products.delete);


router.route("/")
    .get(products.findAll)
    .post(products.create)
    .delete(products.deleteAllByType);


module.exports = router;
