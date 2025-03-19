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

### close
Close a door or group of doors.
```
door/close <Door|Group>
```

### toggle
Toggle the open state of a door or group of doors.
```bash
door/toggle <Door|Group>
```

## Hooks

The following hooks can be define in the block's CustomData, and will be triggered when the corresponding command is called:

|Key            | Trigger                               |
|-              |-                                      |
| `onOpen`      | Activated by `door/open` command      |
| `onclose`     | Activated by `door/close` command     |

**Example**

Imagine our door is part of an airlock

**OuterDoor CustomData**

```
[hooks]
onOpen=light/blink "Airlock Light" fast; vent/depressurize AirlockVent; wait 10; door/close this;
onClose=vent/pressurize AirlockVent; wait 2; light/blink "Airlock Light" off;
```

**Mother CustomData**

```
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
