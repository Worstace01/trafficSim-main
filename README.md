# 🚦 Traffic Intersection Simulation

A visual simulation of a 4-way traffic intersection built using **Python** and **Pygame**. This project models traffic flow, signal timing, vehicle collision avoidance, and turning logic.

## 📝 Description

This application simulates a realistic traffic scenario where different types of vehicles (cars, buses, trucks, and bikes) navigate a signalized intersection. The system features:
* [cite_start]**Intelligent Traffic Lights:** Signals cycle through Red, Yellow, and Green states using multi-threading for accurate timing[cite: 3, 22].
* [cite_start]**Vehicle AI:** Vehicles detect cars ahead to maintain a safe stopping distance, respect traffic lights, and handle turning logic[cite: 22, 478].
* [cite_start]**Dynamic Generation:** Vehicles are randomly generated to create varying traffic patterns[cite: 22, 349].

## ✨ Features

* [cite_start]**4-Way Intersection:** Traffic flows from North, South, East, and West[cite: 22, 426].
* [cite_start]**Vehicle Types:** Supports **Cars**, **Buses**, **Trucks**, and **Bikes**[cite: 22, 467].
* [cite_start]**Collision Detection:** Vehicles automatically stop if the car ahead stops or if the light is red[cite: 22].
* [cite_start]**Smooth Turning:** Vehicles execute smooth turns based on random pathing logic[cite: 22].
* [cite_start]**Graphical Interface:** Built with Pygame for real-time rendering[cite: 18, 422].

## 🛠️ Requirements

* Python 3.x
* [Pygame](https://www.pygame.org/)

## 🚀 Installation & Usage

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/Worstace01/trafficSim-main.git](https://github.com/Worstace01/trafficSim-main.git)
    ```

2.  **Navigate to the Project Folder**
    The code is located inside the `trafficSim-main` folder.
    ```bash
    cd trafficSim-main
    ```

3.  **Install Dependencies**
    You need to install `pygame` if you haven't already.
    ```bash
    pip install pygame
    ```

4.  **Run the Simulation**
    Run the main Python script (usually `main.py` or `versiondraft.py` depending on your specific setup).
    ```bash
    python versiondraft.py
    ```

## 📂 Project Structure

* [cite_start]**`traffic_signal.py`**: Defines the logic for traffic light states (Red, Yellow, Green)[cite: 416].
* [cite_start]**`vehicle.py`**: Controls vehicle movement, speed, and direction[cite: 477].
* [cite_start]**`simulation.py`**: Manages the initialization of signals and timers[cite: 1].
* [cite_start]**`constants.py`**: Stores configuration variables like screen size, coordinates, and speeds[cite: 452].
* [cite_start]**`settings.py`**: Configuration for screen dimensions and frame rates[cite: 413].
* [cite_start]**`utils.py`**: Helper functions for drawing text and handling assets[cite: 410].
* [cite_start]**`game.py`**: Main game loop and window management[cite: 419].

## 📄 License

This project is open source and available for educational purposes.
