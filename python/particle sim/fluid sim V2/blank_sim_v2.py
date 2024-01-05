import pygame as pg
import numpy as np


#initialize the screen
pg.init()
running = True
screen = pg.display.set_mode((800, 800))
clock =  pg.time.Clock()
center_x, center_y = screen.get_width() / 2, screen.get_height() / 2
bounciness = 0.8
font = pg.font.Font(None, 36)
grid_size = 20
t = 0


Particles = np.array([])
Particles_in_grid = np.empty((int(screen.get_width() / grid_size), int(screen.get_height() / grid_size), 1), dtype=object)

class Particle:
    global screen

    def __init__(self, position, velocity, acceleration, force, mass, radius, color):
        #Motion vars
        self.position = position
        self.velocity = velocity
        self.acceleration = acceleration
        self.Fnet = force

        #Other Stats
        self.mass = mass
        self.radius = radius
        self.color = color

        global Particles
        Particles = np.append(Particles, self)

    def update_motion_and_position(self): #update position velocity and acceleration
        self.position += self.velocity * t        
        self.velocity += self.acceleration * t
        self.acceleration += self.Fnet / self.mass

    def draw_particle(self): #Draw the point on the display
        pg.draw.circle(screen, self.color, (int(self.position[0]), int(self.position[1])), self.radius)

def normalize(vector):
    vector_magnitude = np.sqrt((vector[0] ** 2) + (vector[1] ** 2))

    if vector_magnitude == 0:
        normal_vector = np.array((0, 0))
    else:
        normal_vector = vector / vector_magnitude

    return normal_vector

def handle_collision(point_a, point_b, distance):
    #define some variables
    global bounciness
    overlap = (point_a.radius + point_b.radius - distance) / 2
    collision_normal = normalize(point_b.position - point_a.position)
    velocity_normal = (point_b.velocity + point_a.velocity).dot(collision_normal)
    total_mass = point_a.mass + point_b.mass

    #update position for no overlap
    point_a.position += overlap * collision_normal
    point_b.position -= overlap * collision_normal

    #update velocity for bounce off
    point_a.velocity = point_a.velocity + 2 * (point_b.mass / total_mass) * velocity_normal * collision_normal * bounciness
    point_b.velocity = point_b.velocity - 2 * (point_a.mass / total_mass) * velocity_normal * collision_normal * bounciness

def update_grid():
    global grid_size
    global Particles_in_grid
    global Particles
    Particles_in_grid = np.empty((int(screen.get_width() / grid_size), int(screen.get_height() / grid_size)), dtype=object)
    Particles_in_grid.fill([])

    for point in Particles:
        Index_x = int(point.position[0] / grid_size) - 1
        Index_y = int(point.position[1] / grid_size) - 1

        Particles_in_grid[Index_x, Index_y] = np.append(Particles_in_grid[Index_x, Index_y], point)

def call_collision_check():
    update_grid()
    
    for x in range(1, len(Particles_in_grid) - 1):

        for y in range(1, len(Particles_in_grid[x]) - 1):

            for point_a in Particles_in_grid[x][y]:
                if point_a is not None:

                    for point_b_x in range(x - 1, x + 1):

                        for point_b_y in range(y - 1, y + 1):

                            for point_b in Particles_in_grid[point_b_x][point_b_y]:
                                if point_b is not None:

                                    if point_a != point_b:
                                        dx = point_a.position[0] - point_b.position[0]
                                        dy = point_a.position[1] - point_b.position[1]
                                        distance = np.sqrt(abs((dx * dx) + (dy * dy)))                        
                                        if distance <= (point_a.radius + point_b.radius):
                                            handle_collision(point_a, point_b, distance)
          
def display_fps(font, clock):
    fps = clock.get_fps()
    fps_text = font.render(f"FPS: {int(fps)}", True, pg.Color("orange"))
    screen.blit(fps_text, (10, 10))

def Main():
    global running
    global t
    screen.fill("black")

    call_collision_check()
    display_fps(font, clock)

    for event in pg.event.get():
        if event.type == pg.QUIT:
            running = False

    for particle in Particles:
        Particle.update_motion_and_position(particle)
        Particle.draw_particle(particle)

    pg.display.flip()

    t = clock.tick(60) / 100
    return running



