import Blank_sim_V3 as bs
import numpy as np

if __name__ == '__main__':
    bs.Particle([90, 90],  #Position
                [0, 0],  #Velocity
                [0, 0],  #Acceleration
                [0, 1],  #Force
                20, 10, "white")  #Mass and Radius

    bs.Particle([90, 120],  #Position
                [0, 0],  #Velocity
                [0, 0],  #Acceleration
                [0, 0],  #Force
                20, 10, "white")  #Mass and Radius

    bs.Particle([90, 170],  #Position
                [0, -2],  #Velocity
                [0, 0],  #Acceleration
                [0, 0],  #Force
                20, 10, "white")  #Mass and Radius
    
    while bs.Main(): 
        pass

    bs.pg.quit()
