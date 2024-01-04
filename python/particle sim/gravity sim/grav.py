import pygame

pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

centerOfScreenX,centerOfScreenY = screen.get_width() / 2, screen.get_height() / 2
G = 1



P1x, P1y, P1m, V1x, V1y = centerOfScreenX, centerOfScreenY, 40, 0, 0
P2x, P2y, P2m, V2x, V2y = centerOfScreenX + 100, centerOfScreenY - 100, 20, 0, 0

Point1 = pygame.Vector2(P1x,P1y)
Point2 = pygame.Vector2(P2x,P2y)

Velocity1 = pygame.Vector2(V1x,V1y)
Velocity2 = pygame.Vector2(V2x,V2y)

masses = [P1m,P2m]
dt = 0

while running:

    t = clock.tick(60)
    dt = dt + t / 1000

    D1_2a = pygame.Vector2(abs(Point1.x - Point2.x), abs(Point1.y - Point2.y))
    F1_2s = pygame.Vector2(G * ((P1m * P2m) / D1_2a.x), G * ((P1m * P2m) / D1_2a.y))

    a1 = pygame.Vector2(F1_2s / P1m)
    a2 = pygame.Vector2(F1_2s / P2m)

    Velocity1 = pygame.Vector2((Velocity1 * dt) + ((a1 * (dt * dt)) / 2))
    Velocity2 = pygame.Vector2((Velocity2 * dt) + ((a2 * (dt * dt)) / 2))

    Point1 = (Point1.x + Velocity1.x, Point1.y + Velocity1.y)
    Point2 = (Point2.x + Velocity2.x, Point2.y + Velocity2.y)

    Points = [Point1, Point2]

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill("black")

    # RENDER YOUR GAME HERE
    for i in range(0,len(Points)):
        pygame.draw.circle(screen, "white", Points[i], masses[i])


    pygame.display.flip()

pygame.quit()