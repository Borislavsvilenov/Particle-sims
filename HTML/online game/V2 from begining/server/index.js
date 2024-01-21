//imports network modules
const http = require('http').createServer();

const io = require('socket.io')(http, {cors: { origin: "*" }});

const {Particle, particles} = require("./engine"); //Main physics engine
const vec2 = require("./Vector2D"); //vector funcs

io.on('connection', (socket) => {

    io.emit("update", particles)

    socket.on('spwnParticle', spwnParticle => {
        new Particle(new vec2(spwnParticle.position.x, spwnParticle.position.y), 
                     new vec2(spwnParticle.positionLast.x, spwnParticle.positionLast.y), 
                     new vec2(spwnParticle.force.x, spwnParticle.force.y), 
                     spwnParticle.mass, spwnParticle.radius, spwnParticle.color, spwnParticle.gravType);
        console.log(particles);
    });
});
setInterval(() => {
    io.emit("update", particles)
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));

