const canvas = document.getElementById("simArea");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasCenterX = canvasWidth/2;
const canvasCenterY = canvasHeight/2;
const canvasCenter = new Vector2D(canvasCenterX, canvasCenterY);
let width = 800;
let height = 800;
let centeredOn = new Vector2D(0, 0);
let canvasColor = "#000000";

function clearScreen(){
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

function calculateScreenPosition(point){
    screenPos = point.position.add(canvasCenter).add(centeredOn);
    return screenPos;
}