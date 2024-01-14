function Main(){
    clearScreen();
    screenBounds();
    for(let particle = 0; particle < particles.length; particle++){
        particles[particle].drawParticle();
        particles[particle].update();
        particles[particle].bounds();
    }
    

    requestAnimationFrame(Main);
}

new ParticleRound(new Vector2D(100, 100), new Vector2D(10,0), new Vector2D(0, 10), 10, 20, "#FFFFFF")
new ParticleRect(new Vector2D(-100, 100), new Vector2D(10,0), new Vector2D(0, 10), 10, 20, "#FFFFFF")

Main();