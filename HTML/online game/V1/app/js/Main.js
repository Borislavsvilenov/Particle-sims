const particleCounter = document.getElementById("particleCount");

function Main(){
    clearScreen();
    particleCounter.textContent = particles.length;

    if(centeredOnIndx == -1){
        moveCam();
    } else {
        centerOn(particles[centeredOnIndx]);
    }

    if(!paused){
        if(spawnParticles){
            if(frameCounter % 1 === 0){
                new ParticleRound(new Vector2D(0, -50), new Vector2D(-3, -50), new Vector2D(0, 0), 10, 10, "#FFFFFF", "down");
                socket.emit('updateList', particles);
            }
        }
    }

    for(let particle = 0; particle < particles.length; particle++){
        particles[particle].drawParticle();
        
        if(!paused){
            particles[particle].bounds();
            particles[particle].callCollision(particle);
            particles[particle].update();
        }
    }

    screenBounds();

    frameCounter++

    requestAnimationFrame(Main);
}

Main();