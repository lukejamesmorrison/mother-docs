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

```
light/color <Light|Group> <color>
```

You have access to the following colors which may be used in place of their RGB values:

|Name                                                   | RGB         | Hexidecimal   |
|---                                                    |---          | ---           |
|![red](https://img.shields.io/badge/red-FF0000)        |255,0,0      | FF0000        |
|![green](https://img.shields.io/badge/green-00FF00)    |0,255,0      | 00FF00        |
|![blue](https://img.shields.io/badge/blue-0000FF)      |0,0,255      | 0000FF        |
|![yellow](https://img.shields.io/badge/yellow-FFFF00)  |255,255,0    | FFFF00        |
|![orange](https://img.shields.io/badge/orange-FFA500)  |255,165,0    | FFA500        |
|![cyan](https://img.shields.io/badge/cyan-00FFFF)      |0,255,255    | 00FFFF        |
|![magenta](https://img.shields.io/badge/magenta-FF00FF)|255,0,255    | FF00FF        |
|![white](https://img.shields.io/badge/white-FFFFFF)    |255,255,255  | FFFFFF        |
|![black](https://img.shields.io/badge/black-000000)    |0,0,0        | 000000        |

#### Example

```ini
# by name
light/color LandingLight red
# by RGB
light/color LandingLight 255,0,0
```

### blink
Make a light blink at an interval in seconds.

```
light/blink <Light|Group> <interval> [--options]
```

You have access to several blinks which may be used instead of the value in seconds:

| Name         | Blink Interval (s)  | Blink Length (%)    | Blink Offset (%)  | Example                                                                 |
|--------------|:---------------:|:---------------:|:--------------------:|------------------------------------------------------------------------|
| `slow `        | 3             | 30            | 0                 | ![slow-red](Assets/Blinks/slow_blink_red.gif) ![slow-green](Assets/Blinks/slow_blink_green.gif) ![slow-blue](Assets/Blinks/slow_blink_blue.gif) |
| `med`          | 1             | 50            | 0                 | ![med-red](Assets/Blinks/med_blink_red.gif) ![med-green](Assets/Blinks/med_blink_green.gif) ![med-blue](Assets/Blinks/med_blink_blue.gif)     |
| `fast`         | 0.25          | 50            | 0                 | ![fast-red](Assets/Blinks/fast_blink_red.gif) ![fast-green](Assets/Blinks/fast_blink_green.gif) ![fast-blue](Assets/Blinks/fast_blink_blue.gif) |


#### Options

| Option  | Values     | Unit | Description                                                         |
| ------- | :----------: | ---- | ------------------------------------------------------------------- |
| `length` | 0 - 1 | int  | Set the blink length of the light. Default is 0.5 (50%). |
| `offset` | 0 - 1 | int  | Set the blink offset of the light. Default is 0 (0%). |

#### Example

```bash
# using preset
light/blink SignalLight slow

# using values and options
light/blink SignalLight 3 --length=0.3 --offset=0
```

### reset

Reset a light or group of lights to white and cease any blinking.

```
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