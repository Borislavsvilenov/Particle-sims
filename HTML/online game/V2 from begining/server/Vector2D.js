class Vector2D{
    constructor(x, y){
        this.x = x;
        this.y = y;
    };
    add (secondVec) { //adds 2 vectors
        return new Vector2D(this.x + secondVec.x, this.y + secondVec.y);
    };
    sub (secondVec) { //subtracts 2 vectors
        return new Vector2D(this.x - secondVec.x, this.y - secondVec.y);
    };
    scale (scaler) { //scales a vector by a number
        return new Vector2D(this.x * scaler, this.y * scaler);
    };
    dot (secondVec) { //dot product od 2 vectors
        return (this.x * secondVec.x) + (this.y * secondVec.y);
    };
    mag () { //magnitude of vector
        return Math.hypot(this.x, this.y);
    };
    norm () { //normalizes vector
        return this.scale(1 / this.mag());
    };
};

module.exports = Vector2D;