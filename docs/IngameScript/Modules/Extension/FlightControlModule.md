# Flight Control Module
<!-- [< Modules](../Modules.md) -->

This module manages autopilot and various flight characteristics of your grid. For this module to function, the grid must have a Remote Control block.

[[toc]]

## Commands

### start
Engage the autopilot system, enabling the grid to fly autonomously if a [Flight Llan](../Extension/NavigationModule.md) is loaded.
```
fcs/start [--options]
```
Options
<!-- table of cli options -->
| Option  | Values  | Unit | Description                        |
| ------- | ------- | ---- | ---------------------------------- |
| `speed` | 0 - max | m/s  | Set the maximum speed of the grid. |

::: tip
By default, the max speed is 100 m/s, though you can use mods like [Configurable Parameters](https://steamcommunity.com/sharedfiles/filedetails/?id=2422592854) to change this. I highly recommend it and typically set the max speed to 300 m/s for small grids, and 500 m/s for large grids.
:::

### stop
Disengage the autopilot system.
```
fcs/stop
```