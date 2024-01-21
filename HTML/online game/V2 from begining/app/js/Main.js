const socket = io(`http://${window.location.hostname}:8080`);

socket.on("update", particles => {
    clearScreen();

    for (let p = 0; p < particles.length; p++){
        drawParticle(particles[p]);
    };

    screenBounds();
});