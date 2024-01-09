import numpy as np
import Blank_sim_V3 as bs

constant = 1

def fall_boundaries(self, constant):
    if self.position[0] >= bs.screen.get_width() - self.radius:
        self.position[0] = bs.screen.get_width() - self.radius
        self.velocity[0] = - abs(self.velocity[0]) * bs.Particle.bounciness
    
    if self.position[0] <= self.radius:
        self.position[0] = self.radius
        self.velocity[0] = abs(self.velocity[0]) * bs.Particle.bounciness

    if self.position[1] >= bs.screen.get_height() - self.radius:
        self.position[1] = bs.screen.get_height() - self.radius
        self.velocity[1] = - abs(self.velocity[1]) * bs.Particle.bounciness

    if self.position[1] <= self.radius:
        self.position[1] = self.radius
        self.velocity[1] = abs(self.velocity[1]) * bs.Particle.bounciness

    self.force[1] = self.mass * constant

frame_counter = 0

while bs.Main():
    for point in bs.Particles:
        fall_boundaries(point, constant)

    if frame_counter % 10 == 0:
        bs.Particle([100, 300],  #Position
                    [20, 0],  #Velocity
                    [0, 0],  #Acceleration
                    [0, 0],  #Force
                    10, 10, "white")  #Mass and Radius

    frame_counter += 1

            
bs.pg.display.quit()



