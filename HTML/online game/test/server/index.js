const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('message', (message) => {
        console.log(message);
        io.emit('message', message);
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));

