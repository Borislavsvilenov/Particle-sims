const canvas = document.getElementById("Workspace");
const ctx = canvas.getContext("2d");
const dt = 0.1;

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

class Particle{
    constructor(position, velocity, radius, color){
        this.position = position;
        this.velocity = velocity;

        this.radius = radius;
        this.color = color;
    }
    draw_particle(){
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], this.radius, 0.2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    update_motion(){
        this.position[0] += this.velocity[0] * dt;
        this.position[1] += this.velocity[1] * dt;
    }
}

let point1 = new Particle([50, 50], [10, 0], 10, '#FFFFFF');
point1.draw_particle();

for(i=1; i<100; i++){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    point1.draw_particle();
    point1.update_motion();
    delay(10000);
}