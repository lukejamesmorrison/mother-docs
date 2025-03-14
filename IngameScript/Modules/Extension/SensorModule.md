# Sensor Module
[< Modules](../Modules.md)

The Sensor module allows the user to control Sensor blocks on the grid.

## Hooks

The following hooks can be define in the block's CustomData, and will be triggered when the corresponding command is called:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onDetect`          | Run when a Sensor block detects an entity.       |
| `onClear`        | Run when a Sensor block does not detect an entity.     |

### Example
Imagine our Sensor has a status light we want to view elsewhere:

**LandingPadSensor CustomData**

```
[hooks]
onDetect=light/blink "Landing Pad Light" fast;
onClear=light/blink "Landing Pad Light" off;
```

**Mother CustomData**

```
[hooks]
LandingPadSensor.onDetect=light/blink "Landing Pad Light" fast;
"Airlock Sensor".onClear=door/close AirlockInnerDoor;
```
