//imports network modules
const http = require('http').createServer();

const io = require('socket.io')(http, {cors: { origin: "*" }});

const {Particle, particles} = require("./engine"); //Main physics engine
const vec2 = require("./Vector2D"); //vector funcs

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

io.on('connection', (socket) => {

    let points = {};
    io.emit("update", )

    socket.on('spwnParticle', spwnParticle => {
        new Particle(new vec2(spwnParticle.position.x, spwnParticle.position.y), 
                     new vec2(spwnParticle.positionLast.x, spwnParticle.positionLast.y), 
                     new vec2(spwnParticle.force.x, spwnParticle.force.y), 
                     spwnParticle.mass, spwnParticle.radius, spwnParticle.color, spwnParticle.gravType);
    });
});

setInterval(() => {
    io.emit("update", particles);
    for (let p = 0; p < particles.length; p++) {
        particles[p].bounds();
        particles[p].checkCollision()
        particles[p].update();
    };
    calculateFPS();
}, 1000 / 60);

http.listen(8080, () => console.log('listening on http://localhost:8080'));

