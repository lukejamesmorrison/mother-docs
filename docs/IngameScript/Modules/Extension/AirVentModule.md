# Air Vent Module
<!-- [< Modules](../Modules.md) -->

The air vent module allows players to control air vents for uses like airlocks and oxygen capture.

[[toc]]

## Commands

### pressurize

Set the air vent to pressurize mode.
```
vent/pressurize <AirVent|Group>
```

**Example**
```ms title="Terminal"
vent/pressurize AirlockAirVent
```

### depressurize

Set the air vent to depressurize mode.
```
vent/depressurize <AirVent|Group>
```

**Example**
```ms title="Terminal"
vent/depressurize "Atmosphere Intake Fan"
```

### toggle

Toggle the air vent between pressurize and depressurize mode.
```
vent/toggle <AirVent|Group>
```

**Example**
```ms title="Terminal"
vent/toggle AirlockAirVent
```

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`oxygen < 50%`), while a predicate stands alone (`low`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

| Property | Description |
|-|-|
| `oxygen` | The oxygen level of the room as a ratio, from `0` to `1`. Compare with a percentage, ie. `oxygen < 50%`. |
| `status` | `pressurized`, `pressurizing`, `depressurized` or `depressurizing`. |

| Predicate | True when |
|-|-|
| `pressurized` | The air vent is pressurized. |
| `pressurizing` | The air vent is pressurizing. |
| `depressurized` | The air vent is depressurized. |
| `depressurizing` | The air vent is depressurizing. |
| `low` | Oxygen is under 50%. |

**Compare a property**

```ms title="Airlock Vent > Custom Data"
[rules]
SafeToEnter=
| when this oxygen > 90%;
|   door/open "Airlock Inner Door";
```

**Use a predicate**

```ms title="Airlock Vent > Custom Data"
[rules]
Warning=
| when this low;
|   light/color "Airlock Light" red;
| else;
|   light/color "Airlock Light" green;
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key            | Trigger                               |
|-              |-                                      |
| `onDepressurized`      | Activated when an air vent is in the *Depressurized* state.    |
| `onDepressurizing`       | Activated when an air vent is in the *Depressurizing* state.       |
| `onPressurized`       | Activated when an air vent is in the *Pressurized* state.       |
| `onPressurizing`       | Activated when an air vent is in the *Pressurizing* state.       |

**Example**

Imagine our air vent is part of our airlock:

```ms title="Main Airlock Air Vent > Custom Data"
[hooks]
onDepressurizing=light/color "MainAirlockLight" red;
onPressurized=door/open "MainAirlockInnerDoor";
```

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

or
```ms title="Mother > Custom Data"
[hooks]
"Main Airlock Air Vent".onDepressurizing=
| light/color "MainAirlockLight" red;

ExternalAirVent.onPressurized=
| screen/print "Atmosphere Screen" "IN ATMOSPHERE"
```

