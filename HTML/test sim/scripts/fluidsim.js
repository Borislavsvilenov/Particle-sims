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

function bounds(point){
    if(point.position[0] < point.radius){
        point.position[0] = point.radius;
        point.velocity[0] = Math.abs(point.velocity[0] * bounciness);
    }
    if(point.position[1] < point.radius){
        point.position[1] = point.radius;
        point.velocity[1] = Math.abs(point.velocity[1] * bounciness);
    }
    if(point.position[0] > width - point.radius){
        point.position[0] = width - point.radius;
        point.velocity[0] = - Math.abs(point.velocity[0] * bounciness);
    }
    if(point.position[1] > height - point.radius){
        point.position[1] = height - point.radius;
        point.velocity[1] = - Math.abs(point.velocity[1] * bounciness);
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

