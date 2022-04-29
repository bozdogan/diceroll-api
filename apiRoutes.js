const express = require("express");
const api = require("./api");

const router = express.Router();

router.get("/:dice_code?", (req, res) => {
    const { dice_code } = req.params;
    res.json(api.roll(dice_code));
});

module.exports = router;