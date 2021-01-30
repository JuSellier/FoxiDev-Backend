const express = require("express");
const router = express.Router();
const contactControllers = require("./contact.controllers");

router.post("/", contactControllers.newMessage);

module.exports = router;
