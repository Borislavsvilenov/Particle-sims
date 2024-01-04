import time
import keyboard
import random

cards = [[0,1,2,3,4,5,6,7,8,9,40,41,42],[10,11,12,13,14,15,16,17,18,19,43,44,45],[20,21,22,23,24,25,26,27,28,29,46,47,48],[30,31,32,33,34,35,36,37,38,39,49,50,51],[52,53]]
p1 = []
p2 = []
p3 = []
p4 = []
topcard = 0
color = "None"
PosibleMoves = []


def start():
    for i in range(5):
        p1.insert(i, random.randint(0,53))
        p2.insert(i, random.randint(0,53))
        p3.insert(i, random.randint(0,53))
        p4.insert(i, random.randint(0,53))

def availableMoves(pturn, topcard):


    PosibleMoves = []
    string = str(topcard)
    outputlist = list(map(int, string))
    num = 15
    topcardnum = 20
    
    if topcard in [0,1,2,3,4,5,6,7,8,9,40,41,42]:
        topcardcolor = "red"
    if topcard in [10,11,12,13,14,15,16,17,18,19,43,44,45]:
        topcardcolor = "blue"
    if topcard in [20,21,22,23,24,25,26,27,28,29,46,47,48]:
        topcardcolor = "green"
    if topcard in [30,31,32,33,34,35,36,37,38,39,49,50,51]:
        topcardcolor = "Yellow"
    if topcard in [52,53]:
        topcardcolor = "any"
    if topcard < 40:
        topcardnum = outputlist[len(outputlist) - 1]


    if pturn == 1:
        l = 0

        for k in range(len(p1)):

            string = str(p1[k])
            outputlist = list(map(int, string))

            if p1[k] in [0,1,2,3,4,5,6,7,8,9,40,41,42]:
                color = "red"
            if p1[k] in [10,11,12,13,14,15,16,17,18,19,43,44,45]:
                color = "blue"
            if p1[k] in [20,21,22,23,24,25,26,27,28,29,46,47,48]:
                color = "green"
            if p1[k] in [30,31,32,33,34,35,36,37,38,39,49,50,51]:
                color = "Yellow"
            if p1[k] in [52,53]:
                color = "any"
            if p1[k] < 40:
                num = outputlist[len(outputlist) - 1]

            if topcardcolor == color or topcardnum == num:
                PosibleMoves.insert(l, p1[k])
                l = l+1

    if pturn == 2:
        l = 0
        for k in range(len(p2)):

            string = str(p2[k])
            outputlist = list(map(int, string))

            if p2[k] in [0,1,2,3,4,5,6,7,8,9,40,41,42]:
                color = "red"
            if p2[k] in [10,11,12,13,14,15,16,17,18,19,43,44,45]:
                color = "blue"
            if p2[k] in [20,21,22,23,24,25,26,27,28,29,46,47,48]:
                color = "green"
            if p2[k] in [30,31,32,33,34,35,36,37,38,39,49,50,51]:
                color = "Yellow"
            if p2[k] in [52,53]:
                color = "any"
            if p2[k] < 40:
                num = outputlist[len(outputlist) - 1]

            if topcardcolor == color or topcardnum == num:
                PosibleMoves.insert(l, p2[k])
                l = l+1

    if pturn == 3:
        l = 0
        for k in range(len(p3)):

            string = str(p3[k])
            outputlist = list(map(int, string))

            if p3[k] in [0,1,2,3,4,5,6,7,8,9,40,41,42]:
                color = "red"
            if p3[k] in [10,11,12,13,14,15,16,17,18,19,43,44,45]:
                color = "blue"
            if p3[k] in [20,21,22,23,24,25,26,27,28,29,46,47,48]:
                color = "green"
            if p3[k] in [30,31,32,33,34,35,36,37,38,39,49,50,51]:
                color = "Yellow"
            if p3[k] in [52,53]:
                color = "any"
            if p3[k] < 40:
                num = outputlist[len(outputlist) - 1]

            if topcardcolor == color or topcardnum == num:
                PosibleMoves.insert(l, p3[k])
                l = l+1

    if pturn == 4:
        l = 0
        for k in range(len(p4)):

            string = str(p4[k])
            outputlist = list(map(int, string))

            if p4[k] in [0,1,2,3,4,5,6,7,8,9,40,41,42]:
                color = "red"
            if p4[k] in [10,11,12,13,14,15,16,17,18,19,43,44,45]:
                color = "blue"
            if p4[k] in [20,21,22,23,24,25,26,27,28,29,46,47,48]:
                color = "green"
            if p4[k] in [30,31,32,33,34,35,36,37,38,39,49,50,51]:
                color = "Yellow"
            if p4[k] in [52,53]:
                color = "any"
            if p4[k] < 40:
                num = outputlist[len(outputlist) - 1]

            if topcardcolor == color or topcardnum == num:
                PosibleMoves.insert(l, p4[k])
                l = l+1

    return PosibleMoves

def drawCard(turn):
    if turn == 1:
        p1.insert(0, random.randint(0,53))
    if turn == 2:
        p2.insert(0, random.randint(0,53))
    if turn == 3:
        p3.insert(0, random.randint(0,53))
    if turn == 4:
        p4.insert(0, random.randint(0,53))

def aturn():
    topcard = random.randint(0,39)
    turn = 1
    direction = 1
    while len(p1) != 0 or len(p2) != 0 or len(p3) != 0 or len(p4) != 0: 
        while True:
            PosibleMoves = availableMoves(turn, topcard)
            rangeOfMoves = len(PosibleMoves) - 1
            if rangeOfMoves < 0:
                drawCard(turn)
                continue
            if rangeOfMoves > -1:
                pickedMove = random.randint(0,rangeOfMoves)
                break

        topcard = PosibleMoves[pickedMove]
        pickedCard = PosibleMoves[pickedMove]

        if turn == 1:
            p1.remove(pickedCard)
        if turn == 2:
            p2.remove(pickedCard)
        if turn == 3:
            p3.remove(pickedCard)
        if turn == 4:
            p4.remove(pickedCard)

        PosibleMoves = []

        if pickedCard in [41,44,47,50]:
            direction = direction * -1

        if pickedCard in [42, 45, 48, 51]:
            for d in range(2):
                drawCard(turn + direction)

        if pickedCard == 53:
            for d in range(4):
                drawCard(turn + direction)

        if pickedCard in [40, 43, 46, 49]:
            if turn > 3 and direction == 1:
                turn = 2
            if turn < 2 and direction == -1:
                turn = 3
            else:
                turn = turn + 2 * direction
                continue

        if turn > 3 and direction == 1:
            turn = 1
        if turn < 2 and direction == -1:
            turn = 4
        else:
            turn = turn + direction

        return turn, direction, topcard, p1, p2, p3, p4

start()
aturn()

