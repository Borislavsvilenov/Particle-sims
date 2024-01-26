const http = require('http').createServer();
const io = require('socket.io')(http, {cors: { origin: "*" }});

const vec2 = require("./Vector2D");
const {snek, Apple, snakes, apples} = require("./snek");

let players = [];
let maxApples = 5;

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
};

function randomColor() {
    // Generate random values for RGB components
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    // Convert RGB values to hexadecimal
    let redHex = red.toString(16).padStart(2, '0');
    let greenHex = green.toString(16).padStart(2, '0');
    let blueHex = blue.toString(16).padStart(2, '0');

    // Concatenate the hexadecimal values
    let hexCode = '#' + redHex + greenHex + blueHex;

    return hexCode;
};

io.on("connection", (socket) => {
    console.log(socket + " connected");
    players.push(socket);
    new snek(new vec2(randomInt(100, 700), randomInt(100, 700)),
              randomInt(1, 4),
              randomColor(),
              5);

    socket.on("dir", dir => {
        let idx = players.indexOf(socket);
        snakes[idx].dir = dir;
    });
});

setInterval(() => {
    if (apples.length == 0) {
        for (let g = 0; g < maxApples; g++) {
            new Apple(new vec2(randomInt(100, 700), randomInt(100, 700)), 5);
        };
    };
    for (let i = 0; i < snakes.length; i++) {
        snakes[i].update()
        for (let a = 0; a < apples; a++) {
            if (snakes[i].pos == apples[a].pos) {
                snakes[i].eat();
                apples.splice(a, 1);
            };
        };
    };

    io.emit("update", (snakes, apples));
}, 1000/5);

http.listen(8080, () => console.log('listening on http://localhost:8080'));
