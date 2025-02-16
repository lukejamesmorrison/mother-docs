# Connector Module
[< Modules](../Modules.md)

The connector module allows the user to control connectors on the grid.

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
```bash
connector/toggle <Connector|Group>
```

## Hooks

The following hooks can be define in the block's CustomData, and will be triggered when the corresponding command is called:

|Key            | Trigger                               |
|-              |-                                      |
| `onLock`      | Activated by `connector/lock` command      |
| `onUnlock`     | Activated by connector/unlock` command     |

### Example
Imagine our connector has a status light we want to view elsewhere:

**DockConnector CustomData**

```
[hooks]
onLock=light/color "Dock Light" red;
onUnlock=light/color "Dock Light" green;
```

**Mother CustomData**

```
[hooks]
DockConnector.onUnlock=light/color "Dock Light" green;
"Fuel Connector".onLock=tank/stockpile FuelTanks;
```
