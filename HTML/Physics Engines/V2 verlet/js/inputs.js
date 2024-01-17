const canvas = document.getElementById("simArea");
let camV = new Vector2D(0,0);
let mousePos;
let centeredOnIndx = -1;
let spawnParticles = true;

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

    if(pressed.key == "1"){
        if(centeredOnIndx == -1){
            centeredOnIndx = particles.length - 1;
        }
        else {
            centeredOnIndx--;
        }
    }
    else if(pressed.key == "2"){
        if(centeredOnIndx == particles.length - 1){
            centeredOnIndx = - 1;
        }
        else {
            centeredOnIndx++;
        }
    }
    else if(pressed.key == "3"){
        centeredOnIndx = -1;
    }

    if(pressed.key == "s"){
        if(spawnParticles){
            spawnParticles = false;
        }
        else {
            spawnParticles = true;
        }
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

