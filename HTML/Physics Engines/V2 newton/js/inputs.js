let camV = new Vector2D(0,0);

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

