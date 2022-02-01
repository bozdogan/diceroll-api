const express = require("express");

function roll(dice_code) {
    const isValid = /^\d*d[1-9]\d*$/i.test(dice_code);
    console.log((isValid ? "" : "IN") + "VALID", dice_code);

    if(isValid) {
        const parts = dice_code.split("d");
        const numRolls = parseInt(parts[0]);
        const sides = parseInt(parts[1]);
        console.log(numRolls, sides);

        let result = 0;
        for(let i = 0; i < numRolls; ++i) {
            result += 1 + Math.floor(Math.random()*sides);
        }

        return {dice_code, result}
    } else {
        return { error: "Invalid dice code"}
    }
}

const router = express.Router();

router.get("/:dice_code?", (req, res) => {
    const { dice_code } = req.params;
    res.json(roll(dice_code));
});

module.exports = router;