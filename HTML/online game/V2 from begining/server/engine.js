const vec2 = require('./Vector2D');
let particles = [];


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

        //go through all particles and check for collision
        for (let p2idx = 0; p2idx < particles.length; p2idx++) {
            //if the particle we have and the particle that the loop is on are the same we skip
            if (this != p2) {
                let p2 = particles[p2idx];
                let d = this.sub(p2).mag();
                if (this.gravType == "OTO" && p2.gravType == "OTO") {

                };
                if (d <= this.radius + p2.radius) {
                    collide(p2, d);
                };
            };
        };
    };
};

module.exports = {Particle, 
                  particles
}