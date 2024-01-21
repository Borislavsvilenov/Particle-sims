//imports network modules
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

const {Particle, particles} = require("./engine"); //Main physics engine
const vec2 = require("./Vector2D"); //vector funcs

io.on('connection', (socket) => {
    
    socket.on('spawnParticle', spwnParticle =>{

    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));

