const express = require("express");
const contacts = require('../controllers/contact.controller');

const router = express.Router();

router.route("/favorite")
    .get(contacts.findAllFavorite);

router.route("/:id")
    .get(contacts.findOne)
    .post(contacts.update)
    .delete(contacts.delete);


router.route("/")
    .get(contacts.findAll)
    .post(contacts.create)
    .delete(contacts.deleteAll);


module.exports = router;
