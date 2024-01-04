import pygame
import sys

# Constants
WIDTH, HEIGHT = 750, 750
FPS_FONT_SIZE = 24
DISPLAY_LIST_FONT_SIZE = 16
DISPLAY_LIST_POSITION = (10, HEIGHT - 150)
WHITE, BLACK, GREEN, RED = pygame.Color("white"), pygame.Color("black"), pygame.Color("green"), pygame.Color("red")

# Initialize Pygame
pygame.init()

# Main Screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()
font = pygame.font.Font(pygame.font.get_default_font(), FPS_FONT_SIZE)
font_display_list = pygame.font.Font(pygame.font.get_default_font(), DISPLAY_LIST_FONT_SIZE)
running = True
paused = False

# Particle class for better structure
class Particle:
    def __init__(self, position, radius, color, mass, initial_velocity):
        self.position = pygame.Vector2(position)
        self.radius = radius
        self.velocity = pygame.Vector2(initial_velocity)
        self.color = pygame.Color(color)
        self.mass = mass
        self.predicted_path = []

# Initial values with adjusted initial velocities and masses
particles = [
    Particle((WIDTH // 2, HEIGHT // 2), 20, "white", 5, (0, 5)),
    Particle((WIDTH // 2 + 100, HEIGHT // 2), 10, "green", 3, (0, -5)),
    Particle((WIDTH // 2 - 100, HEIGHT // 2), 15, "red", 8, (0, 0))
]

# Simulation parameters
dt = 0.03  # Initial time step
GRAVITY = 1000.00000  # Initial gravitational constant

# UI elements
font_ui = pygame.font.Font(pygame.font.get_default_font(), 18)

# Functions
def draw_particles():
    for particle in particles:
        pygame.draw.circle(screen, particle.color, particle.position.xy, particle.radius)

def draw_display_list():
    display_list_text = [
        f"Constants:",
        f"   - dt: {round(dt, 5)}",
        f"   - GRAVITY: {GRAVITY}",
        "",
    ]
    for i, particle in enumerate(particles):
        position_text = f"Position: ({int(particle.position.x)}, {int(particle.position.y)})"
        velocity_text = f"Velocity: ({int(particle.velocity.x)}, {int(particle.velocity.y)})"
        display_list_text.append(f"Particle {i + 1}: {position_text}, {velocity_text}")

    for i, text in enumerate(display_list_text):
        text_surface = font_display_list.render(text, True, WHITE)
        screen.blit(text_surface, (DISPLAY_LIST_POSITION[0], DISPLAY_LIST_POSITION[1] + i * DISPLAY_LIST_FONT_SIZE))

def draw_fps():
    fps_text = font.render(f"FPS: {int(clock.get_fps())}", True, WHITE)
    screen.blit(fps_text, (10, 10))

def gravity(particle1, particle2, dt, gravity_constant):
    distance = particle1.position.distance_to(particle2.position)
    force_magnitude = gravity_constant * particle1.mass * particle2.mass / max(distance ** 2, 1)

    force = force_magnitude * (particle2.position - particle1.position).normalize()

    # Update velocities using Verlet integration
    particle1.velocity += force / particle1.mass * dt
    particle2.velocity -= force / particle2.mass * dt

    # Update positions using Verlet integration
    particle1.position += particle1.velocity * dt
    particle2.position += particle2.velocity * dt
    
# Main loop
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            elif event.key == pygame.K_p:
                paused = not paused

    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP]:
        dt += 0.0001
    elif keys[pygame.K_DOWN]:
        dt = max(0.0001, dt - 0.0001)
    elif keys[pygame.K_LEFT]:
        GRAVITY = max(1, GRAVITY - 10)
    elif keys[pygame.K_RIGHT]:
        GRAVITY += 10

    if not paused:
        for i in range(len(particles) - 1):
            for j in range(i + 1, len(particles)):
                gravity(particles[i], particles[j], dt, GRAVITY)

    screen.fill(BLACK)

    # Draw dotted lines for predicted paths
    for particle in particles:
        for point in particle.predicted_path:
            pygame.draw.circle(screen, particle.color, (int(point[0]), int(point[1])), 1, 1)

    draw_particles()
    draw_display_list()
    draw_fps()

    pygame.display.flip()

    clock.tick(60)

pygame.quit()
sys.exit()
