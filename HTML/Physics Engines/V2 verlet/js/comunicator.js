const socket = io(`http://${window.location.hostname}:8080`);

socket.on('updateList', recieve => {

    particles = [];

    for(let point = 0; point < recieve.length; point++) {
        p = recieve[point];

        particles[point] = new ParticleRound( new Vector2D(p.position.x, p.position.y), 
                           new Vector2D(p.positionLast.x, p.positionLast.y), 
                           new Vector2D(p.force.x, p.force.y), 
                           p.mass,
                           p.radius, 
                           p.color, 
                           p.gravity);
    }

});

socket.on('pause', pause => {
    paused = pause;
});