# Terminal Block Module

The Terminal Block Module allows the user to interact with **terminal blocks** on the grid. All blocks accessible via [Block Catalogue](../Core/BlockCatalogue.md) are considered terminal blocks.

[[toc]]

## Commands

### block/on
Turn the block on.

```
block/on <Block|Group> [--options]
```

**Example**
```bash title="Terminal"
block/on DrillPiston;
```

### block/off
Turn the block off.

```
block/off <Block|Group> [--options]
```

**Example**
```bash title="Terminal"
block/off DrillPiston;
```

### block/action
Run a toolbar action on the block. This is more expensive than a traditional command and Malware advises against it. Use this command sparingly to access automations that Mother does not access natively.

```
block/action <Block|Group> <Action> <...ActionArgs>
```

**Example**

We want to run the Set and Move action on a piston.  It accepts two arguments: the `distance` to move and the `speed` of the piston. These values are entered in the same order you would normally enter them via the ingame menus.

```bash title="Terminal"
# set the piston to move to 5m distance at 2.5m/s
block/action DrillPiston SetAndMove 5.0 2.5;
```

::: tip
You can view a complete list of block actions [here](https://github.com/malware-dev/MDK-SE/wiki/List-Of-Terminal-Properties-and-Actions).
:::

### block/config
Set a value in the block's custom data.

```
block/config <Block|Group> <Section.Key> <Value>
```

**Example**

Let's update the default scale of our `MapLCD`:

```bash title="Terminal"
# set the scale to 200m
block/config MapLCD general.mapScale 200
```

### tag/get
Get a all blocks with a specific tag. This will print a list of blocks to the terminal window.

```
tag/get <Tag>
```

**Example**

Let's get all blocks with the `#cockpit-displays` tag:

```text title="Terminal"
tag/get #cockpit-displays;
```

### tag/set

Set a tag on a block or group of blocks.

```
tag/set <Block|Group> <Tag>
```

**Example**

Let's tag our cockpit displays so that we can easily set them to night mode:
    
```text title="Terminal"
tag/set CockpitDisplays #cockpit-displays;
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