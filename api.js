
module.exports.isDiceCodeValid = function(dice_code) {
    return  /^\d*d[1-9]\d*([+\-]\d+)?$/i.test(dice_code);
}


module.exports._splitDiceLiteral = function(dice_code) {
    const hasPlus = dice_code.includes("+");
    const hasMinus = dice_code.includes("-");

    let dicepart, constant;
    if(hasPlus) {
        const parts = dice_code.split("+");
        dicepart = parts[0];
        constant = parseInt(parts[1]);
    } else if(hasMinus) {
        const parts = dice_code.split("-");
        dicepart = parts[0];
        constant = -parseInt(parts[1]);
    } else {
        dicepart = dice_code;
        constant = 0;
    }

    const parts = dicepart.split("d");
    const numRolls = parseInt(parts[0]) || 1;  // NOTE(bora): It may be omitted if there's only 1 die.
    const sides = parseInt(parts[1]);
    return [numRolls, sides, constant];
}


module.exports.roll = function(dice_code) {
    const valid = this.isDiceCodeValid(dice_code);
    if(!valid) {
        return { dice_code, error: "Invalid dice code" };
    }

    const [ numRolls, sides, constant ] = this._splitDiceLiteral(dice_code);
    let result = 0;
    for(let i = 0; i < numRolls; ++i) {
        result += 1 + Math.floor(Math.random()*sides);
    }

    result += constant;

    return { dice_code, result };
}
