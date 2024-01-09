import pygame as pg
import numpy as np

pg.init()
running = True
screen = pg.display.set_mode((800, 800))
font = pg.font.Font(None, 36)
Particles = np.array([], dtype=object)

class Particle:
    t = 0.02
    bounciness = 0.8
    grid_size = 20

    def __init__(self, position, velocity, acceleration, force, mass, radius, color):
        global Particles

        self.position = np.array(position, dtype=np.float32)
        self.velocity = np.array(velocity, dtype=np.float32)
        self.acceleration = np.array(acceleration, dtype=np.float32)
        self.force = np.array(force, dtype=np.float32)

        self.mass = mass
        self.radius = radius
        self.color = color

        Particles = np.append(Particles, self)

    def draw_particle(self):
        pg.draw.circle(screen, self.color, (int(self.position[0]), int(self.position[1])), self.radius)

def Main():
    global running
    screen.fill("black")

    for event in pg.event.get():
        if event.type == pg.QUIT:
            running = False

    for particle in Particles:
        Particle.draw_particle(particle)

    pg.display.flip()

    return running

