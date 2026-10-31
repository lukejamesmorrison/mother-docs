# Sensor Module

The Sensor module allows the user to control Sensor blocks on the grid. We can use *hooks* to trigger actions when an entity is detected or not detected by the sensor.

[[toc]]

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`distance > 100`), while a predicate stands alone (`detected`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

| Property | Description |
|-|-|
| `detected` | `1` when the sensor detects an entity, `0` when it does not. |
| `distance` | The distance in metres to the last detected entity, or `-1` if none. |

| Predicate | True when |
|-|-|
| `detected` | The sensor detects an entity. |
| `clear` | The sensor does not detect an entity. |

Because `distance` is `-1` when nothing is detected, a condition such as `distance < 100` is also true when the sensor is clear.

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
Distant=
| when LandingPadSensor distance > 100;
|   light/color "Landing Pad Light" yellow;
```

**Use a predicate**

```ms title="Mother > Custom Data"
[rules]
Approach=
| when LandingPadSensor detected;
|   light/blink "Landing Pad Light" fast;
| else;
|   light/blink "Landing Pad Light" off;
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onDetect`          | Run when a Sensor block detects an entity.       |
| `onClear`        | Run when a Sensor block does not detect an entity.     |

**Example**

Imagine our Sensor has a status light we want to view elsewhere:

```ms title="LandingPadSensor > Custom Data"
[hooks]
onDetect=light/blink "Landing Pad Light" fast;
onClear=light/blink "Landing Pad Light" off;
```

or

```ms title="Mother > Custom Data"
[hooks]
LandingPadSensor.onDetect=light/blink "Landing Pad Light" fast;
"Airlock Sensor".onClear=door/close AirlockInnerDoor;
```

::: note
Sensors can read details about the entity they are detecting. I hope to leverage this in future features related to docking and collision avoidance.
:::

