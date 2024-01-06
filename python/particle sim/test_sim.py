import blank_sim_v2 as bs
import numpy as np

if __name__ == '__main__':
    bs.Particle(np.array([90, 90], dtype=np.float32),  #Position
                np.array([0, 0], dtype=np.float32),  #Velocity
                np.array([0, 0.1], dtype=np.float32),  #Acceleration
                np.array([0, 0], dtype=np.float32),  #Force
                20, 10, "white")  #Mass and Radius

    bs.Particle(np.array([90, 120], dtype=np.float32),  #Position
                np.array([0, 0], dtype=np.float32),  #Velocity
                np.array([0, 0], dtype=np.float32),  #Acceleration
                np.array([0, 0], dtype=np.float32),  #Force
                20, 10, "white")  #Mass and Radius

    bs.Particle(np.array([90, 160], dtype=np.float32),  #Position
                np.array([0, 0], dtype=np.float32),  #Velocity
                np.array([0, 0], dtype=np.float32),  #Acceleration
                np.array([0, 0], dtype=np.float32),  #Force
                20, 10, "white")  #Mass and Radius

    while bs.Main(): 
        pass

    bs.pg.quit()
