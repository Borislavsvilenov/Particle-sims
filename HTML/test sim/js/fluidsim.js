const canvas = document.getElementById("Workspace");
const ctx = canvas.getContext("2d");
const dt = 0.1;
const width = canvas.width;
const height = canvas.height;
let particles = [];
let bounciness = 0.9;

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
        return new Vector2D(this.x * secondVec.x) + (this.y * secondVec.y);
    }
    mag(){
        return Math.hypot(this.x, this.y);
    }
    norm(){
        return new Vector2D(this.scale(1 / this.mag()));
    }
}

class Particle{
    constructor(position, velocity, acceleration, radius, mass, color){
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;

        this.radius = radius;
        this.mass = mass;
        this.color = color;

        particles.push(this);
    }
    draw_particle(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
        ctx.fill();
    }
    update_motion(){
        this.position = this.position.add(this.velocity.scale(dt))
        this.velocity = this.velocity.add(this.acceleration.scale(dt))
    }
}

function bounds(thing){
    if(thing.position.x < thing.radius){
        thing.position.x = thing.radius;
        thing.velocity.x = Math.abs(thing.velocity.x * bounciness);
    }
    if(thing.position.y < thing.radius){
        thing.position.y = thing.radius;
        thing.velocity.y = Math.abs(thing.velocity.y * bounciness);
    }
    if(thing.position.x > width - thing.radius){
        thing.position.x = width - thing.radius;
        thing.velocity.x = - Math.abs(thing.velocity.x * bounciness);
    }
    if(thing.position.y > height - thing.radius){
        thing.position.y = height - thing.radius;
        thing.velocity.y = - Math.abs(thing.velocity.y * bounciness);
    }
}

function distance(point1, point2){
    return Math.hypot((point1.position.x - point2.position.x), (point1.position.y - point2.position.y));
}

function collide(A, B, d){
    let overlap = (A.radius + B.radius - d) / 2;
    let collision_norm = A.position.sub(B.position).norm();
    let velocity_norm = A.velocity.sub(B.velocity).dot(collision_norm);
    let mass = A.mass + B.mass;

    A.position = A.position.add(collision_norm * overlap);
    B.position = B.position.sub(collision_norm * overlap);

    A.velocity = A.velocity.sub(2 * (B.mass / mass) * velocity_norm * collision_norm * bounciness);
    B.velocity = B.velocity.add(2 * (A.mass / mass) * velocity_norm * collision_norm * bounciness);
}

function call_collision_check(){
    for(let p1 = 0; p1 < particles.length; p1++){
        for(let p2 = p1 + 1; p2 < particles.length; p2++){
            let pointA = particles[p1];
            let pointB = particles[p2];
            let d = distance(pointA, pointB);
            if(d < pointA.radius + pointB.radius){
                collide(pointA, pointB, d);
            }
        }
    }
}   

function Main(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(particles.length > 0){
        for(let point = 0; point < particles.length; point++){
            particles[point].draw_particle();
            particles[point].update_motion();
            bounds(particles[point]);
    }}
    call_collision_check()

    requestAnimationFrame(Main);

}

new Particle(new Vector2D(100, 100),
             new Vector2D(0, 0),
             new Vector2D(0, 1),
             10, 10, '#FFFFFF');

new Particle(new Vector2D(200, 200),
             new Vector2D(0, 0),
             new Vector2D(0, 1),
             10, 10, '#FFFFFF');

new Particle(new Vector2D(300, 300),
             new Vector2D(10, 0),
             new Vector2D(0, 1),
             10, 10, '#FFFFFF');

Main();

