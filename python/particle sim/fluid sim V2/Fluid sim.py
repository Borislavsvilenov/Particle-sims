import blank_sim_v1 as bs
import pygame as pg
import numpy as np
gravity = 2

def fall_boundaries(particle):
    

    particle.acceleration = pg.Vector2(0, gravity)

    if particle.position.x <= particle.mass:
        particle.position.x = particle.mass
        particle.velocity.x = abs(particle.velocity.x)

    if particle.position.x >= bs.screen.get_width() - particle.mass:
        particle.position.x = bs.screen.get_width() - particle.mass
        particle.velocity.x = -abs(particle.velocity.x)

    if particle.position.y >= bs.screen.get_height() - particle.mass:
        particle.position.y = bs.screen.get_height() - particle.mass
        particle.velocity.y = -abs(particle.velocity.y)

    if particle.position.y <= particle.mass:
        particle.position.y = particle.mass
        particle.velocity.y = abs(particle.velocity.y)



frame_counter = 0

    


while bs.Run():
    for i in bs.Particles:
        fall_boundaries(i)

    if frame_counter % 10 == 0:
        bs.newParticle(pg.Vector2(100, 50), 10, "white", pg.Vector2(30, 0))

    frame_counter += 1



bs.pg.display.quit()

