# Timer Block Module
<!-- [< Modules](../Modules.md) -->

The Timer Block module allows the user to interact with Timer Blocks on the grid.  This module is useful as it allows Mother to interoperate with existing automations on your grid.

[[toc]]

## Commands

### timer/start
Start execution for a timer block or group of timer blocks.

```
timer/start <TimerBlock|Group> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `delay` | 1 - 3600 | seconds  | Set the delay of the timer block before starting execution. |

**Example**
```bash title="Terminal"
# Start the timer block with a delay of 10 seconds
timer/start MainTimerBlock --delay=10;
```

### timer/trigger
Trigger the immediate execution of a timer block or group of timer blocks
```
timer/trigger <TimerBlock|Group> [--options]
```

**Example**
```bash title="Terminal"
# Trigger immediate execution of the timer block.
timer/trigger MainTimerBlock;
```

### timer/stop
Stop execution of a timer block or group of timer blocks

```
timer/stop <TimerBlock|Group> [--options]
```

**Example**
```bash title="Terminal"
# Stop the timer block
timer/stop MainTimerBlock;
```