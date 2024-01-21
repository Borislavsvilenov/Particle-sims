// imports network modules
const http = require('http').createServer();
const io = require('socket.io')(http, {cors: { origin: "*" }});
// import other modules
const {Particle, particles} = require("./engine"); // Main physics engine
const vec2 = require("./Vector2D"); // vector funcs

let lastFrameTime = Date.now();
let frameCount = 0;

function calculateFPS() {
    const currentTime = Date.now();
    const elapsedMilliseconds = currentTime - lastFrameTime;

    // Calculate FPS every second
    if (elapsedMilliseconds >= 1000) {
        const fps = Math.round((frameCount / elapsedMilliseconds) * 1000);
        io.emit("FPS", fps);

        // Reset counters for the next second
        lastFrameTime = currentTime;
        frameCount = 0;
    };

    // Increment frame count for each frame
    frameCount++;
}; 

function mkdictionary (list) {
    let dictionary = [];
    for (let i = 0; i < list.length; i++){
        dictionary[i] = {position: list[i].position, color: list[i].color, radius: list[i].radius};
    };
    return dictionary;
};

io.on('connection', (socket) => {

    io.emit("update", mkdictionary(particles));

    socket.on('spwnParticle', spwnParticle => {
        // make a new particle every time this event is called
        new Particle(new vec2(spwnParticle.position.x, spwnParticle.position.y), 
                     new vec2(spwnParticle.positionLast.x, spwnParticle.positionLast.y), 
                     new vec2(spwnParticle.force.x, spwnParticle.force.y), 
                     spwnParticle.mass, spwnParticle.radius, spwnParticle.color, spwnParticle.gravType);
    });
});

setInterval(() => {
    // main loop for updating particle position and for chcking collisions
    io.emit("update", mkdictionary(particles));
    for (let p = 0; p < particles.length; p++) {
        particles[p].bounds();
        particles[p].checkCollision()
        particles[p].update();
    };
    calculateFPS();
}, 1000 / 60);

http.listen(8080, () => console.log('listening on http://localhost:8080'));

