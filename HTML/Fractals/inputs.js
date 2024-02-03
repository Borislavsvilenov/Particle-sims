document.onkeydown = pressed => {
    if(pressed.key == "w") {
        zoom *= 10;
    } else if(pressed.key == "a") {
        zoom *= 1/10;
    }

    if(pressed.key == "ArrowRight"){
        posX -= 100/zoom;
    } else if (pressed.key == "ArrowLeft") {
        posX += 100/zoom;
    } else if (pressed.key == "ArrowUp") {
        posY += 100/zoom;
    } else if (pressed.key == "ArrowDown") {
        posY -= 100/zoom;
    };

    if(pressed.key == "g") {
        depth += 100;
    } else if(pressed.key == "h") {
        depth -= 100;
    }
};