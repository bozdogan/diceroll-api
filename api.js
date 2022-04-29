
module.exports.isDiceCodeValid = function(dice_code) {
    return  /^\d*d[1-9]\d*$/i.test(dice_code);
}

module.exports.roll = function(dice_code) {
    const valid = isDiceCodeValid(dice_code);
    console.log((valid ? "" : "IN") + "VALID", dice_code);

    if(valid) {
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
