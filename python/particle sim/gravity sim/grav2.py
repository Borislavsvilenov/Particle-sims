import pygame

#Main Screen
screen = pygame.display.set_mode((750, 750))
clock =  pygame.time.Clock()
running = True
Cx, Cy = screen.get_width() / 2, screen.get_height() / 2
pygame.init()

#Initial values
t = 0
g = 1
Point1 = pygame.Vector2(Cx, Cy)
Point2 = pygame.Vector2(Cx + 50, Cy+1)
Point1Velocity = pygame.Vector2(0, 2)
Point2Velocity = pygame.Vector2(0, 0)
Points = [[Point1, 20, Point1Velocity, "white"],[Point2, 10, Point2Velocity, "green"]]

#Functions
def draw_canvas():
    screen.fill('black')
    for i in range(len(Points)):
        pygame.draw.circle(screen, Points[i][3], Points[i][0], Points[i][1])


    pygame.display.flip()

def gravity(obj1, obj2):
    m1, m2 = obj1[1], obj2[1]
    p1, p2 = obj1[0], obj2[0]
    Distance = pygame.Vector2(p1.x - p2.x, p1.y - p2.y)

    if abs(Distance.x) <= obj1[1] and abs(Distance.y) <= obj1[1]:
        Force = pygame.Vector2(0, 0)
        change1, change2 = pygame.Vector2(0, 0), pygame.Vector2(0, 0)
    else:
        if abs(Distance.x) <= 0.01:
            Force = pygame.Vector2(0, g * m1 * m2 / Distance.y)
        elif abs(Distance.y) <= 0.01:
            Force = pygame.Vector2(g * m1 * m2 / Distance.x, 0)
        else:
            Force = pygame.Vector2(g * m1 * m2 / Distance.x, g * m1 * m2 / Distance.y)

    a1, a2 = - Force / m1, Force / m2
    change1, change2 = pygame.Vector2((obj1[2] * t) + (1/2 * a1 * t * t)), pygame.Vector2((obj2[2] * t) + (1/2 * a2 * t * t))
    obj1[0], obj2[0] = obj1[0] + change1, obj2[0] + change2
    
#Main loop
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    dt = clock.tick(60)
    t = t + dt / 1000


    for i in range(len(Points) - 1):
        for j in range(i + 1, len(Points)):
            gravity(Points[i], Points[j])

    draw_canvas()

pygame.quit()

            