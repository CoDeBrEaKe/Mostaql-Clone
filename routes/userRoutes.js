const express = require("express");

const router = express.Router();

// This function is better to go inside controller
router.get("/", (req, res) => {});
router.post("/", (req, res) => {});

module.exports = router;
