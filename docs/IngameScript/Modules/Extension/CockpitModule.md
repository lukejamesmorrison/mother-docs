# Cockpit Module

The Cockpit module allows the user to control cockpits on the grid and access thrust dampeners, handbrakes, and more.

[[toc]]

## Commands

### dampeners/on
Turn on thrust dampeners. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
dampeners/on <Cockpit|Group>
```

**Example**

```bash title="Terminal"
# turn on the dampeners of the Main cockpit
dampeners/on

# turn on dampeners for a specific cockpit
dampeners/on RearCockpit
```

### dampeners/off
Turn off thrust dampeners. By default, this command will use your Main cockpit. Otherwise, you may use an optional argument to specify a cockpit.

```
dampeners/off <Cockpit|Group>
```

**Example**

```bash title="Terminal"
# turn off the dampeners of the Main cockpit
dampeners/off

# turn off dampeners for a specific cockpit
dampeners/off RearCockpit
```

<!-- ### toggle
Toggle the lock state of a Cockpit or group of Cockpits.

```
Cockpit/toggle <Cockpit|Group>
``` -->
<!-- 
**Example**

```bash title="Terminal"
Cockpit/toggle DockingCockpit
``` -->

## Hooks

The following hooks can be define in the block's Custom Data, and will be triggered when the corresponding command is called:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onOccupied`          | Run when a Cockpit is occupied by a player.         |
| `onEmpty`        | Run when a Cockpit is empty of players.        |

**Example**

When we enter the cockpit, let's ensure our batteries are on auto and our lights are on.

```ini title="RearCockpit > Custom Data"
[hooks]
onOccupied=battery/auto Batteries; block/on SignalLights;
onEmpty=block/off SignalLights;
```
or

```ini title="Mother > Custom Data"
[hooks]
RearCockpit.onOccupied=battery/auto Batteries; block/on SignalLights;
"Drill Cockpit".onEmpty=block/of MainDrills;
```