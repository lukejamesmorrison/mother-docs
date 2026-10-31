# Connector Module
<!-- [< Modules](../Modules.md) -->

The connector module allows the user to control connectors on the grid.

:::note Commands are provided by Mother OS
Mother OS provides the `connector/lock`, `connector/unlock` and `connector/toggle` commands. As of Mother Core 1.2 they are no longer part of Core, so [Mother GUI](../../../MotherGUI/README.md) and [MAPS](../../../MotherAutopilotSystem/README.md) do not provide them. Connector [properties](#properties) and [hooks](#hooks) are still available in every script.
:::

[[toc]]

## Commands

### lock
Lock a connector or group of connectors.

```
connector/lock <Connector|Group>
```

**Example**

```ms title="Terminal"
connector/lock DockingConnector
```

### unlock
Unlock a connector or group of connectors.

```
connector/unlock <Connector|Group>
```

**Example**

```ms title="Terminal"
connector/unlock DockingConnector
```

### toggle
Toggle the lock state of a connector or group of connectors.

```
connector/toggle <Connector|Group>
```

**Example**

```ms title="Terminal"
connector/toggle DockingConnector
```

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`status == connectable`), while a predicate stands alone (`connected`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

Connector properties and predicates are provided by Mother Core, so they work in every script on the construct, including [Mother GUI](../../../MotherGUI/README.md).

| Property | Description |
|-|-|
| `status` | `unconnected`, `connectable` or `connected`. |

| Predicate | True when |
|-|-|
| `connected` | The connector is locked to another connector. |
| `connectable` | The connector is in range and ready to lock. |
| `unconnected` | The connector is not locked and not in range. |
| `disconnected` | The connector is not locked (`status == unconnected`). |

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
DockReady=
| when DockConnector status == connectable;
|   light/color "Dock Light" yellow;
```

**Use a predicate**

```ms title="Mother > Custom Data"
[rules]
Docked=
| when DockConnector connected --for=2;
|   battery/charge Batteries --backup;
| else;
|   battery/auto Batteries;
```

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onLock`          | Run when a connector locks.         |
| `onUnlock`        | Run when a connector unlocks.        |
| `onReady`         | Run when a connector is ready to lock.     |

**Example**

Imagine our connector has a status light we want to view elsewhere:

```ms title="DockConnector > Custom Data"
[hooks]
onLock=light/color "Dock Light" red;
onUnlock=light/color "Dock Light" green;
```
or

```ms title="Mother > Custom Data"
[hooks]
DockConnector.onUnlock=light/color "Dock Light" green;
"Fuel Connector".onLock=tank/stockpile FuelTanks;
```

