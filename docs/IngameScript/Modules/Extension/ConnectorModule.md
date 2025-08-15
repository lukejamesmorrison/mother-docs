# Connector Module
<!-- [< Modules](../Modules.md) -->

The connector module allows the user to control connectors on the grid.

[[toc]]

## Commands

### connector/lock
Lock a connector or group of connectors.

```
connector/lock <Connector|Group>
```

**Example**

```bash title="Terminal"
connector/lock DockingConnector
```

### connector/unlock
Unlock a connector or group of connectors.

```
connector/unlock <Connector|Group>
```

**Example**

```bash title="Terminal"
connector/unlock DockingConnector
```

### connector/toggle
Toggle the lock state of a connector or group of connectors.

```
connector/toggle <Connector|Group>
```

**Example**

```bash title="Terminal"
connector/toggle DockingConnector
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

```ini title="DockConnector > Custom Data"
[hooks]
onLock=light/color "Dock Light" red;
onUnlock=light/color "Dock Light" green;
```
or

```ini title="Mother > Custom Data"
[hooks]
DockConnector.onUnlock=light/color "Dock Light" green;
"Fuel Connector".onLock=tank/stockpile FuelTanks;
```

## Configuration

|Key| Value| Description|
|-|-|-|
|`appDistance`| meters | The distance the approaching grid should approach from. Default is **30m**. |

**Example**

```ini title="DockConnector > Custom Data"
[general]
; Set the approach distance to 50 meters from the connector face
appDistance=50
```
