const canvas = document.getElementById("Area");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.getWidth;
const canvasHeight = canvas.getHeight;
let canvasColor = "#000000";

function clearScreen(){
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

function drawSnek (snek) {
    ctx.fillStyle = snek.color;
    for (let draw = 0; draw < snek.snekLength.length; draw++) {
        ctx.fillRect(snek.snekLength[draw].x, snek.snekLength[draw].y, snek.thickness, snek.thickness);
    };
};

function drawApples (apple) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(apple.pos.x, apple.pos.y, apple.thickness, apple.thickness);  
};