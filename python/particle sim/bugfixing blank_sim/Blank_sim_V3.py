import pygame as pg
import numpy as np

pg.init()
running = True
screen = pg.display.set_mode((800, 800))
font = pg.font.Font(None, 36)
clock =  pg.time.Clock()
t = clock.tick(60) / 100
substeps = 3

Particles = np.array([], dtype=object)

class Particle:
    Particle_count = 0
    bounciness = 0.9
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
        self.id = Particle.Particle_count

        Particles = np.append(Particles, self)
        Particle.Particle_count += 1

    def draw_particle(self):
        pg.draw.circle(screen, self.color, (int(self.position[0]), int(self.position[1])), self.radius)

    def update_veloctity_and_position(self):
        global t
        self.position += self.velocity * t
        self.velocity += self.acceleration * t
        self.acceleration = self.force / self.mass

def normalize(vector):
    vector_magnitude = np.sqrt((vector[0] ** 2) + (vector[1] ** 2))

    if vector_magnitude == 0:
        normal_vector = np.array((0, 0))
    else:
        normal_vector = vector / vector_magnitude
    
    return normal_vector

def distance(p1, p2):
    distance = np.sqrt(((p1.position[0] - p2.position[0]) ** 2) + ((p1.position[1] - p2.position[1]) ** 2))

    return distance

def handle_collision(p1, p2, distance):
    overlap = (p1.radius + p2.radius - distance) / 2
    collision_normal = normalize(p1.position - p2.position)
    velocity_normal = np.dot(p1.velocity - p2.velocity, collision_normal)
    total_mass = p1.mass + p2.mass

    p1.position += overlap * collision_normal
    p2.position -= overlap * collision_normal

    p1.velocity -= 2 * (p2.mass / total_mass) * velocity_normal * collision_normal * Particle.bounciness
    p2.velocity += 2 * (p1.mass / total_mass) * velocity_normal * collision_normal * Particle.bounciness

def call_collision_check():
    global Particles
    global substeps

    P_in_grid = grid(Particle.grid_size, Particles)
    for i in range(0, substeps):    
        for point1x in range(0, len(P_in_grid)):
            for point1y in range(0, len(P_in_grid[point1x])):
                for p1 in P_in_grid[point1x, point1y]:
                    if p1 is not None:
                        for point2x in range(point1x - 1, point1x + 1):
                            for point2y in range(point1y - 1, point1y + 1):
                                for p2 in P_in_grid[point2x, point2y]:
                                    if p1 != p2:
                                        d = distance(p1, p2)
                                        if d <= p1.radius + p2.radius:
                                            handle_collision(p1, p2, d)

def grid(grid_size, Particles):
    Particles_in_grid = np.empty((int(screen.get_width() / grid_size), int(screen.get_height() / grid_size)), dtype=object)
    Particles_in_grid.fill([])

    for self in Particles:
        x = int(self.position[0] / grid_size) - 1
        y = int(self.position[1] / grid_size) - 1
        Particles_in_grid[x, y] = np.append(Particles_in_grid[x, y], self)

    return Particles_in_grid

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

    call_collision_check()

    t = clock.tick(60) / 100

    pg.display.flip()

    return running

