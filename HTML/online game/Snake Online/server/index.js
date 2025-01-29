const http = require('http').createServer();
const io = require('socket.io')(http, {cors: { origin: "*" }});

const vec2 = require("./Vector2D");
const {snek, Apple, snakes, apples} = require("./snek");

let players = [];
let maxApples = 10;

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
    snakes.push(new snek (new vec2(randomInt(0, 60) * 10 + 100, (randomInt(0, 60) * 10 + 100)),
              randomInt(1, 4),
              randomColor(),
              10));


    let idx = players.indexOf(socket);

    socket.on("dir", dir => {
        if (dir == 1 && snakes[idx].dir != 3) {
            snakes[idx].newDir = dir;
        } else if (dir == 2 && snakes[idx].dir != 4) {
            snakes[idx].newDir = dir;
        } else if (dir == 3 && snakes[idx].dir != 1) {
            snakes[idx].newDir = dir;
        } else if (dir == 4 && snakes[idx].dir != 2) {
            snakes[idx].newDir = dir;
        };
    });
    setInterval(() => {
        socket.emit("size", snakes[idx].snekLength.length);
    }, 1000/10);
});

setInterval(() => {
    if (apples.length < maxApples) {
        new Apple(new vec2(randomInt(0, 60) * 10 + 100, randomInt(0, 60) * 10 + 100), 10);
        // new Apple(new vec2(400, 400), 10);
    };
    for (let i = 0; i < snakes.length; i++) {
        if (snakes[i].state == "Live") {
            snakes[i].update()
            for (let sn = 0; sn < snakes.length; sn++) {
                for (let sp = 1; sp < snakes[sn].snekLength.length; sp++) {
                    if (snakes[i].pos.x == snakes[sn].snekLength[sp].x && snakes[i].pos.y == snakes[sn].snekLength[sp].y) {
                        snakes[i].kill();
                        // snakes[i] = new snek (new vec2(randomInt(0, 60) * 10 + 100, (randomInt(0, 60) * 10 + 100)),
                                              // randomInt(1, 4),
                                              // randomColor(),
                                              // 10);
                    };
                };
            };
            for (let a = 0; a < apples.length; a++) {
                if (snakes[i].pos.x == apples[a].pos.x && snakes[i].pos.y == apples[a].pos.y) {
                    snakes[i].eat();
                    apples.splice(a, 1);
                };
            };
        };
    };

    let msg = [snakes, apples];
    io.emit("update", msg);
}, 1000/10);

http.listen(8081, () => console.log('listening on http://localhost:8081'));
