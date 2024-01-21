const canvas = document.getElementById("simArea");
const ctx = canvas.getContext('2d');


function clearScreen(){
    ctx.fillStyle = canvasColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

function calculateScreenPosition(pos){
    let screenPos = pos.add(canvasCenter).sub(centeredOn);
    return screenPos;
};

function drawParticle (point) {
    let position = calculateScreenPosition(point.position);
    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(position.x, position.y, point.radius, 2 * Math.PI, false);
    ctx.fill();

    return;
};