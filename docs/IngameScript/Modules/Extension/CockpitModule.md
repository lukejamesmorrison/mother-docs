# Cockpit Module

The Cockpit module allows the user to control cockpits on the grid and access thrust dampeners, handbrakes, and more.

[[toc]]

## Commands

### dampeners/on
Turn on thrust dampeners. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
dampeners/on <Cockpit|Group>
```

**Example**

```ms title="Terminal"
; turn on the dampeners of the Main cockpit
dampeners/on

; turn on dampeners for a specific cockpit
dampeners/on RearCockpit
```

### dampeners/off
Turn off thrust dampeners. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
dampeners/off <Cockpit|Group>
```

**Example**

```ms title="Terminal"
; turn off the dampeners of the Main cockpit
dampeners/off

; turn off dampeners for a specific cockpit
dampeners/off RearCockpit
```

### handbrake/on

Turn on the handbrake. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
handbrake/on <Cockpit|Group>
```
**Example**

```ms title="Terminal"
; turn on the handbrake of the Main cockpit
handbrake/on
; turn on handbrake for a specific cockpit
handbrake/on RearCockpit
```

### handbrake/off

Turn off the handbrake. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
handbrake/off <Cockpit|Group>
```

**Example**

```ms title="Terminal"
; turn off the handbrake of the Main cockpit
handbrake/off
; turn off handbrake for a specific cockpit
handbrake/off RearCockpit
```


<!-- ### toggle
Toggle the lock state of a Cockpit or group of Cockpits.

```
Cockpit/toggle <Cockpit|Group>
``` -->
<!-- 
**Example**

```ms title="Terminal"
Cockpit/toggle DockingCockpit
``` -->

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`dampeners == 0`), while a predicate stands alone (`occupied`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

These work on cockpits and any other ship controller.

| Property | Description |
|-|-|
| `occupied` | `1` when a player is in control, `0` when not. |
| `dampeners` | `1` when inertial dampeners are on, `0` when off. |
| `handbrake` | `1` when the handbrake is on, `0` when off. |

| Predicate | True when |
|-|-|
| `occupied` | A player is in control. |
| `empty` | No player is in control. |

`dampeners` and `handbrake` have no predicate. Compare them to `1` (on) or `0` (off).

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
DampenersOff=
| when "Pilot Cockpit" dampeners == 0;
|   light/color "Warning Light" yellow;
| else;
|   light/color "Warning Light" green;
```

**Use a predicate**

```ms title="Mother > Custom Data"
[rules]
CabinLights=
| when "Pilot Cockpit" occupied;
|   block/on "Cabin Lights";
| else;
|   block/off "Cabin Lights";
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onOccupied`          | Run when a Cockpit is occupied by a player.         |
| `onEmpty`        | Run when a Cockpit is empty of players.        |

**Example**

When we enter the cockpit, let's ensure our batteries are on auto and our lights are on.

```ms title="RearCockpit > Custom Data"
[hooks]
onOccupied=battery/auto Batteries; block/on SignalLights;
onEmpty=block/off SignalLights;
```
or

```ms title="Mother > Custom Data"
[hooks]
RearCockpit.onOccupied=battery/auto Batteries; block/on SignalLights;
"Drill Cockpit".onEmpty=block/off MainDrills;
```

