const socket = io(`http://${window.location.hostname}:8080`);
const FpsDisplay = document.getElementById("FPSdisplay");
const particleDisplay = document.getElementById("ParticleDisplay");

socket.on("update", particles => {
    clearScreen();
    screenBounds();

    for (let p = 0; p < particles.length; p++){
        drawParticle(particles[p]);
    };

    moveCam();

    particleDisplay.textContent = particles.length
});

socket.on("FPS", fps => {
    FpsDisplay.textContent = fps;
});