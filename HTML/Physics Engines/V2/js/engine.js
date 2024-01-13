let dt = 0.1;
let particles = [];
let totParticles = 0;
let substeps = 6;
let bounciness = 0.9;
let frameCounter = 0;
let minVelocity = 0.001;
let spawnParticles = true;

class ParticleRound{
    constructor(position, velocity, force, mass, radius, color){
        this.shape = "round";

        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector2D(0,0);
        this.force = force;
        this.mass = mass;

        this.radius = radius;
        this.color = color;

        particles.push(this);
        totParticles++

        return this;
    }

    update(){
        this.position = this.position.add(this.velocity.scale(dt));
        this.velocity = this.velocity.add(this.acceleration.scale(dt));
        this.acceleration = this.force.scale(1/this.mass);
        if(this.velocity.x <= minVelocity && this.velocity.y <= minVelocity){
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        return;
    }



    draw_particle(){
        let position = calculateScreenPosition(this);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(position.x, position.y, this.radius, 2 * Math.PI, false);
        ctx.fill();

        return;
    }
}

class ParticleRect{
    constructor(position, velocity, force, mass, size, color){
        this.shape = "rect";

        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector2D(0,0);
        this.force = force;
        this.mass = mass;

        this.size = size;
        this.color = color;

        particles.push(this);
        totParticles++

        return this;
    }

    update(){
        this.position = this.position.add(this.velocity.scale(dt));
        this.velocity = this.velocity.add(this.acceleration.scale(dt));
        this.acceleration = this.force.scale(1/this.mass);
        if(this.velocity.x <= minVelocity && this.velocity.y <= minVelocity){
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        return;
    }

    draw_particle(){
        let position = calculateScreenPosition(this);
        ctx.fillStyle = this.color;
        ctx.fillRect(position.x, position.y, this.size, this.size);

        return;
    }

}