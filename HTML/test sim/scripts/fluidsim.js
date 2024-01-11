const canvas = document.getElementById("Workspace");
const ctx = canvas.getContext("2d");
const dt = 0.1;
const width = canvas.width;
const height = canvas.height;
let particles = [];
let bounciness = 0.9;

class Particle{
    constructor(position, velocity, acceleration, radius, color){
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;

        this.radius = radius;
        this.color = color;

        particles.push(this);
    }
    draw_particle(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], this.radius, 2 * Math.PI, false);
        ctx.fill();
    }
    update_motion(){
        this.position[0] += this.velocity[0] * dt;
        this.position[1] += this.velocity[1] * dt;
        this.velocity[0] += this.acceleration[0] * dt;
        this.velocity[1] += this.acceleration[1] * dt;

    }
}

function bounds(thing){
    if(thing.position[0] < thing.radius){
        thing.position[0] = thing.radius;
        thing.velocity[0] = Math.abs(thing.velocity[0] * bounciness);
    }
    if(thing.position[1] < thing.radius){
        thing.position[1] = thing.radius;
        thing.velocity[1] = Math.abs(thing.velocity[1] * bounciness);
    }
    if(thing.position[0] > width - thing.radius){
        thing.position[0] = width - thing.radius;
        thing.velocity[0] = - Math.abs(thing.velocity[0] * bounciness);
    }
    if(thing.position[1] > height - thing.radius){
        thing.position[1] = height - thing.radius;
        thing.velocity[1] = - Math.abs(thing.velocity[1] * bounciness);
    }
}

function distance(point1, point2){
    let d = Math.sqrt(((point1.position[0] - point2.position[0]) ** 2) + ((point1.position[1] - point2.position[1]) ** 2))
    return d
}

function call_collision_check(){
    for(p1 = 0; p1 < particles.length; p1++){
        for(p2 = p1 + 1; p2 < particles.length; p2++){
            pointA = particles[p1]
            pointB = particles[p2]
            let d = distance(pointA, pointB)
            if(d < pointA.radius + pointB.radius){
                collide(pointA, pointB, d)
            }
        }
    }
}   

function Main(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if(particles.length > 0){
        for(let point = 0; point < particles.length; point++){
            particles[point].draw_particle();
            particles[point].update_motion();
            bounds(particles[point])
    }}


    requestAnimationFrame(Main);

}

new Particle([100, 100], [0, 0], [0, 1], 10, '#FFFFFF');
new Particle([200, 200], [0, 0], [0, 1], 10, '#FFFFFF');

Main()

