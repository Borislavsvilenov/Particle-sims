const canvas = document.getElementById("simArea");
let camV = new Vector2D(0,0);
let mousePos;
let mousePosLast = new Vector2D(0, 0);
let centeredOnIndx = -1;
let spawnParticles = false;

document.onkeydown = function(pressed){
    if(pressed.key == "ArrowRight"){
        camV.x = 10;
    } else if(pressed.key == "ArrowLeft"){
        camV.x = -10;
    }
    if(pressed.key == "ArrowUp"){
        camV.y = -10;
    } else if(pressed.key == "ArrowDown"){
        camV.y = 10;
    }

    if(pressed.key == "1"){
        if(centeredOnIndx == -1){
            centeredOnIndx = particles.length - 1;
        } else {
            centeredOnIndx--;
        }
    } else if(pressed.key == "2"){
        if(centeredOnIndx == particles.length - 1){
            centeredOnIndx = - 1;
        } else {
            centeredOnIndx++;
        }
    } else if(pressed.key == "3"){
        centeredOnIndx = -1;
    } else if(pressed.key == "4"){
        centeredOnIndx = -1;
        centeredOn = new Vector2D(0, 0);
    }

    if(pressed.key == "s"){
        if(spawnParticles){
            spawnParticles = false;
        } else {
            spawnParticles = true;
        }
    }
}
document.onkeyup = function(pressed){
    if(pressed.key == "ArrowRight"){
        camV.x = 0;
    } else if(pressed.key == "ArrowLeft"){
        camV.x = 0;
    }
    if(pressed.key == "ArrowUp"){
        camV.y = 0;
    } else if(pressed.key == "ArrowDown"){
        camV.y = 0;
    }
}

canvas.addEventListener("mousemove", (pos) => {
    mousePos = new Vector2D(pos.clientX, pos.clientY);
});

canvas.addEventListener("mousedown", (pressed) => {
    mousePosLast = mousePos;
});

canvas.addEventListener("mouseup", (pressed) => {
    let mouseNorm = mousePos.sub(mousePosLast).scale(1/50);
    mousePosLast = mousePos.sub(mouseNorm);

    new ParticleRound(calculatePointPosition(mousePos), calculatePointPosition(mousePosLast), new Vector2D(0, 0), 10, 10, "#FFFFFF", "OTO");

});

