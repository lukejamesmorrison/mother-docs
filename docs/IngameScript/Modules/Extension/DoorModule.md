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

```ms title="Terminal"
door/open "Missile Silo Door"
```

### close
Close a door or group of doors.
```
door/close <Door|Group>
```

**Example**

```ms title="Terminal"
door/close "Missile Silo Door"
```

### toggle
Toggle the open state of a door or group of doors.
```
door/toggle <Door|Group>
```

**Example**

```ms title="Terminal"
door/toggle "Missile Silo Door"
```

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`status == open`), while a predicate stands alone (`open`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

A group of doors matches when any door does.

| Property | Description |
|-|-|
| `status` | `open`, `opening`, `closed` or `closing`. |

| Predicate | True when |
|-|-|
| `open` | The door is fully open. |
| `opening` | The door is opening. |
| `closed` | The door is fully closed. |
| `closing` | The door is closing. |

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
HangarLights=
| when "Hangar Door" status == open;
|   block/on "Hangar Lights";
| else;
|   block/off "Hangar Lights";
```

**Use a predicate**

```ms title="Mother > Custom Data"
[commands]
ToggleDoor=
| if "Hangar Door" open;
|   door/close "Hangar Door";
| else;
|   door/open "Hangar Door";
| end;
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

```ms title="OuterDoor > Custom Data"
[hooks]
onOpen=wait 10; door/close this;
onClose=vent/pressurize AirlockVent; wait 2; light/blink "Airlock Light" off;
```

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

or
```ms title="Mother > Custom Data"
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

