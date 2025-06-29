# Piston Module

The piston module allows the user to control pistons on the grid.  Pistons are particularly vulnerable to phantom forces and the Almighty Clang, so we leverage the Activity Monitor to ensure pistons are stopped when not in use. Players can simply define a distance and speed without worrying about upper/lower limits.

[[toc]]

## Commands

### distance
Extend or retract a piston to a specific distance between 0 and `Max` meters.
```
piston/distance <Piston|Group> <Distance> [--options]
```

::: note
Small grid pistons have a maximum distance of 2 meters, while large grid pistons have a maximum distance of 10 meters.
:::

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `add` | `true`, `false` | `bool`  | Indicates that the distance should be *added* to the current distance. Allows incremental changes to distance. |
| `sub` | `true`, `false` | `bool`  | Indicates that the distance should be *subtracted* from the current distance. Allows decremental changes to distance. |

**Example**

Extend the turret pistons to 5 meters:
```bash title="Terminal"
piston/distance TurretPistons 5;
```

Decrease the distance of the turret pistons by 1 meter:
```bash title="Terminal"
piston/distance TurretPistons 1 --sub; 
```

### stop
Stop a piston while in motion. Note that pistons do not lock like a Rotor or Hinge.
```
piston/stop <Piston|Group>
```

**Example**
```bash title="Terminal"
piston/stop TurretPistons;
```

### reset
Reset a piston to its original position (0 meters).
```
piston/reset <Piston|Group>
```

**Example**
```bash title="Terminal"
piston/reset TurretPistons;
```

### speed
Set the speed of a piston or group of pistons in m/s.
```
piston/speed <piston|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `add` | `true`, `false` | `bool`  | Indicates that the provided speed should be *added* to the current speed. Allows incremental changes to speed. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental changes to speed. |

#### Examples
Set speed to 0.5 m/s:

```bash title="Terminal"
piston/speed TurretPistons 0.5;
```

Increase speed by 0.2 m/s:

```bash
piston/speed TurretPistons 0.2 --add;
```

Decrease speed by 0.1 m/s:

```bash
piston/speed TurretPistons 0.1 --sub;
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

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

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

or
```ini title="Mother > Custom Data"
[hooks]
FuelBoomPiston.onExtending=
| light/blink "Fuel Boom Light" fast;

"Landing Gear Pistons".onRetracted=
| wait 2; 
| hinge/rotate "Landing Gear Hinges" 0;
```

<!--- 

PISTON ACTIONS


Add Top Part
DecreaseChangeIntervalSlider
DecreaseFontSize
DecreaseLowerLimit
DecreaseMaxImpulseAxis
DecreaseMaxImpulseNonAxis
DecreaseSafetyDetach
DecreaseTextPaddingSlider
DecreaseUpperLimit
DecreaseVelocity
DecreaseWeld speed
Extend
Force weld
IncreaseChangeIntervalSlider
IncreaseFontSize
IncreaseLowerLimit
IncreaseMaxImpulseAxis
IncreaseMaxImpulseNonAxis
IncreaseSafetyDetach
IncreaseTextPaddingSlider
IncreaseUpperLimit
IncreaseVelocity
IncreaseWeld speed
OnOff
OnOff_Off
OnOff_On
PreserveAspectRatio
ResetVelocity
Retract
Reverse
SetAndMove
SetVelocity
ShareInertiaTensor
ShowOnHUD
ShowOnHUD_Off
ShowOnHUD_On



--->

<!--- markdown table with columns for subsequent parameters and options --->

<!---
Labels are uneccesary but may be added as the last parameter.


| Action							| Param 1	| Param 2	| Param 3 | Param 4 | Param 5 |
|-----------						|---------	|---------	|---------|---------|---------|
| "Add Top Part"					|			|			|         |         |         |
| DecreaseChangeIntervalSlider		|			|			|         |         |         |
| DecreaseFontSize					|			|			|         |         |         |
| DecreaseLowerLimit				|			|			|         |         |         |
| DecreaseMaxImpulseAxis			|			|			|         |         |         |
| DecreaseMaxImpulseNonAxis			|			|			|         |         |         |
| DecreaseSafetyDetach				|			|			|         |         |         |
| DecreaseTextPaddingSlider			|			|			|         |         |         |
| DecreaseUpperLimit				|			|			|         |         |         |
| DecreaseVelocity					|			|			|         |         |         |
| DecreaseWeld speed				|			|			|         |         |         |
| Extend							|			|			|         |         |         |
| Force weld						|			|			|         |         |         |
| IncreaseChangeIntervalSlider		|			|			|         |         |         |
| IncreaseFontSize					|			|			|         |         |         |
| IncreaseLowerLimit				|			|			|         |         |         |
| IncreaseMaxImpulseAxis			|			|			|         |         |         |
| IncreaseMaxImpulseNonAxis			|			|			|         |         |         |
| IncreaseSafetyDetach				|			|			|         |         |         |
| IncreaseTextPaddingSlider			|			|			|         |         |         |
| IncreaseUpperLimit				|			|			|         |         |         |
| IncreaseVelocity					|			|			|         |         |         |
| IncreaseWeld speed				|			|			|         |         |         |
| OnOff								|			|			|         |         |         |
| OnOff_Off							|			|			|         |         |         |
| OnOff_On							|			|			|         |         |         |
| PreserveAspectRatio				|			|			|         |         |         |
| ResetVelocity						|			|			|         |         |         |
| Retract							|			|			|         |         |         |
| Reverse							|			|			|         |         |         |
| SetAndMove						| distance (+1.2)		| velocity (+/-2.5)	|  Label        |         |         |
| SetVelocity						| velocity (+/-2.5)		|			        |               |         |         |
| ShareInertiaTensor				|			            |			        |               |         |         |
| ShowOnHUD							|			|			|         |         |         |
| ShowOnHUD_Off						|			|			|         |         |         |
| ShowOnHUD_On						|			|			|         |         |         |
--->