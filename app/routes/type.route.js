const express = require("express");
const types = require('../controllers/type.controller');

const router = express.Router();

router.route("/:id")
    .get(types.findOne)
    .post(types.update)
    .delete(types.delete);


router.route("/")
    .get(types.findAll)
    .post(types.create)
    .delete(types.deleteAll);


module.exports = router;
