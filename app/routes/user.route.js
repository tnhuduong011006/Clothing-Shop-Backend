const express = require("express");
const users = require('../controllers/user.controller');

const router = express.Router();

router.route("/:id")
    .get(users.findOne)
    .post(users.update)
    .delete(users.delete);


router.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll);


module.exports = router;
