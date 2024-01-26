document.onkeydown = function(pressed){
    if(pressed.key == "ArrowRight"){
        socket.emit("dir", 2);
    } else if (pressed.key == "ArrowLeft") {
        socket.emit("dir", 4);
    } else if (pressed.key == "ArrowUp") {
        socket.emit("dir", 1);
    } else if (pressed.key == "ArrowDown") {
        socket.emit("dir", 3);
    };
};
