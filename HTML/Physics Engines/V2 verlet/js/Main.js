function Main(){
    clearScreen();

    for(let particle = 0; particle < particles.length; particle++){
        particles[particle].force = new Vector2D(0,0)
        particles[particle].drawParticle();
        particles[particle].bounds();
        particles[particle].callCollision(particle);
        particles[particle].update();
    }
    if(spawnParticles){
        if(frameCounter % 1 === 0){
            new ParticleRound(new Vector2D(0, -50), new Vector2D(-3, -50), new Vector2D(0, 10), 10, 10, "#FFFFFF", "down");
        }
    }

    screenBounds();
    if(centeredOnIndx == -1){
        moveCam();
    } else {
        centerOn(particles[centeredOnIndx]);
    }

    frameCounter++

    requestAnimationFrame(Main);
}

Main();