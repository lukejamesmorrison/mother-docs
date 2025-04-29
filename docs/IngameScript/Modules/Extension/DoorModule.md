# Door Module
<!-- [< Modules](../Modules.md) -->

The door module allows the user to control doors on the grid.

[[toc]]

## Commands

### open
Open a door or group of doors.
```
door/open <Door|Group>
```

**Example**

```bash title="Terminal"
door/open "Missile Silo Door"
```

### close
Close a door or group of doors.
```
door/close <Door|Group>
```

**Example**

```bash title="Terminal"
door/close "Missile Silo Door"
```

### toggle
Toggle the open state of a door or group of doors.
```bash
door/toggle <Door|Group>
```

**Example**

```bash title="Terminal"
door/toggle "Missile Silo Door"
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key            | Trigger                               |
|-              |-                                      |
| `onOpen`      | Activated when a door is fully open.      |
| `onOpening`    | Activated when a door is opening.    |
| `onclose`     | Activated when a door is fully closed.    |
| `onClosing`   | Activated when a door is closing.    |


**Example**

Imagine our door is part of an airlock:

```ini title="OuterDoor > Custom Data"
[hooks]
onOpen=wait 10; door/close this;
onClose=vent/pressurize AirlockVent; wait 2; light/blink "Airlock Light" off;
```

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

or
```ini title="Mother > Custom Data"
[hooks]
OuterDoor.onOpen=
| light/blink "Airlock Light" fast; 
| vent/depressurize AirlockVent; 
| wait 10; 
| door/close OuterDoor;

"Inner Door".onClose=
| vent/pressurize AirlockVent; 
| wait 2; 
| light/blink "Airlock Light" off;
```
