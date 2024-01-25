const canvas = document.getElementById("Area");
const ctx = canvas.getContext("2d");

function drawSnek (snek) {
    ctx.fillStyle = snek.color;
    for (let draw = 0; draw < snek.snekLength.length; draw++) {
        ctx.fillRect(snek.snekLength[draw].x, snek.snekLength[draw].y, snek.thickness, snek.thickness);
    };
};