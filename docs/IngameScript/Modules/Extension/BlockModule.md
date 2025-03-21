# Block Module
<!-- [< Modules](../Modules.md) -->

The Block Module allows the user to interact with **terminal blocks** on the grid. All blocks accessible via [Block Catalogue](../Core/BlockCatalogue.md) are considered terminal blocks.

[[toc]]

## Commands

### on
Turn the block on.

```
block/on <Block|Group> [--options]
```

**Example**
```bash title="Terminal"
block/on DrillPiston;
```

### off
Turn the block off.

```
block/off <Block|Group> [--options]
```

**Example**
```bash title="Terminal"
block/off DrillPiston;
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key        | Trigger                           |
|-          |-                                  |
| `onOn`    | Activated by `block/on` command   |
| `onOff`   | Activated by `block/off` command   |

**Example**

```ini title = "DrillPiston > Custom Data"
[hooks]
onOn=light/color DrillIndicatorLight green;
onOff=light/color DrillIndicatorLight red;
```
or

```ini title="Mother > Custom Data"
[hooks]
DrillPiston.onOn=light/color DrillIndicatorLight green;
"Emergency Batteries".onOff=light/blink "Battery Indicators" off;
```