## Overview

Zappy is a network-based simulation. The simulation involves several teams competing on a tile-based map to gather resources and achieve the highest level of elevation.
The simulation consists of three main parts: a server, a graphical user interface (GUI), and an artificial intelligence (AI) client.

## Project Structure

- **Server**: Written in C, it handles the simulation world and character interactions.
- **GUI**: Developed in C++, it provides a visual representation of the simulation world.
- **AI Client**: Written in Go, it controls the character's actions autonomously.

## Gameplay

- **Objective**: Teams must gather resources and elevate their characters. The first team with six characters at the maximum elevation wins.
- **Map**: The simulation takes place on a continuous, wrap-around map with no relief features.
- **Resources**: The world contains various resources like food and stones (linemate, deraumere, sibur, mendiane, phiras, thystame) essential for survival and elevation.

## Key Features

1. **Environment Management**: The server generates and manages the world, including spawning resources at regular intervals.
2. **Player Interaction**: Players can move, gather resources, communicate, reproduce, and eject others from tiles.
3. **AI Control**: The AI's client drives the character's actions without user intervention after launch.
4. **Graphical Interface**: The GUI provides a 3D visualization of the simulation world, allowing users to observe the simulation's progress.

## Demo