# Almanac

Mother maintains a list of all grids in the world running Mother that are connected via an antenna network. The Almanac is used to track grid locations, status, and other information. It is automatically generated during boot, and updates as a result of certain interactions with other grids. 

::: note
Grids running Mother will periodically communicate, at which time the Almanac is updated with details specific to each grid.
:::

To immediately refresh the Almanac, you can run the `ping` command.


## Why Do We Have It?

In order for grids to interoperate seamlessly, it is important for them to store key information about each other.  This includes properties like their id, position and speed.  Other modules can make use of this for secure communication, and sending remote commands.


<!-- ## Friendly or Foe?

Mother can identify a grid as Friendly, Neutral, or Foe.  This setting is determined based upon how Mother communicates with the grid.  If your grid is using encrypted communication, then only grids with the same encryption key will be considered Friendly.  If your grid is using unencrypted communication, then all grids will be considered Neutral unless they belong to your faction. -->

## Storing Information

By default, the Almanac uses [LocalStorage](LocalStorage.md) to ensure the positions and information of grids and waypoints are not lost when Mother encounters an error, or the script is rebooted/recompiled.  This means that the Almanac is persistent across reboots of the Programmable Block, preventing the loss of important data over time.
