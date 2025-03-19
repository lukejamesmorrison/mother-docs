# Timer Block Module
<!-- [< Modules](../Modules.md) -->

The Timer Block module allows the user to interact with Timer Blocks on the grid.  This module is useful as it allows Mother to interoperate with existing Timer Block automations.

[[toc]]

## Commands

### start
Start execution for a timer block or group of timer blocks.

```
timer/start <TimerBlock|Group> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `delay` | 1 - 3600 | seconds  | Set the delay of the timer block before starting execution. |

### trigger
Trigger the immediate execution of a timer block or group of timer blocks.
```
timer/trigger <TimerBlock|Group> [--options]
```

### stop
Stop execution of a timer block or group of timer blocks.

```
timer/stop <TimerBlock|Group> [--options]
```