# Block Module
[< Modules](../Modules.md)

The Block module allows the user to interact with **functional blocks** on the grid. All blocks accessible via [Block Catalogue](../Core/BlockCatalogue.md) are considered functional blocks.

## Commands

### on
Turn the block on.

```
block/on <Block|Group> [--options]
```

### off
Turn the block off.

```
block/off <Block|Group> [--options]
```

## Hooks

The following hooks can be define in the block's CustomData, and will be triggered when the corresponding command is called:

|Key        | Trigger                           |
|-          |-                                  |
| `onOn`    | Activated by `block/on` command   |
| `onOff`   | Activated by `block/on` command   |

### Example

**DrillPiston CustomData**
```ini
[hooks]
onOn=light/color DrillIndicatorLight green;
onOff=light/color DrillIndicatorLight red;
```

**Mother CustomData**
```ini
[hooks]
DrillPiston.onOff=light/color DrillIndicatorLight red;
"Emergency Batteries"onOn=light/blink "Battery Indicators" med;
```