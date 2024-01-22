class Vector2D{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(secondVec){
        return new Vector2D(this.x + secondVec.x, this.y + secondVec.y);
    }
    sub(secondVec){
        return new Vector2D(this.x - secondVec.x, this.y - secondVec.y);
    }
    scale(scaler){
        return new Vector2D(this.x * scaler, this.y * scaler);
    }
    dot(secondVec){
        return (this.x * secondVec.x) + (this.y * secondVec.y);
    }
    mag(){
        return Math.hypot(this.x, this.y);
    }
    norm(){
        return this.scale(1 / this.mag());
    }
}