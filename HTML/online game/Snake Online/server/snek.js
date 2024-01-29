let snakes = [];
let apples = [];

const vec2 = require("./Vector2D");

class snek {
    constructor (pos, dir, color, thickness) {
        this.pos = pos;
        this.dir = dir;
        this.color = color;
        this.thickness = thickness;
        this.up = new vec2(0, -thickness);
        this.down = new vec2(0, thickness);
        this.right = new vec2(thickness, 0);
        this.left = new vec2(-thickness, 0);
        this.newDir = dir;

        this.snekLength = [pos];
        this.state = "Live";

        snakes.push(this);
    };

    update () {
        this.dir = this.newDir;
        for (let c = this.snekLength.length - 1; c > 0; c--) {
            this.snekLength[c] = this.snekLength[c - 1];
        };
        if (this.dir == 1) {
            this.pos = this.pos.add(this.up);
        } else if (this.dir == 2) {
            this.pos = this.pos.add(this.right);
        } else if (this.dir == 3) {
            this.pos = this.pos.add(this.down);
        } else if (this.dir == 4) {
            this.pos = this.pos.add(this.left);
        };
        this.snekLength[0] = this.pos;
    };

    eat () {
        this.snekLength.push(this.pos);
    };

    kill () {
        this.state = "Ded";

    };

};

class Apple {
    constructor (pos, thickness) {
        this.pos = pos;
        this.thickness = thickness;

        apples.push(this);
    };
};

module.exports = {snek, Apple, snakes, apples};