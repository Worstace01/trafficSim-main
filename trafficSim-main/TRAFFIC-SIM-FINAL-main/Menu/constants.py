import random
import pygame




defaultGreen = {0:10, 1:10, 2:10, 3:10}
defaultRed = 150
defaultYellow = 5



# Initialize variables
signals = []
noOfSignals = 4
currentGreen = 4  # Indicates which signal is green currently
nextGreen = (currentGreen + 1) % noOfSignals    # Indicates which signal will turn green next
currentYellow = 0   # Indicates whether yellow signal is on or off


def update_current_green():
    global currentGreen, nextGreen
    currentGreen = random.randint(0, noOfSignals - 1)
    nextGreen = (currentGreen + 1) % noOfSignals
    print(f"Current green signal: {currentGreen}")


# Initialize Pygame
pygame.init()

# Constants
noOfSignals = 4  # Number of traffic signals (change as needed)
screen_width = 400
screen_height = 300
button_width = 200
button_height = 50
button_color = (0, 255, 0)  # Green color for the button
text_color = (255, 255, 255)  # White color for text
font = pygame.font.Font("font\digital.ttf", 36)  # Font for text


# Initialize the screen
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption('images/intersection.png')

clock = pygame.time.Clock()

# Function to draw text on the button
def draw_text(text, font, color, surface, x, y):
    textobj = font.render(text, True, color)
    textrect = textobj.get_rect()
    textrect.center = (x, y)
    surface.blit(textobj, textrect)








speeds = {'car':1.8, 'bus':1.5, 'truck':1.7, 'bike':1.8}  # average speeds of vehicles
#x = {'right': [1, 1, 1], 'down': [510, 510, 540], 'left': [1000, 1000, 1000], 'up': [800, 430, 469]}
#y = {'right': [495, 430, 465], 'down': [180, 100, 190], 'left': [516, 516, 542], 'up': [914, 990, 900]}
# Coordinates of vehicles' start positions

x = {'right': [1, 1, 1], 'down': [800, 430, 459], 'left': [1000, 1000, 1000], 'up': [510, 510, 540]}
y = {'right': [511, 511, 542], 'down': [186, 100, 122], 'left': [495, 430, 465], 'up': [914, 990, 900]}
vehicles = {'right': {0: [], 1: [], 2: [], 'crossed': 0}, 'down': {0: [], 1: [], 2: [], 'crossed': 0}, 'left': {0: [], 1: [], 2: [], 'crossed': 0}, 'up': {0: [], 1: [], 2: [], 'crossed': 0}}
vehicleTypes = {0: 'car', 1: 'bus', 2: 'truck', 3: 'bike'}
directionNumbers = {0: 'right', 1: 'down', 2: 'left', 3: 'up'}

# Coordinates of signal image, timer, and vehicle count
signalCoods = [(365, 602), (365, 290),  (585, 290), (585, 602)]
signalTimerCoods = [(425, 530),(445, 420), (550, 445), (530, 557)]

# Coordinates of stop lines
stopLines = {'right': 390, 'down': 400, 'left': 605, 'up': 600}
defaultStop = {'right': 380, 'down': 390, 'left': 615, 'up': 620}

# Gap between vehicles
stoppingGap = 35   # stopping gap
movingGap = 35   # moving gap

# set allowed vehicle types here
allowedVehicleTypes = {'car': True, 'bus': True, 'truck': True, 'bike': True}
allowedVehicleTypesList = []
vehiclesTurned = {'right': {1:[], 2:[]}, 'down': {1:[], 2:[]}, 'left': {1:[], 2:[]}, 'up': {1:[], 2:[]}}
vehiclesNotTurned = {'right': {1:[], 2:[]}, 'down': {1:[], 2:[]}, 'left': {1:[], 2:[]}, 'up': {1:[], 2:[]}}
rotationAngle = 3
mid = {'right': {'x':454, 'y':566}, 'down': {'x':605, 'y':445}, 'left': {'x':561, 'y':442}, 'up': {'x':610, 'y':540}}
# set random or default green signal time here 
randomGreenSignalTimer = True
# set random green signal time range here 
randomGreenSignalTimerRange = [15,20]

pygame.init()
simulation = pygame.sprite.Group()

class TrafficSignal:
    def __init__(self, red, yellow, green):
        self.red = red
        self.yellow = yellow
        self.green = green