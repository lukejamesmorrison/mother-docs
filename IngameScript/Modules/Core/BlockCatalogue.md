# Block Catalogue

The Block catalogue is responsible for cataloguing all functional blocks available on the grid.  It is initiated when Mother boots, and reduces the need to search the entire grid for blocks when a command is run.

## Functional Blocks

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

> [!IMPORTANT]
> The Block Catalogue will register functional blocks on the main grid, as well as subgrids connected via a piston, hinge, or rotor.  It does not register blocks on subgrids connected via connectors to prevent side effects when docked.

## Why Do We Have It?

A key design principle of Mother is to reduce computation due to the way Space Engineers programmable blocks run scripts.  This means that Mother maximized computation on boot, but otherwise only runs when prompted by the player or another grid.  By building a catalogue of functional blocks, Mother can quickly identify and interact with blocks without needing to scan the grid each time a command is run.
