import pygame as pg
import numpy as np

pg.init()
running = True
screen = pg.display.set_mode((800, 800))
font = pg.font.Font(None, 36)
clock =  pg.time.Clock()
t = clock.tick(60) / 100

Particles = np.array([], dtype=object)

class Particle:
    Particle_count = 0
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
        Particle.Particle_count += 1

    def draw_particle(self):
        pg.draw.circle(screen, self.color, (int(self.position[0]), int(self.position[1])), self.radius)

    def update_veloctity_and_position(self):
        global t
        self.position += self.velocity * t
        self.velocity += self.acceleration * t
        self.acceleration = self.force / self.mass

def display_fps_and_particle_count(font, clock, count):
    fps = clock.get_fps()
    fps_text = font.render(f"FPS: {int(fps)}", True, pg.Color("orange"))
    count_text = font.render("Particles: " + str(count), True, pg.Color("orange"))
    screen.blit(fps_text, (10, 10))
    screen.blit(count_text, (10, 40))

def Main():
    global running
    screen.fill("black")

    for event in pg.event.get():
        if event.type == pg.QUIT:
            running = False

    for particle in Particles:
        Particle.draw_particle(particle)
        Particle.update_veloctity_and_position(particle)

    display_fps_and_particle_count(font, clock, Particle.Particle_count)

    t = clock.tick(60) / 100

    pg.display.flip()

    return running

