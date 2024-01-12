let dt = 0.1;
let particles = [];


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

class ParticleRound{
    constructor(position, velocity, force, mass, radius, color){
        this.shape = "round";

        this.position = position;
        this.velocity = velocity;
        this.acceleration;
        this.force = force;
        this.mass = mass;

        this.radius = radius;
        this.color = color;

        return this;
    }

    update(){
        this.position = this.position.add(this.velocity.scale(dt));
        this.velocity = this.velocity.add(this.acceleration.scale(dt));
        this.acceleration = this.force.scale(1/this.mass);

        return;
    }

    collide(p2, d){
        let overlap = this.radius + p2.radius - d;
        let collisionNorm = this.position.sub(p2.position).norm();
        let velocityNorm = this.velocity.sub(p2.velocity).dot(collisionNorm);
        let mass = this.mass + p2.mass;

        this.position = this.position.add(collisionNorm.scale(overlap));
        p2.position = p2.position.sub(collisionNorm.scale(overlap));

        this.velocity = this.velocity.sub(collisionNorm.scale(velocityNorm * bounciness * p2.mass / mass));
        p2.velocity = p2.velocity.add(collisionNorm.scale(velocityNorm * bounciness * this.mass / mass));

        return;
    }

    draw_particle(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
        ctx.fill();

        return;
    }
}

function Main(){
    for(let particle = 0; particle < particles.length; particle++){
        particle.update();
    }
}
