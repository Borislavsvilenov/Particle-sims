import blank_sim_v2 as bs
import numpy as np
gravity = 2

def fall_boundaries(particle):
    if particle.position[0] >= bs.screen.get_width():
        particle.position[0] = bs.screen.get_width() - particle.radius
        particle.velocity[0] = - abs(particle.velocity[0]) * bs.bounciness
    
    if particle.position[0] <= particle.radius:
        particle.position[0] = particle.radius
        particle.velocity[0] = abs(particle.velocity[0]) * bs.bounciness

    if particle.position[1] >= bs.screen.get_height():
        particle.position[1] = bs.screen.get_height() - particle.radius
        particle.velocity[1] = - abs(particle.velocity[1]) * bs.bounciness

    if particle.position[1] <= particle.radius:
        particle.position[1] = particle.radius
        particle.velocity[1] = abs(particle.velocity[1]) * bs.bounciness

frame_counter = 0

    


while bs.Main():
    for point in bs.Particles:
        fall_boundaries(point)

    if frame_counter % 10 == 0:
        bs.Particle(np.array([100, 50], dtype=np.float32),  #Position
                np.array([30, 0], dtype=np.float32),  #Velocity
                np.array([0, gravity], dtype=np.float32),  #Acceleration
                np.array([0, 0], dtype=np.float32),  #Force
                10, 10, "white")  #Mass and Radius

    frame_counter += 1



