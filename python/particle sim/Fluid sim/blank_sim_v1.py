import pygame as pg 
import math
import numpy as np

#initialize the screen
screen = pg.display.set_mode((750, 750))
clock =  pg.time.Clock()
Cx, Cy = screen.get_width() / 2, screen.get_height() / 2
t = clock.tick(60) / 100
run = True
pg.init()

Particles = []
Distances = np.array(0)
elasticity_factor = 0.92

class Particle:
    amountOfParticles = 0
    global t

    def __init__(self, Position, Mass, Color, Velocity):    #initiate new particle
        
        self.position = Position
        self.mass = Mass
        self.velocity = Velocity
        self.color = Color
        self.id = Particle.amountOfParticles
        self.acceleration = pg.Vector2(0, 0)

        Particle.amountOfParticles += 1

    def updatePosition(self):    #Update Position
        self.position += self.velocity * t

    def updateVelocity(self):   #Update Velocity
        self.velocity += self.acceleration * t

    def drawParticle(self):    #Draw Particle
        pg.draw.circle(screen, self.color, self.position, self.mass)

def handle_collision(point_a, point_b, distance_ab):
    global elasticity_factor
    overlap = (point_a.mass + point_b.mass - distance_ab) / 2.0  # Calculate overlap

    # Calculate normalized collision normal
    collision_normal = (point_b.position - point_a.position).normalize()

    # Separate particles to avoid overlap
    point_a.position -= overlap * collision_normal
    point_b.position += overlap * collision_normal

    # Calculate relative velocity along the normal vector
    relative_velocity_normal = (point_b.velocity - point_a.velocity).dot(collision_normal)

    # Update velocities based on conservation of linear momentum and kinetic energy
    total_mass = point_a.mass + point_b.mass

    velocity_a_after = point_a.velocity + 2 * (point_b.mass / total_mass) * relative_velocity_normal * collision_normal
    velocity_b_after = point_b.velocity - 2 * (point_a.mass / total_mass) * relative_velocity_normal * collision_normal

    # Apply new velocities with bounciness
    point_a.velocity = elasticity_factor * velocity_a_after
    point_b.velocity = elasticity_factor * velocity_b_after


def distances():
    global Distances
    Distances = np.zeros((Particle.amountOfParticles, Particle.amountOfParticles))

    for i in range(0, len(Particles) - 1):
        for j in range(i + 1, len(Particles)):
            PointA = Particles[i]
            PointB = Particles[j]
            DistanceX = PointA.position.x - PointB.position.x
            DistanceY = PointA.position.y - PointB.position.y
            DistanceAB = math.sqrt((DistanceX ** 2) + (DistanceY ** 2))

            # Update distance matrix
            Distances[i, j] = DistanceAB
            Distances[j, i] = DistanceAB

            if DistanceAB <= 0:  # Check for overlapping
                handle_collision(PointA, PointB, DistanceAB)
            elif DistanceAB <= PointA.mass + PointB.mass:
                handle_collision(PointA, PointB, DistanceAB)


def display_fps(font, clock, count):
    fps = clock.get_fps()
    fps_text = font.render(f"FPS: {int(fps)}", True, pg.Color("orange"))
    count_text = font.render("Particles: " + str(count), True, pg.Color("orange"))
    screen.blit(fps_text, (10, 10))
    screen.blit(count_text, (10, 40))


font = pg.font.Font(None, 36)


def newParticle(position, mass, color, velocity):    #Called externaly to make a new particle
    Particles.append(Particle(position, mass, color, velocity))


def Run():     #Called externaly to update the screen and particles
    for event in pg.event.get():
        if event.type == pg.QUIT:
            global run
            run = False

    screen.fill("black")

    for i in range(0, Particle.amountOfParticles):
        Particle.updateVelocity(Particles[i])
        Particle.updatePosition(Particles[i])
        Particle.drawParticle(Particles[i])

    distances()
    display_fps(font, clock, Particle.amountOfParticles)

    clock.tick(60)

    pg.display.flip()

    return run






    


    
