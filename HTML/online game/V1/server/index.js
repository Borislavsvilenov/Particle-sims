const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: {origin: "*"}
});

let particles = [];

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('get', (Particles) => {
        io.emit('return', Particles);
    });
});

http.listen(8000, () => console.log('open on port 8000'));