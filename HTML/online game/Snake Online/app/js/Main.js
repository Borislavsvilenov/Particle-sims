const socket = io(`http://${window.location.hostname}:8080`);

socket.on("update", msg => {
    let sneks = msg[0];
    let apples = msg[1]

    clearScreen();

    for (let a = 0; a < apples.length; a++) {
        drawApples(apples[a]);
    };
    
    for (let s = 0; s < sneks.length; s++) {
        drawSnek(sneks[s]);
    };
});
