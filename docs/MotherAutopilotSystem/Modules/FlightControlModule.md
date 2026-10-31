# Flight Control Module
<!-- [< Modules](../Modules.md) -->

This module manages autopilot and various flight characteristics of your grid. For this module to function, the grid must have a Remote Control block.

[[toc]]

## Commands

### start
Engage the autopilot system, enabling the grid to fly autonomously if a [Flight Plan](FlightPlanningModule.md) is loaded.
```
fcs/start [--options]
```
Options
<!-- table of cli options -->
| Option  | Values  | Unit | Description                        |
| ------- | ------- | ---- | ---------------------------------- |
| `speed` | 0 - max | m/s  | Set the maximum speed of the grid. |

**Example**

```ms title="Terminal"
fcs/start --speed=50;
```

::: tip
By default, the max speed is 100 m/s, though you can use mods like [Configurable Parameters](https://steamcommunity.com/sharedfiles/filedetails/?id=2422592854) to change this. I highly recommend it and typically set the max speed to 300 m/s for small grids, and 500 m/s for large grids.
:::


### stop
Disengage the autopilot system.
```
fcs/stop
```

**Example**

```ms title="Terminal"
fcs/stop;
```

## Properties

MAPS registers the properties and predicates of your ship with [conditional logic](../../IngameScript/ConditionalLogic.md). Use `grid` as the target, which is the grid's controller (a cockpit or remote control). Because Mother Core shares conditions across the construct, [Mother OS](../../IngameScript/IngameScript.md) and [Mother GUI](../../MotherGUI/README.md) can use them too, as long as MAPS runs on the same construct.

| Name | Type | Description |
|-|-|-|
| `speed` | Property | The speed of the grid in m/s. |
| `gravity` | Property | The strength of the planet's gravity in m/s². It is about 9.8 at 1 g, and `0` in space. |
| `altitude` | Property | The height above the planet's surface in metres. It has no value in space, so a condition on it is false there. |
| `moving` | Predicate | The grid is faster than 0.1 m/s. |
| `stopped` | Predicate | The grid is not faster than 0.1 m/s. |
| `inspace` | Predicate | There is no gravity (`gravity == 0`). |
| `ingravity` | Predicate | There is gravity (`gravity != 0`). |

```ms title="Mother OS > Custom Data"
[rules]
LandingLights=
| when grid altitude < 100 --buffer=20 --for=2;
|   block/on "Landing Lights";
| else;
|   block/off "Landing Lights";

Atmosphere=
| when grid inspace --for=3;
|   block/off "Atmospheric Thrusters";
|   block/on "Hydrogen Thrusters";
| else;
|   block/on "Atmospheric Thrusters";
|   block/off "Hydrogen Thrusters";
```

```ms title="Terminal"
; Inside a routine, use if to branch on the ship's state
if grid speed > 30; light/color "Speed Light" red; end;
```

See the [Space Transition](../../IngameScript/Examples.md#space-transition) and [Landing Lights](../../IngameScript/Examples.md#landing-lights) examples.

