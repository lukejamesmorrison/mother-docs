# Ingame Script

[< Home](../README.md)

![Beta](https://img.shields.io/badge/Beta-blue)
![Version](https://img.shields.io/badge/0.2.6-yellow)


> [!WARNING] 
> Mother is in beta development. I'm on a quest to reduce the character count, and increase the functionality. Please report any issues you encounter, and expect some of the commands and underlying framework to change.

Mother is available as an ingame script for Programmable Blocks in Space Engineers. It gives you access to many features, including:
<br><br>

- **Secure Intergrid Communication** - Grids [share positions](Modules/Core/Almanac.md) and easy easily send commands remotely to each other.
- **Expanded Automation** - Mother simplifies interacting with the mechanical systems on your grid, and monitors them for changes. See the [Command Cheatsheet](CommandCheatsheet.md).
- **Flight Planning and Visualization** - Leverage the existing GPS system and Remote Control block to program and [fly flight plans dynamically](Modules/Extension/NavigationModule.md).
- **Copy Automations with Ease** - Easily port your automations from one grid to another by copying `CustomData` text.

<br>
This script is designed to be efficient, only running when triggered by a command. It is not intended to replace all existing block actions, but rather attempts to improve the most common automations and block types. Over time, I expect the command library to grow considerably.
<br><br>

> [!NOTE]
> Mother interoperates seamlessly with Timer Blocks and Event Controllers allowing it to be used to augment existing automations.

---

1. [Installation](Installation.md)
2. [Running Commands](CommandLineInterface.md)
3. [Configuration](Configuration.md)
4. [Modules](Modules/Modules.md)
5. [Examples](Examples.md)
6. [Command Cheatsheet](CommandCheatsheet.md)

## Videos

### Introduction
[![Introduction](https://img.youtube.com/vi/6SdQpArCuJM/0.jpg)](https://www.youtube.com/watch?v=6SdQpArCuJM)


## Overview

![Mechanical Systems](Assets/mechanical-systems-overview.png)


## Upcoming Features

1. Use of block customData to improve customization.  Ie. LCDPanel1.CustomData can contain configuration specific to it - ie. scale, centerpoint,etc.
2. Master-Node architecture to allow for multiple programmable blocks running Mother Core to work together on the same grid.
3. Autodocking
