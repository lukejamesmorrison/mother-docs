# Block Catalogue

During the boot process, Mother builds a catalogue of all functional blocks on the grid. This catalogue is used to quickly identify and interact with blocks later during command execution.

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

## Which Do We Have It?

A key design principle of Mother is to reduce computation due to the way Space Engineers programmable blocks run scripts.  This means that Mother maximized computation on boot, but otherwise only runs when prompted by the player or another grid.  By building a catalogue of blocks, Mother can quickly identify and interact with blocks without needing to scan the grid each time a command is run.