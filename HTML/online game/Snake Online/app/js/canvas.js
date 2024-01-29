const canvas = document.getElementById("Area");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
let canvasColor = "#000000";

function clearScreen(){
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

function drawSnek (TheSnek) {
    ctx.fillStyle = TheSnek.color;
    for (let draw = 0; draw < TheSnek.snekLength.length; draw++) {
        ctx.fillRect(TheSnek.snekLength[draw].x, TheSnek.snekLength[draw].y, TheSnek.thickness, TheSnek.thickness);
    };
};

function drawApples (apple) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(apple.pos.x, apple.pos.y, apple.thickness, apple.thickness);  
};