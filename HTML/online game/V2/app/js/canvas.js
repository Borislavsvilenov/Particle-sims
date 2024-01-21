const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const canvasCenterX = canvasWidth/2;
const canvasCenterY = canvasHeight/2;
const canvasCenter = new Vector2D(canvasCenterX, canvasCenterY);
let centeredOn = new Vector2D(0, 0);
let canvasColor = "#000000";


function clearScreen(){
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

function calculateScreenPosition(pos){
    pos = new Vector2D(pos.x ,pos.y);
    let screenPos = pos.add(canvasCenter).sub(centeredOn);
    return screenPos;
};

function calculatePointPosition(pos){
    let PointPos = pos.sub(canvasCenter).add(centeredOn);
    return PointPos;
};

function screenBounds(){
    let origin1 = calculateScreenPosition(new Vector2D(- width/2, - height/2));
    let origin2 = calculateScreenPosition(new Vector2D(width/2, height/2));
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(origin1.x, origin1.y, width, -10);
    ctx.fillRect(origin1.x, origin1.y, -10, height);
    ctx.fillRect(origin2.x, origin2.y, -width, 10);
    ctx.fillRect(origin2.x, origin2.y, 10, -height);
};

function centerOn(point){
    centeredOn = point.position;
};

function moveCam(){
    centeredOn = centeredOn.add(camV);
};

function drawParticle (point) {
    let position = calculateScreenPosition(point.position);
    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(position.x, position.y, point.radius, 2 * Math.PI, false);
    ctx.fill();

    return;
};