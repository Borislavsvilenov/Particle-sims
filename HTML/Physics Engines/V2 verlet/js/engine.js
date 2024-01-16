let dt = 0.1;
let particles = [];
let totParticles = 0;
let substeps = 8;
let bounciness = 0.9;
let frameCounter = 0;
let minVelocity = 0.001;
let spawnParticles = true;

class ParticleRound{
    constructor(position, positionLast, force, mass, radius, color, gravity){
        this.shape = "round";

        this.position = position;
        this.positionLast = positionLast;
        this.velocity;
        this.acceleration;
        this.force = force;
        this.mass = mass;

        this.radius = radius;
        this.color = color;
        this.gravity = gravity;

        this.experienceGravity = true;

        particles.push(this);
        totParticles++

        return this;
    }

    update(){
        this.velocity = this.position.sub(this.positionLast);
        this.acceleration = this.force.scale(1/this.mass);
        this.positionLast = this.position;
        this.position = this.position.add(this.velocity).add(this.acceleration.scale(dt * dt));

        if(this.experienceGravity == true){
            if(this.gravity == "down"){
                this.force.y = 10;
            }
        }

        return;
    }

    bounds(){
        if(this.position.x >= (width/2) - this.radius){
            this.position.x = width/2 - this.radius;
        }
        if(this.position.x <= this.radius - (width/2)){
            this.position.x = - width/2 + this.radius;
        }
        if(this.position.y >= (height/2) - this.radius){
            this.position.y = height/2 - this.radius;
        }
        if(this.position.y <= this.radius - (height/2)){
            this.position.y = - height/2 + this.radius;
        }

        return;
    }

    collideRound(p2, d){
        let overlap = (this.radius + p2.radius - d)/2;
        let collisionNorm = this.position.sub(p2.position).norm();

        this.position = this.position.add(collisionNorm.scale(overlap));
        p2.position = p2.position.sub(collisionNorm.scale(overlap));

        return;
    }

    callCollision(p1idx){
        for(let step = 0; step < substeps; step++){
            for(let p2idx = p1idx; p2idx < particles.length; p2idx++){
                let p2 = particles[p2idx];
                if(this != p2){
                    if(p2.shape == "round"){
                        let d = this.distanceTo(p2);
                        if(d <= this.radius + p2.radius){
                            this.collideRound(p2, d);
                        }
                    }
                }
            }
        }
    }

    distanceTo(p2){
        let dx = this.position.x - p2.position.x;
        let dy = this.position.y - p2.position.y;
        let d = Math.sqrt((dx**2) + (dy**2));
    
        return d;
    }

    drawParticle(){
        let position = calculateScreenPosition(this.position);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(position.x, position.y, this.radius, 2 * Math.PI, false);
        ctx.fill();

        return;
    }
}

class ParticleRect{
    constructor(position, velocity, force, mass, size, color, gravity){
        this.shape = "rect";

        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector2D(0,0);
        this.force = force;
        this.mass = mass;

        this.size = size;
        this.color = color;
        this.gravity = gravity;

        this.experienceGravity = true;

        particles.push(this);
        totParticles++

        return this;
    }

    update(){
        this.position = this.position.add(this.velocity.scale(dt));
        this.velocity = this.velocity.add(this.acceleration.scale(dt));
        this.acceleration = this.force.scale(1/this.mass);
        if(Math.abs(this.velocity.x) <= minVelocity && Math.abs(this.velocity.y) <= minVelocity){
            this.velocity.x = 0;
            this.velocity.y = 0;
        }

        return;
    }

    bounds(){
        if(this.position.x >= width/2 - this.size){
            this.velocity.x = - Math.abs(this.velocity.x) * bounciness;
            this.position.x = width/2 - this.size;
        }
        if(this.position.x <= - width/2){
            this.velocity.x = Math.abs(this.velocity.x) * bounciness;
            this.position.x = - width/2 + this.size;
        }
        if(this.position.y >= height/2 - this.size){
            this.velocity.y = - Math.abs(this.velocity.y) * bounciness;
            this.position.y = height/2 - this.size;
        }
        if(this.position.y <= - height/2){
            this.velocity.y = Math.abs(this.velocity.y) * bounciness;
            this.position.y = - height/2 + this.size;
        }

        return;
    }

    distanceTo(p2){
        let dx = this.position.x - p2.position.x;
        let dy = this.position.y - p2.position.y;
        let d = Math.sqrt((dx**2) + (dy**2));
    
        return d;
    }

    drawParticle(){
        let position = calculateScreenPosition(this.position);
        ctx.fillStyle = this.color;
        ctx.fillRect(position.x, position.y, this.size, this.size);

        return;
    }
}