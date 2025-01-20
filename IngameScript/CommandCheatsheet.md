# Command Cheatsheet

Commands belong to [Modules](/Modules/Modules.md). You can create custom commands when [creating a custom project](). Any command registered in a module will be made available by Mother to the Programmable Block terminal.

The following is a list of commands available in the default modules.

1. [Core](#core)
2. [Doors](#doors)
3. [Connectors](#connectors)
1. [Rotors](#rotors)
2. [Hinges](#hinges)
3. [Pistons](#pistons)
4. [Flight Control System](#flight-control-system)
5. [Navigation](#navigation)
6. [Lights](#lights)
7. [Timer Blocks](#timer-blocks)
8. [Local Storage](#local-storage)

## Core
### help
Print all commands in the Programmable Block terminal.
```
help
```

### clear
Clear the Programmable Block terminal window.
```
clear
```

### ping
Ping all grids on the network and update the Almanac.
```
ping
```

### purge
Purge modules of data.  This can be used to reset module data like the Almanac and LocalStorage.

```bash
purge <modules,> <--options>
```

**Available Modules:**
|Module     | Description                   |
|-          |-                              |
|`*`        | Purge all purgable modules.   |
| `almanac` | Purge the Almanac.            |
| `storage` | Purge LocalStorage.           |

> Use `*`, or list one or more modules separated by commas `,`.

**Options**
<!-- table of cli options -->
| Option  | Values     | Description                                                         |
| ------- | ---------- | ------------------------------------------------------------------- |
| `force` | **false**, true | Acts as safeguard for purging operation. Must be included.     |

To purge all modules, you can use the following command:

```bash
purge * --force
```

To purge specific modules, you can use the following command:

```bash
purge almanac,storage --force
```


## Doors

### lock
Lock a door or group of doors.
```
door/lock <Door|Group>
```

### unlock
Unlock a door or group of doors.
```
door/unlock <Door|Group>
```

### toggle
Toggle the lock state of a door or group of doors.
```bash
door/toggle <Door|Group>
```

## Connectors

### lock
Lock a connector or group of connectors.
```
connector/lock <Connector|Group>
```

### unlock
Unlock a connector or group of connectors.
```
connector/unlock <Connector|Group>
```

### toggle
Toggle the lock state of a connector or group of connectors.
```bash
connector/toggle <Connector|Group>
```

## Rotors
### rotate
Rotate a rotor or group of rotors to a specific angle between 0 and 360 degrees.
```
rotor/rotate <Rotor|Group> <Angle> [--options]
```
Options
<!-- table of cli options -->
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `speed` | -5.0 - 5.0 | RPM  | Set the speed of the rotor. Negative values will reverse the rotor. Default is 1 RPM. |

### lock
Lock a rotor or group of rotors.
```
rotor/lock <Rotor|Group>
```
Options
<!-- table of cli options -->
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the rotor's velocity to 0 when locking. |

### unlock
Unlock a rotor or group of rotors.
```
rotor/unlock <Rotor|Group>
```

### reset
Reset a rotor or group of rotors to their original position (0 degrees).
```
rotor/reset <Rotor|Group>
```


## Hinges
### rotate
Rotate a hinge or group of hinges to a specific angle between -90 degrees and 90 degrees.
```
hinge/rotate <Hinge|Group> <Angle> [--options]
```

Options
<!-- table of cli options -->
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `speed` | -5.0 - 5.0 | RPM  | Set the speed of the hinge. Negative values will reverse the hinge. Default is 1 RPM. |

### lock
Lock a hinge or group of hinges.
```
hinge/lock <Hinge|Group>
```
Options
<!-- table of cli options -->
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the hinge's velocity to 0 when locking. |

### unlock
Unlock a hinge or group of hinges.
```
hinge/unlock <Hinge|Group>
```

### reset
Reset a hinge or group of hinges to their original position (0 degrees).
```
hinge/reset <Hinge|Group>
```

## Pistons

### distance
Extend or retract a piston to a specific distance between 0 and 8 meters.
```
piston/distance <Piston> <Distance> [--options]
```

### reset
Reset a piston to its original position (0 meters).
```
piston/reset <Piston>
```

## Flight Control System
### start
Engage the autopilot system, enabling the grid to fly autonomously if a [flight plan](../Extension/NavigationModule.md) is loaded.
```
fcs/start [--options]
```
Options
<!-- table of cli options -->
| Option  | Values  | Unit | Description                        |
| ------- | ------- | ---- | ---------------------------------- |
| `speed` | 0 - max | m/s  | Set the maximum speed of the grid. |

### stop
Disengage the autopilot system, halting the grid.
```
fcs/stop
```

## Navigation

See [Flight Planning](../Extension/NavigationModule.md).

### set-flight-plan
Set the active flight plan in the navigation system. Combine with [`fcs/start`](#flight-control-system) to begin flying.
```
nav/set-flight-plan <FlightPlanString> [--options]
```

## Lights

### color

Set the color of a light or group of lights. The color of the light is RGB ie. `255,255,255`.
```bash
light/color <Light|Group> <color>
```

### blink
Make a light blink at an interval in seconds.
```bash
light/blink <Light|Group> <interval> [--options]
```
Options
<!-- table of cli options -->
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `length` | 0 - 1 | percent  | Set the blink length of the light |
| `offset` | 0 - 1 | percent  | Set the blink offset of the light |

### reset

Reset a light or group of lights to white.

```bash
light/reset <Light|Group>
```

## Timer Blocks
### start
Start execution for a timer block or group of timer blocks
```
timer/start <Block|Group> [--options]
```

### trigger
Trigger the immediate execution of a timer block or group of timer blocks.
```
timer/trigger <Block|Group> [--options]
```

### stop
Stop execution of a timer block or group of timer blocks.

```
timer/stop <TimerBlock|Group> [--options]
```


## Local Storage

### get
Get a value stored in LocalStorage.
```bash
get <key>
```

### set
Set a value in LocalStorage.
```bash
set <key> <value>
```