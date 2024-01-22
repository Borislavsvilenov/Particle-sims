const http = require('http').createServer();
const io = require('socket.io')(http, {cors: { origin: "*" }});

io.on("connection", (Socket) => {

});

http.listen(8080, () => console.log('listening on http://localhost:8080'));
