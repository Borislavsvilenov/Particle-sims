class snek {
    constructor (pos, dir, color, thickness) {
        this.pos = pos;
        this.dir = dir;
        this.color = color;
        this.thickness = thickness;
        this.up = new Vector2D(0, -thickness);
        this.down = new Vector2D(0, thickness);
        this.right = new Vector2D(thickness, 0);
        this.left = new Vector2D(-thickness, 0);

        this.snekLength = [pos];
    }

    update () {
        for (let c = this.snekLength.length - 1; c = 0; c--) {
            let segL = this.snekLength[c];

                let segN = this.snekLength[c - 1];
        };
        if (this.dir == 1) {
            this.pos = this.pos.add(this.up);
        } else if (this.dit == 2) {
            this.pos = this.pos.add(this.right);
        } else if (this.dir == 3) {
            this.pos = this.pos.add(this.down);
        } else if (this.dir == 4) {
            this.pos = this.pos.add(this.left);
        };
    };
};