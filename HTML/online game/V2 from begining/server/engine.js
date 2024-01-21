const vec2 = require('./Vector2D');
let particles = [];
let width = 1000;
let height = 1000;

//Particle class
class Particle {
    constructor (position, positionLast, force, mass, radius, color, gravType) {
        //defines basic variables
        this.position = position; //uses a vec2
        this.positionLast = positionLast; //uses a vec2
        this.force = force; //uses a vec2

        this.mass = mass; //uses an integer
        this.radius = radius; //uses an integer

        this.color = color; //uses a hex color of the type "#FFFFFF"
        this.gravType = gravType; //uses a string "down" or "OTO"

        this.velocity = new vec2(0, 0); //blank value so that it is defined
        this.acceleration = new vec2(0, 0); //blank value so that it is defined

        particles.push(this);

        return this;
    };

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
    };

    update () {
        //uses verlet integration
        this.velocity = this.position.sub(this.positionLast); //callculate velocity
        this.acceleration = this.force.scale(1 / this.mass); //callculate acceleration based on total force

        this.positionLast = this.position; //update last position

        this.position = this.velocity.add(this.acceleration.scale(dt * dt)); //callculate new position using verlet integarion

        this.force = new vec2(0, 0)

        return;
    };

    collide(p2, d){
        //callculate over lap so the particles don't clip
        let overlap = (this.radius + p2.radius - d)/2;
        let collisionNorm = this.position.sub(p2.position).norm();

        //move the particles out of one another
        this.position = this.position.add(collisionNorm.scale(overlap));
        p2.position = p2.position.sub(collisionNorm.scale(overlap));

        return;
    }

    checkCollision () {
        //adds down gravity for object that fall down
        if (this.gravType == "down") {
            this.force.y += 10
        };

        for (let step = 0; step < substeps; step++) {
            //go through all particles and check for collision
            for (let p2idx = 0; p2idx < particles.length; p2idx++) {
                let p2 = particles[p2idx];
                //if the particle we have and the particle that the loop is on are the same we skip
                if (this != p2) {
                    let d = this.sub(p2).mag();
                    //callculate the attractive force between objects
                    if (step == 0) {
                        if(this.gravity == "OTO" && p2.gravity == "OTO"){ 
                            let posNorm = this.position.sub(p2.position).norm();
                            this.force = this.force.sub(posNorm.scale(grav * this.mass * p2.mass / d));
                            p2.force = p2.force.add(posNorm.scale(grav * this.mass * p2.mass / d));
                        };
                    };

                    if (d <= this.radius + p2.radius) {
                        collide(p2, d);
                    };
                };
            };
        };
    };
};

module.exports = {Particle, particles}