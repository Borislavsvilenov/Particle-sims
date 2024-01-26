const socket = io(`http://${window.location.hostname}:8080`);

socket.on("update", (sneks, apples) => {
    clearScreen();
    for (let s = 0; s < sneks.length; s++) {
        drawSnek(sneks[s]);
    }
    for (let a = 0; a < apples.length; a++) {
        drawApples(apples[a]);
    };
});
