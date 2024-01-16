function Main(){
    clearScreen();

    for(let particle = 0; particle < particles.length; particle++){
        particles[particle].drawParticle();
        particles[particle].bounds();
        particles[particle].callCollision(particle);
        particles[particle].update();
        particles[particle].experienceGravity = true;
    }
    if(spawnParticles){
        if(frameCounter % 10 === 0){
            new ParticleRound(new Vector2D(0, -50), new Vector2D(10, 0), new Vector2D(0, 10), 10, 10, "#FFFFFF", "down");
        }
    }
    
    screenBounds();
    moveCam();

    frameCounter++

    requestAnimationFrame(Main);
}


Main();