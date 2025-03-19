# Block Catalogue
<!-- [< Modules](../Modules.md) -->

The Block catalogue is responsible for cataloguing all terminal blocks available on the grid.  It is initiated when Mother boots, and reduces the need to search the entire grid for blocks when a command is run.

::: important
The Block Catalogue will register terminal blocks on the main grid, as well as subgrids connected via a piston, hinge, or rotor.  It does not register blocks on subgrids connected via connectors to prevent side effects when docked. This is considered a single **construct**.
:::

## Supported Blocks

Mother supports all block is type `IMyTerminalBlock` and includes the following blocks and more.

- Hinges
- Pistons
- Rotors
- Gyroscopes
- Doors
- Connectors
- Lights
- Remote Control Blocks
- Timer Blocks
- Gas Tanks (Hydrogen & Oxygen)
- Batteries
- Landing Gear & Magnetic Plates
- Drills
- Welders
- Grinders
- Sound Blocks
- Air Vents
- Programmable Blocks
- Medical Rooms
- Sensor Blocks

For a complete list of supported blocks, see the [API Index](https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyTerminalBlock) created by Malware.

## Why Do We Have It?

A key design principle of Mother is to reduce computation due to the way Space Engineers programmable blocks run scripts.  This means that Mother maximized computation on boot, but otherwise only runs when prompted by the player or another grid.  By building a catalogue of functional blocks, Mother can quickly identify and interact with blocks without needing to scan the grid each time a command is run.
