# Connector Module
<!-- [< Modules](../Modules.md) -->

The connector module allows the user to control connectors on the grid.

[[toc]]

## Commands

### lock
Lock a connector or group of connectors.

```
connector/lock <Connector|Group>
```

### unlock
Unlock a connector or group of connectors.

```
connector/unlock <Connector|Group>
```

### toggle
Toggle the lock state of a connector or group of connectors.

```
connector/toggle <Connector|Group>
```

## Hooks

The following hooks can be define in the block's CustomData, and will be triggered when the corresponding command is called:****

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
