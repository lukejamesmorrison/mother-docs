# Air Vent Module
<!-- [< Modules](../Modules.md) -->

The air vent module allows players to control air vents for uses like airlocks and oxygen capture.

[[toc]]

## Commands

### pressurize

Set the air vent to pressurize mode.
```ini 
vent/pressurize <AirVent|Group>
```

**Example**
```ini title="Terminal"
vent/pressurize AirlockAirVent
```

### depressurize

Set the air vent to pressurize mode.
```ini
vent/depressurize <AirVent|Group>
```

**Example**
```ini title="Terminal"
vent/depressurize "Atmosphere Intake Fan"
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key            | Trigger                               |
|-              |-                                      |
| `onDepressurized`      | Activated when an air vent is in the *Depressurized* state.    |
| `onDepressurizing`       | Activated when an air vent is in the *Depressurized* state.       |
| `onPressurized`       | Activated when an air vent is in the *Pressurized* state.       |
| `onPressurizing`       | Activated when an air vent is in the *Pressurized* state.       |

**Example**

Imagine our air vent is part of our airlock:

```ini title="Main Airlock Air Vent > Custom Data"
[hooks]
onDepressurizing=light/color "MainAirlockLight" red;
onPressurized=door/open "MainAirlockInnerDoor";
```

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

or
```ini title="Mother > Custom Data"
[hooks]
"Main Airlock Air Vent".onDepressurizing=
| light/color "MainAirlockLight" red;

ExternalAirVent.onPressurized=
| screen/print "Atmosphere Screen" "IN ATMOSPHERE"
```