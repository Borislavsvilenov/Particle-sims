const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

let particles = [];
let paused = true;

io.on('connection', (socket) => {
    io.emit('updateList', particles);
    io.emit('pause', paused);

    socket.on('updateList', (newParticles) => {

        if (newParticles.length > particles.length) {
            particles = newParticles;
        }

        io.emit('updateList', particles);
    });

    socket.on('pause', (pause) => {
        paused = pause;
        io.emit('pause', paused);
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));

