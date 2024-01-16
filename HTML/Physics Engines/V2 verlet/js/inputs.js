const canvas = document.getElementById("simArea");
let camV = new Vector2D(0,0);
let mousePos;

document.onkeydown = function(pressed){
    if(pressed.key == "ArrowRight"){
        camV.x = 10;
    }
    else if(pressed.key == "ArrowLeft"){
        camV.x = -10;
    }
    if(pressed.key == "ArrowUp"){
        camV.y = -10;
    }
    else if(pressed.key == "ArrowDown"){
        camV.y = 10;
    }
}
document.onkeyup = function(pressed){
    if(pressed.key == "ArrowRight"){
        camV.x = 0;
    }
    else if(pressed.key == "ArrowLeft"){
        camV.x = 0;
    }
    if(pressed.key == "ArrowUp"){
        camV.y = 0;
    }
    else if(pressed.key == "ArrowDown"){
        camV.y = 0;
    }
}

canvas.addEventListener("mousemove", (pos) => {
    mousePos = new Vector2D(pos.clientX, pos.clientY);
});

canvas.addEventListener("click", (pressed) => {
    if(pressed.button == 0){
        new ParticleRound(calculatePointPosition(mousePos), calculatePointPosition(mousePos), new Vector2D(0,0), 10, 10, "#FFFFFF", "down");
    }
});

