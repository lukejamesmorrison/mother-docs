# Cheatsheet

Commands and hooks belong to [Modules](Modules/Modules.md). Commands are executed via the Programmable Block terminal, while hooks are automated triggers defined in block Custom Data.

The following is a comprehensive reference for all commands and hooks available in the default modules.

[[toc]]

## Terminal Blocks (All Blocks)
[Terminal Block Module](Modules/Extension/TerminalBlockModule.md)

:::tip Tip
These commands and hooks work on all blocks accessible by Mother.
:::

::: tabs

@tab Commands

### block/on
Turn the block on.
```
block/on <Block|Group> [--options]
```

### block/off
Turn the block off.
```
block/off <Block|Group> [--options]
```

### block/action
Run a toolbar action on the block. This is more expensive than a traditional command and Malware advises against it. Use this command sparingly to access automations that Mother does not access natively.

```
block/action <Block|Group> <Action> <...ActionArgs>
```

**Example**

We want to run the Set and Move action on a piston.  It accepts two arguments: the `distance` to move and the `speed` of the piston. These values are entered in the same order you would normally enter them via the ingame menus.

```bash title="Terminal"
# set the piston to move to 5m distance at 2.5m/s
block/action DrillPiston SetAndMove 5.0 2.5;
```

  :::tip
  You can view a complete list of block actions [here](https://github.com/malware-dev/MDK-SE/wiki/List-Of-Terminal-Properties-and-Actions).
  :::

### block/config
Set a value in the block's custom data.

```
block/config <Block|Group> <Section.Key> <Value>
```

**Example**

Let's update the default scale of our `MapLCD`:

```bash title="Terminal"
# set the scale to 200m
block/config MapLCD general.mapScale 200
```

### tag/get
Get a all blocks with a specific tag. This will print a list of blocks to the terminal window.

```
tag/get <Tag>
```

**Example**

Let's get all blocks with the `#cockpit-displays` tag:

```text title="Terminal"
tag/get #cockpit-displays;
```

### tag/set

Set a tag on a block or group of blocks.

```
tag/set <Block|Group> <Tag>
```

**Example**

Let's tag our cockpit displays so that we can easily set them to night mode:
    
```text title="Terminal"
tag/set CockpitDisplays #cockpit-displays;
```

@tab Hooks

|Key        | Trigger                           |
|-          |-                                  |
| `onOn`    | Activated by `block/on` command   |
| `onOff`   | Activated by `block/off` command   |

**Example**

```ini title = "DrillPiston > Custom Data"
[hooks]
onOn=light/color DrillIndicatorLight green;
onOff=light/color DrillIndicatorLight red;
```
or

```ini title="Mother > Custom Data"
[hooks]
DrillPiston.onOn=light/color DrillIndicatorLight green;
"Emergency Batteries".onOff=light/blink "Battery Indicators" off;
```

:::

## Air Vents
[Air Vent Module](Modules/Extension/AirVentModule.md)

::: tabs

@tab Commands

### vent/pressurize

Set the air vent to pressurize mode.
```bash
vent/pressurize <AirVent|Group>
```

### vent/depressurize

Set the air vent to pressurize mode.
```bash
vent/depressurize <AirVent|Group>
```

@tab Hooks

|Key                | Trigger                               |
|-                  |-                                      |
| `onDepressurized`      | Activated when an air vent is in the *Depressurized* state.    |
| `onDepressurizing`       | Activated when an air vent is in the *Depressurizing* state.       |
| `onPressurized`       | Activated when an air vent is in the *Pressurized* state.       |
| `onPressurizing`       | Activated when an air vent is in the *Pressurizing* state.       |

**Example**

```ini title="AirlockVent > Custom Data"
[hooks]
onPressurized=light/color "Airlock Light" green; door/open "Inner Door";
onDepressurized=light/color "Airlock Light" red; door/open "Outer Door";
```

:::

## Batteries
[Battery Module](Modules/Extension/BatteryModule.md)

::: tabs

@tab Commands

### battery/charge
Set the battery to `Recharge` mode.
```
battery/charge <Battery|Group> [--options]
```

### battery/discharge
Set the battery to `Discharge` mode.
```
battery/discharge <Battery|Group> [--options]
```

### battery/auto
Set the battery to `Auto` mode.
```
battery/auto <Battery|Group> [--options]
```

### battery/toggle
Toggle the battery between `Auto`, `Recharge` and `Discharge` mode.
```
battery/toggle <Battery|Group> [--options]
```


:::

## Core

::: tabs

@tab Commands

### boot
Run the Mother OS boot sequence. This is automatically run when the Programmable Block is started, but can be run manually to reset the system.
```bash
boot
```

### help
Print all commands in the Programmable Block terminal.
```bash
help
```

### clear
Clear the Programmable Block terminal window.
```bash
clear
```

### ping
[Almanac](Modules/Core/Almanac.md)

Ping all grids on the network and update the Almanac.
```bash
ping
```

### wait
[Command Line Interface](CommandLineInterface.md)

Delay a command or routine for execution. This can be used remotely as well.

```bash
wait <seconds>
```

**Example**

```bash title="Terminal"
# Light turns red, then after 5 seconds, thew light turns green
light/color IndicatorLight red; wait 5; light/color IndicatorLight green;
```

### purge
[Almanac](Modules/Core/Almanac.md), [LocalStorage](Modules/Core/LocalStorage.md)

Purge modules of data.  This can be used to reset module data like the Almanac and LocalStorage.

```
purge <modules,> [--options]
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

```bash title="Terminal"
purge * --force
```

To purge specific modules, you can use the following command:

```bash title="Terminal"
purge almanac,storage --force
```

### dock
[Docking Module](Modules/Extension/DockingModule.md)

Dock with a grid and specify optional connectors.  If you do not provide a connector, the grids will automatically select the connectors to use. This is most useful when you are building drones, and utility vehicles with only one connector. 

```
dock <Grid Name> [--options]
```

Options
| Option  | Values  | Unit | Description                        |
| ------- | ------- | ---- | ---------------------------------- |
| `local` | string |   | The name of the connector you wish to use on the local grid. |
| `remote` | string |   | The name of the connector you wish to use on the remote grid. |

**Example**

We want to dock with a grid named `Mothership` using the local grid's connector named `MainConnector`, and the remote grid's connector named `Connector - MS.P1`.

```bash title="Terminal"
# Specify both connectors by name
dock Mothership --local=MainConnector --remote="Connector - MS.P1";

# If there is one connector on our grid, we only specify the remote connector
dock Mothership --remote="Connector - MS.P1";

# Or we let the grids decide which connectors to use
dock Mothership;
```

:::

## Cockpits
[Cockpit Module](Modules/Extension/CockpitModule.md)

::: tabs

@tab Commands

### dampeners/on
Turn on thrust dampeners. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
dampeners/on <Cockpit|Group>
```

**Example**

```bash title="Terminal"
# turn on the dampeners of the Main cockpit
dampeners/on

# turn on dampeners for a specific cockpit
dampeners/on RearCockpit
```

### dampeners/off
Turn off thrust dampeners. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
dampeners/off <Cockpit|Group>
```

**Example**

```bash title="Terminal"
# turn off the dampeners of the Main cockpit
dampeners/off

# turn off dampeners for a specific cockpit
dampeners/off RearCockpit
```

### handbrake/on

Turn on the handbrake. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
handbrake/on <Cockpit|Group>
```
**Example**

```bash title="Terminal"
# turn on the handbrake of the Main cockpit
handbrake/on
# turn on handbrake for a specific cockpit
handbrake/on RearCockpit
```

### handbrake/off

Turn off the handbrake. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
handbrake/off <Cockpit|Group>
```

**Example**

```bash title="Terminal"
# turn off the handbrake of the Main cockpit
handbrake/off
# turn off handbrake for a specific cockpit
handbrake/off RearCockpit
```

@tab Hooks

|Key                | Trigger                               |
|-                  |-                                      |
| `onOccupied`          | Run when a Cockpit is occupied by a player.         |
| `onEmpty`        | Run when a Cockpit is empty of players.        |

**Example**

```ini title="MainCockpit > Custom Data"
[hooks]
onDampenersOn=light/color "Dampener Indicator" green;
onDampenersOff=light/color "Dampener Indicator" red;
```

:::

## Connectors
[Connector Module](Modules/Extension/ConnectorModule.md)

::: tabs

@tab Commands

### connector/lock
Lock a connector or group of connectors.
```
connector/lock <Connector|Group>
```

### connector/unlock
Unlock a connector or group of connectors.
```
connector/unlock <Connector|Group>
```

### connector/toggle
Toggle the lock state of a connector or group of connectors.
```bash
connector/toggle <Connector|Group>
```

@tab Hooks

|Key                | Trigger                                       |
|-                  |-                                              |
| `onLock`          | Run when a connector locks.         |
| `onUnlock`        | Run when a connector unlocks.        |
| `onReady`         | Run when a connector is ready to lock.     |

**Example**

```ini title="DockConnector > Custom Data"
[hooks]
onLock=light/color "Dock Light" red;
onUnlock=light/color "Dock Light" green;
```
or

```ini title="Mother > Custom Data"
[hooks]
DockConnector.onUnlock=light/color "Dock Light" green;
"Fuel Connector".onLock=tank/stockpile FuelTanks;
```

:::

## Displays
[Display Module](Modules/Extension/DisplayModule.md)

::: tabs

@tab Commands

### screen/bgcolor

Set the background color of the screen using RGB values.

```
screen/bgcolor <Screen|Group> <Color>
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

**Example**

Imagine we want to change to background color of our airlock screen.

```bash title="Terminal"
# Normal LCD
screen/bgcolor "AirlockStatusScreen" red;

# Cockpit LCD
screen/bgcolor "PilotCockpit:1" red;
```

### screen/color

Set the color of the text on the screen using RGB values.

```
screen/color <Screen|Group> <Color>
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

**Example**

Imagine we want to change to color of our airlock screen.

```bash title="Terminal"
# Normal LCD
screen/color "AirlockStatusScreen" green;

# Cockpit LCD
screen/color "PilotCockpit:1" green;
```

### screen/print

Print a message to an LCD panel or group of panels.

```
screen/print <Screen|Group> <Message> <Options>
```

Options
| Option  | Values      | Unit  | Description                                                           |
| ------- | ----------  | ----  | -------------------------------------------------------------------   |
| `color` | RGB         |       | Set the color of the text.                                            |
| `size`  | Number    |       | Set the text size between 0.0 and 10.0.                                 |

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

**Example**

Imagine we want to print text to a screen based on our airlock status.  We contextualize it further with color and print a size that is easily legible.

```ini title="Terminal"
; with color name
screen/print "AirlockStatusScreens" "Airlock SAFE" --color=green --size=4.4;

; with RGB value
screen/print "AirlockStatusScreens" "Airlock SAFE" --color=0,255,0 --size=4.4;

; Cockpit LCD
screen/print "PilotCockpit:1" "ALERT" --color=red --size=10;
```


:::

## Doors
[Door Module](Modules/Extension/DoorModule.md)

::: tabs

@tab Commands

### door/open
Open a door or group of doors.
```
door/open <Door|Group>
```

### door/close
Close a door or group of doors.
```
door/close <Door|Group>
```

### door/toggle
Toggle the open state of a door or group of doors.
```bash
door/toggle <Door|Group>
```

@tab Hooks

|Key            | Trigger                               |
|-              |-                                      |
| `onOpen`      | Activated when a door is fully open.      |
| `onOpening`    | Activated when a door is opening.    |
| `onclose`     | Activated when a door is fully closed.    |
| `onClosing`   | Activated when a door is closing.    |

**Example**

```ini title="OuterDoor > Custom Data"
[hooks]
onOpen=wait 10; door/close this;
onClose=vent/pressurize AirlockVent; wait 2; light/blink "Airlock Light" off;
```

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

:::

## Flight Control System
[Flight Control Module](Modules/Extension/FlightControlModule.md)

::: tabs

@tab Commands

### fcs/start
Engage the autopilot system, enabling the grid to fly autonomously if a [flight plan](Modules/Extension/FlightPlanningModule.md) is loaded.
```
fcs/start [--options]
```
Options
<!-- table of cli options -->
| Option  | Values  | Unit | Description                        |
| ------- | ------- | ---- | ---------------------------------- |
| `speed` | 0 - max | m/s  | Set the maximum speed of the grid. |

### fcs/stop
Disengage the autopilot system, halting the grid.

```
fcs/stop
```


:::

## Flight Planning

[Flight Planning Module](Modules/Extension/FlightPlanningModule.md)

::: tabs

@tab Commands

### nav/set-flight-plan

Set the active flight plan in the navigation system. Combine with [`fcs/start`](#flight-control-system) to begin flying.

```
nav/set-flight-plan <FlightPlanString> [--options]
```

### fp/clear

Clear the current flight plan from the navigation system.

```
fp/clear
```


:::

## Gas Tanks
[Gas Tank Module](Modules/Extension/GasTankModule.md)

::: tabs

@tab Commands

### tank/stockpile
Set the Tank `Stockpile` to `on`.
```
tank/stockpile <Tank|Group> [--options]
```

### tank/share
Set the Tank `Stockpile` to `off`. The tank is now sharing its contents with your grid.
```
tank/share <Tank|Group> [--options]
```

### tank/toggle
Toggle the Tank `Stockpile` between `on` and `off`.
```
tank/toggle <Tank|Group> [--options]
```


:::

## Gyroscopes
[Gyroscope Module](Modules/Extension/GyroscopeModule.md)

::: tabs

@tab Commands

### gyro/face
Face the grid towards a **GPS Waypoint**.
```
gyro/face <GPS Waypoint>
```

**Example**

```text title="Terminal"
gyro/face GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:
```


:::

## Hinges
[Hinge Module](Modules/Extension/HingeModule.md)

::: tabs

@tab Commands

### hinge/rotate
Rotate a hinge or group of hinges to a specific angle between -90 degrees and 90 degrees.
```
hinge/rotate <Hinge|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `speed` | [-5.0, 5.0] | RPM  | Set the speed of the hinge. Negative values will reverse the hinge. Default is 1 RPM. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided angle should be *added* to the current angle. Allows incremental changes to angle. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided angle should be *subtracted* from the current angle. Allows decremental changes to angle. |

### hinge/lock
Lock a hinge or group of hinges.
```
hinge/lock <Hinge|Group>
```
Options
<!-- table of cli options -->
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the hinge's velocity to 0 when locking. |

### hinge/unlock
Unlock a hinge or group of hinges.
```
hinge/unlock <Hinge|Group>
```

### hinge/reset
Reset a hinge or group of hinges to their original position (0 degrees).
```
hinge/reset <Hinge|Group>
```

### hinge/speed
Set the speed of a hinge or group of hinges in RPM.
```
hinge/speed <hinge|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `free`  | `true`, `false` | `bool `    | Indicates whether the hinge should be free to rotate or not. Default is `false`. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided speed should be *added* to the current speed. Allows incremental changes to speed. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental changes to speed. |

@tab Hooks

|Key                | Trigger                               |
|-                  |-                                      |
| `onMoving`      | Activated when a hinge is put into motion by the [`hinge/rotate`](#rotate) command.    |
| `onStop`      | Activated when a hinge stops from the [`hinge/rotate`](#rotate) command.      |

**Example**

```ini title="DoorHinge > Custom Data"
[hooks]
onMoving=light/color "Hinge Indicator" green;
onStop=light/color "Hinge Indicator" red;
```

:::

## Landing Gear
[Landing Gear Module](Modules/Extension/LandingGearModule.md)

::: tabs

@tab Commands

### gear/lock
Lock a Landing Gear or group of Landing Gear.
```bash
gear/lock <LandingGear|Group>
```

### gear/unlock
Unlock a Landing Gear or group of Landing Gear.
```bash
gear/unlock <LandingGear|Group>
```

### gear/toggle
Toggle the lock state of a Landing Gear or group of Landing Gear between `Locked` nad `Unlocked`.
```
gear/toggle <LandingGear|Group>
```

  ::: note
  For more info about Landing Gear states, see [LandingGearMode](https://github.com/malware-dev/MDK-SE/wiki/SpaceEngineers.Game.ModAPI.Ingame.LandingGearMode) in MDK-SE.
  :::

### gear/auto
Set the AutoLock state of a Landing Gear or group of Landing Gear.
```
gear/auto <LandingGear|Group> <true|false>
```

@tab Hooks

|Key                | Trigger                               |
|-                  |-                                      |
| `onLock`          | Run when a landing gear block locks.       |
| `onUnlock`        | Run when a landing gear block unlocks.     |
| `onReady`         | Run when a landing gear block is ready to lock.     |

**Example**

```ini title="MainGear > Custom Data"
[hooks]
onLock=light/color "Landing Light" green;
onUnlock=light/color "Landing Light" red;
```

:::

## Lights
[Light Module](Modules/Extension/LightModule.md)

::: tabs

@tab Commands

### light/color

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

**Example**

```bash title="Terminal"
# by name
light/color LandingLight red;
# by RGB
light/color LandingLight 255,0,0;
```

### light/blink
Make a light blink at an interval in seconds.

```
light/blink <Light|Group> <interval> [--options]
```

You have access to several blinks which may be used instead of the value in seconds:

| Name         | Blink Interval (s)  | Blink Length (%)    | Blink Offset (%)  | Example                                                                 |
|--------------|:---------------:|:---------------:|:--------------------:|------------------------------------------------------------------------|
| `off `        | 0             | 0            | 0                 | ![off-red](Assets/Blinks/off_blink_red.gif) ![off-green](Assets/Blinks/off_blink_green.gif) ![off-blue](Assets/Blinks/off_blink_blue.gif) |
| `slow `        | 3             | 30            | 0                 | ![slow-red](Assets/Blinks/slow_blink_red.gif) ![slow-green](Assets/Blinks/slow_blink_green.gif) ![slow-blue](Assets/Blinks/slow_blink_blue.gif) |
| `med`          | 1             | 50            | 0                 | ![med-red](Assets/Blinks/med_blink_red.gif) ![med-green](Assets/Blinks/med_blink_green.gif) ![med-blue](Assets/Blinks/med_blink_blue.gif)     |
| `fast`         | 0.25          | 50            | 0                 | ![fast-red](Assets/Blinks/fast_blink_red.gif) ![fast-green](Assets/Blinks/fast_blink_green.gif) ![fast-blue](Assets/Blinks/fast_blink_blue.gif) |


#### Options

| Option  | Values     | Unit | Description                                                         |
| ------- | :----------: | ---- | ------------------------------------------------------------------- |
| `length` | 0 - 1 | int  | Set the blink length of the light. Default is 0.5 (50%). |
| `offset` | 0 - 1 | int  | Set the blink offset of the light. Default is 0 (0%). |

**Example**

```bash title="Terminal"
# using preset
light/blink SignalLight slow;

# using values and options
light/blink SignalLight 3 --length=0.3 --offset=0;
```
### light/intensity

Set the intensiity of a light or group of lights. The intensity is a value between 0 and 1, where 0 is off and 1 is full brightness.

```
light/intensity <Light|Group> <Intensity> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `add` | `true`, `false` | `bool`  | Indicates that the intensity should be *added* to the current intensity. Allows incremental changes to intensity. |
| `sub` | `true`, `false` | `bool`  | Indicates that the intensity should be *subtracted* from the current intensity. Allows decremental changes to intensity. |

### light/reset

Reset a light or group of lights to white and cease any blinking.

```
light/reset <Light|Group>
```


:::

## Local Storage

::: tabs

@tab Commands

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

  ::: note
  The `set` command provides no practical use to players at this time.
  :::

:::

## Pistons
[Piston Module](Modules/Extension/PistonModule.md)

::: tabs

@tab Commands

### piston/distance
Extend or retract a piston to a specific distance.
```
piston/distance <Piston> <Distance> [--options]
```

  ::: note
  Small grid pistons have a maximum distance of **2 meters**, while large grid pistons have a maximum distance of **10 meters**.
  :::

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `add` | `true`, `false` | `bool`  | Indicates that the distance should be *added* to the current distance. Allows incremental changes to distance. |
| `sub` | `true`, `false` | `bool`  | Indicates that the distance should be *subtracted* from the current distance. Allows decremental changes to distance. |

### piston/stop
Stop a piston while in motion. Note that pistons do not lock like a Rotor or Hinge.
```
piston/stop <Piston|Group>
```

### piston/reset
Reset a piston to its original position (0 meters).
```
piston/reset <Piston>
```

### piston/speed
Set the speed of a piston or group of pistons in m/s.
```
piston/speed <piston|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `add` | `true`, `false` | `bool`  | Indicates that the provided speed should be *added* to the current speed. Allows incremental changes to speed. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental changes to speed. |

@tab Hooks

|Key            | Trigger                               |
|-              |-                                      |
| `onExtending`      | Activated when a piston is extending.    |
| `onExtended`      | Activated when a piston is fully extended.      |
| `onRetracting`     | Activated when a piston is retracting.    |
| `onRetracted`   | Activated when a piston is fully retracted.    |


**Example**

Imagine our piston is connected to a fuel boom:

```ini title="FuelBoomPiston > Custom Data"
[hooks]
onExtending=light/blink "Fuel Boom Light" fast;
onRetracted=light/blink "Fuel Boom Light" off;
```

:::

## Programmable Block
[Programmable Block Module](Modules/Extension/ProgrammableBlockModule.md)

::: tabs

@tab Commands

### pb/run
Run a programmable block with an optional argument.

```
pb/run <ProgrammableBlock|Group> <argument> [--options]
```

**Example**

We have [Whip's Subgrid Thruster Manager](https://steamcommunity.com/sharedfiles/filedetails/?id=757123653) installed on another Programmable block named `PB.ThrusterManager`. It is particularly helpful when using thrusters on subgrids.
```ini title="Terminal"
pb/run "PB.ThrusterManager" dampeners_on;
```


:::


## Rotors
[Rotor Module](Modules/Extension/RotorModule.md)

::: tabs

@tab Commands

### rotor/rotate
Rotate a rotor or group of rotors to a specific angle between -360 and 360 degrees. 
```
rotor/rotate <Rotor|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                                             |
| ------- | ---------- | ---- | -------------------------------------------------------------------                     |
| `speed` | [-5.0, 5.0] | RPM  | Set the speed of the rotor. Negative values will reverse the hinge. Default is 1 RPM. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided angle should be *added* to the current angle. Allows incremental changes to angle. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided angle should be *subtracted* from the current angle. Allows decremental changes to angle. |


### rotor/lock
Lock a rotor or group of rotors.
```
rotor/lock <Rotor|Group>
```
Options
<!-- table of cli options -->
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the rotor's velocity to 0 when locking. |

### rotor/unlock
Unlock a rotor or group of rotors.
```
rotor/unlock <Rotor|Group>
```

### rotor/reset
Reset a rotor or group of rotors to their original position (0 degrees).
```
rotor/reset <Rotor|Group>
```

### rotor/speed
Set the speed of a rotor or group of rotors in RPM.
```
rotor/speed <Rotor|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `free`  | `true`, `false` | `bool `    | Indicates whether the rotor should be free to rotate or not. Default is `false`. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided speed should be *added* to the current speed. Allows incremental changes to speed. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental changes to speed. |

@tab Hooks

|Key            | Trigger                               |
|-              |-                                      |
| `onMoving`      | Activated when a rotor is put into motion by the [`rotor/rotate`](#rotate) command.    |
| `onStop`      | Activated when a rotor stops from the [`rotor/rotate`](#rotate) command.      |

**Example**

```ini title="TurretRotor > Custom Data"
[hooks]
onLock=light/color "Turret Status" red;
onUnlock=light/color "Turret Status" green;
```

:::


## Screens
See the [Displays](#displays) section above.

## Sensors

::: tabs

@tab Hooks

|Key                | Trigger                                       |
|-                  |-                                              |
| `onDetect`          | Run when a Sensor block detects an entity.       |
| `onClear`        | Run when a Sensor block does not detect an entity.     |

**Example**

Imagine our Sensor has a status light we want to view elsewhere:

```ini title="LandingPadSensor > Custom Data"
[hooks]
onDetect=light/blink "Landing Pad Light" fast;
onClear=light/blink "Landing Pad Light" off;
```

:::

## Sorters
[Sorter Module](Modules/Extension/SorterModule.md)

::: tabs

@tab Commands

### sorter/drain
Set the drain all state of the sorter or group of sorters.
```
sorter/drain <Sorter|Group> true|false
```

**Example**

Turn on `DrainAll`
```bash title="Terminal"
sorter/drain "Gravel Exhaust" true
```

Turn off `DrainAll`
```bash title="Terminal"
sorter/drain VerticalFarmHarvester false
```

:::

## Sound Blocks
[Sound Block Module](Modules/Extension/SoundBlockModule.md)

::: tabs

@tab Commands

### sound/play

Play the sound block with an optional sound.
```bash
# play the block
sound/play <SoundBlock|Group>

# play the block with a specific sound
sound/play <SoundBlock|Group> <sound>
```

See the [`set`](#set) command for a list of available sounds.

### sound/stop

Stop the sound block from playing.
```ini
sound/stop <SoundBlock|Group>
```

### sound/set

Set the sound of the sound block.

```
sound/set <SoundBlock|Group> <sound>
```

You may use the sound as it appears in the sound block list or, for default sounds, using their ID below.

**Default Sounds**

| ID                                                 ||                      |                         |
|---------------------------|---------------------------|---------------------------|---------------------------|
| SoundBlockLightsOn        | SoundBlockLightsOff       | SoundBlockEnemyDetected   | SoundBlockObjectiveComplete |
| SoundBlockAlert1          | SoundBlockAlert2          | SoundBlockAlert3          | DroneLoopSmall            |
| DroneLoopMedium           | DroneLoopLarge            | DroneLoopHuge             | MusCalm_01                |
| MusCalm_02               | MusCalm_03               | MusCalm_04               | MusCalm_05                |
| MusCalm_06               | MusCalm_07               | MusCalm_08               | MusCalm_09                |
| MusCalm_10               | MusCalm_11               | MusCalm_12               | MusCalm_13                |
| MusMystery_01            | MusMystery_02            | MusMystery_03            | MusMystery_04             |
| MusMystery_05            | MusMystery_06            | MusMystery_07            | MusMystery_08             |
| MusBuild_01              | MusBuild_02              | MusBuild_03              | MusBuild_04               |
| MusBuild_05              | MusBuild_06              | MusBuild_07              | MusSpace_01               |
| MusSpace_02              | MusSpace_03              | MusSpace_04              | MusSpace_05               |
| MusSpace_06              | MusSpace_07              | MusSpace_08              | MusSpace_09               |
| MusSpace_10              | MusSpace_11              | MusSpace_12              | MusLightFight_01          |
| MusLightFight_02         | MusLightFight_03         | MusLightFight_04         | MusLightFight_05          |
| MusLightFight_06         | MusLightFight_07         | MusLightFight_08         | MusLightFight_09          |
| MusLightFight_10         | MusLightFight_11         | MusLightFight_12         | MusLightFight_13          |
| MusLightFight_14         | MusHeavyFight_01         | MusHeavyFight_02         | MusHeavyFight_03          |
| MusHeavyFight_04         | MusHeavyFight_05         | MusHeavyFight_06         | MusHeavyFight_07          |
| MusHeavyFight_08         | MusHeavyFight_09         | MusHeavyFight_10         | MusHeavyFight_11          |
| MusHeavyFight_12         | MusHeavyFight_13         | MusHeavyFight_14         | MusDanger_01              |
| MusDanger_02             | MusDanger_03             | MusDanger_04             | MusDanger_05              |
| MusDanger_06             | MusEarthlike_01          | MusEarthlike_02          | MusEarthlike_03           |
| MusEarthlike_04          | MusEarthlike_05          | MusEarthlike_06          | MusPlanet_01              |
| MusPlanet_02             | MusPlanet_03             | MusPlanet_04             | MusPlanet_05              |
| MusPlanet_06             | MusAlien_01              | MusAlien_02              | MusAlien_03               |
| MusAlien_04              | MusAlien_05              | MusFun                   | MusComp_01                |
| MusComp_02               | MusComp_03               | MusComp_04               | MusComp_05                |
| MusComp_06               | MusComp_07               | MusComp_08               | MusComp_09                |
| MusComp_10               | MusComp_11               | MusComp_12               | MusComp_13                |
| MusComp_14               | MusComp_15               | MusComp_16               | MusComp2_01               |
| MusComp2_02              | MusComp2_03              | MusComp2_04              | MusComp2_05               |
| MusComp2_06              | MusComp2_07              | MusComp2_08              | MusComp2_09               |
| MusComp2_10              | MusComp2_11              | MusComp2_12              | MusComp2_13               |
| MusComp2_14              | MusComp2_15              | MusComp2_16              | MusConcert_2              |
| MusConcert_3             | MusConcert_4             | MusConcert_5             | MusConcert_6              |
| MusConcert_7             | MusConcert_8             | MusConcert_9             | MusConcert_10             |


**Example**

```bash title="Terminal"
# default sound with sound id
sound/set MainSpeaker MusDanger_04;
# default sound with ingame name
sound/set MainSpeaker "Danger Music 04";

# other sound
sound/play MainSpeaker "Space Funk";
```

:::

## Thrusters
[Thruster Module](Modules/Extension/ThrusterModule.md)

::: tabs

@tab Commands

### thruster/thrust
Set the thrust of a thruster or group of thrusters.
```
thruster/thrust <Thruster|Group> <valuePercent|valueNetwons> [--options]
```

  ::: important
  The command expects a value in **percent** by default.  To use Newtons, ensure you follow the value with an `N`. 
  :::

**Example**
```bash title="Terminal"
# Set the thruster's thruster override to 100%
thruster/thrust MainThruster 100;

# Set the thruster's thrust override to 10,000 Newtons
thruster/thrust MainThruster 10000N;
```


:::

## Timer Blocks
[Timer Block Module](Modules/Extension/TimerBlockModule.md)

::: tabs

@tab Commands

### timer/start
Start execution for a timer block or group of timer blocks
```
timer/start <Block|Group> [--options]
```

### timer/trigger
Trigger the immediate execution of a timer block or group of timer blocks.
```
timer/trigger <Block|Group> [--options]
```

### timer/stop
Stop execution of a timer block or group of timer blocks.

```
timer/stop <TimerBlock|Group> [--options]
```


:::




