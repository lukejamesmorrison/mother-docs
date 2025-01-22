# Navigation Module

## Flight Planning

Mother has a built-in flight planning system that allows you to dynamical assign flight plans to your grid. You may fly to GPS Waypoints, and grids in the Almanac via a simple interface. In cooperation with the [Flight Control Module](FlightControlModule.md), we are leveraging the Remote Control block for waypoint management and autopilot.

Let's start with reviewing the GPS Waypoint system. A **GPS Waypoint** has 6 parts, which are separated by colons `:`

```bash
<Identifier>:<Name>:<X>:<Y>:<Z>:<Color>:
```

|Name|Format |Description|
|-|-|-|
|`Identifier`| string = **GPS**| The identifier showing that this is a GPS waypoint. |
|`Name`| string | The name of the waypoint. |
|`X`| float | The X coordinate of the waypoint. |
|`Y`| float | The Y coordinate of the waypoint. |
|`Z`| float | The Z coordinate of the waypoint. |
|`Color`| string | The color of the waypoint in hexidecimal format, with transparency [Learn more](https://www.quackit.com/css/color/values/css_hex_color_notation_8_digits.cfm#:~:text=Syntax,alpha%20chanel%20of%20the%20color.). |


We use this format since at any time, a player may copy a GPS waypoint to their clipboard via the GPS Panel in the terminal. This simplifies the process of setting a flight plan considerably - copy, paste, fly.

![Copy GPS to Clipboard](../../Assets/terminal-gps-1.png)

### Setting a Flight Plan

Here is an example GPS waypoint, `TopSecretBase`:

```bash
GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:
```

To chart a course to this waypoint, we can set it as Mother's current flight plan:

```bash
nav/set-flight-plan "GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:"
```

If we wanted to fly to a `Midpoint`, before proceeding to the `TopSecretBase`, we can simply add the term to our flight plan, separated by a space:

```bash
nav/set-flight-plan "GPS:Midpoint:190.12:-54.45:45.89:#FF75C9F1: GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:"
```

If this is a long flight plan, it is most intuitive to store the command in the Programmable Block's **CustomData**:

```ini
[Commands]

set-route-1=
| nav/set-flight-plan 
| "GPS:Midpoint:190.12:-54.45:45.89:#FF75C9F1: 
| GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:"
```

Under the hood, Mother will monitoring and update progress towards each waypoint, interfacing with the grid's Remote Control block. When a flight plan is created, GPS waypoints will be added automatically to the [Almanac](../Core/Almanac.md), and you may use them by name in subsequent flight planning.

Next time we want to run the flight plan we can shorten it:

```bash
nav/set-flight-plan "Midpoint TopSecretBase"
```
> Use the `nav/set-flight-plan` and `fcs/start` commands together to set the flight plan and begin autopilot immediately.

---
### Modifiers

A flight plan may be modified with the following options, as the last term in the flight plan string:

<!-- table -->
| Option | Name | Description |
|:---:| --- | --- |
| `R` | Roundtrip | The grid will fly the flight plan in reverse after reaching the last waypoint. |
| `C` | Continuous | The grid will fly the flight plan in a continuous loop, back and forth, without stopping. |

An example of a roundtrip flight plan:

```bash
# Fly to Midpoint, then TopSecretBase, then return to Midpoint
nav/set-flight-plan "GPS:Midpoint:190.12:-54.45:45.89:#FF75C9F1: GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1: R"
```

### Loading a Flight Plan
[![Loading a Flight Plan](https://img.youtube.com/vi/jFMLTiwC3Sg/0.jpg)](https://www.youtube.com/watch?v=jFMLTiwC3Sg)

## Commands

### set-flight-plan
Set the active flight plan in the navigation system. Combine with [`fcs/start`](#flight-control-system) to initiate autopilot.
```
nav/set-flight-plan <FlightPlanString> [--options]
```

<!-- ## Actions

Let's go further. Flying a route isn't always enough. Sometimes we need to perform actions at each waypoint.  This is where Actions come in.  We can instruct a grid to perform an action at each waypoint, such as running a command.

```bash
# Fly to TargetPosition and deploy solar panels
nav/set-flight-plan "GPS:TargetPosition:190.12:-54.45:45.89:#FF75C9F1:?command=DeploySolarPanels";
```

Where the `DeploySolarPanels` command is a custom routine that actuates rotors and hinges.

```bash
# DeploySolarPanels
hinge/rotate SolarPanelArrayHinges 0; rotor/rotate SolarPanelArrayRotors 135;
``` -->
