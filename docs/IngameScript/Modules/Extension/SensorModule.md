# Sensor Module

The Sensor module allows the user to control Sensor blocks on the grid. We can use *hooks* to trigger actions when an entity is detected or not detected by the sensor.

[[toc]]

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

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

or

```ini title="Mother > Custom Data"
[hooks]
LandingPadSensor.onDetect=light/blink "Landing Pad Light" fast;
"Airlock Sensor".onClear=door/close AirlockInnerDoor;
```

::: note
Sensors can read details about the entity they are detecting. I hope to leverage this in future features related to docking and collision avoidance.
:::
