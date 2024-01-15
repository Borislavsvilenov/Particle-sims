function Main(){
    clearScreen();
    screenBounds();
    for(let particle = 0; particle < particles.length; particle++){
        particles[particle].drawParticle();
        particles[particle].callCollision(particle);
        particles[particle].bounds();
        particles[particle].update();
        particles[particle].experienceGravity = true;
    }
    if(frameCounter % 10 === 0){
        new ParticleRound(new Vector2D(0, -50), new Vector2D(10, 0), new Vector2D(0, 10), 10, 10, "#FFFFFF", "down");
    }

    frameCounter++

    requestAnimationFrame(Main);
}

Main();