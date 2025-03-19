# Landing Gear Module
<!-- [< Modules](../Modules.md) -->

The Landing Gear module allows the user to control landing gear and magnetic plate blocks on the grid.

[[toc]]

## Commands

### lock
Lock a Landing Gear or group of Landing Gear.
```
gear/lock <LandingGear|Group>
```

### unlock
Unlock a Landing Gear or group of Landing Gear.
```
gear/unlock <LandingGear|Group
```

### toggle
Toggle the lock state of a Landing Gear or group of Landing Gear between `Locked` nad `Unlocked`.
```
gear/toggle <LandingGear|Group>
```
<br>

::: note
For more info about Landing Gear states, see [LandingGearMode](https://github.com/malware-dev/MDK-SE/wiki/SpaceEngineers.Game.ModAPI.Ingame.LandingGearMode) in MDK-SE.
:::

### auto
Set the AutoLock state of a Landing Gear or group of Landing Gear.
```
gear/auto <LandingGear|Group> <true|false>
```


## Hooks

The following hooks can be define in the block's CustomData, and will be triggered when the corresponding command is called:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onLock`          | Run when a landing gear block locks.       |
| `onUnlock`        | Run when a landing gear block unlocks.     |
| `onReady`         | Run when a landing gear block is ready to lock.     |

**Example**

Imagine our landing gear has a status light we want to view elsewhere:

***MainLandingGear CustomData***

```
[hooks]
onLock=light/color "Gear Indicator Light" red;
onUnlock=light/color "Gear Indicator Light" green;
```

***Mother CustomData***

```
[hooks]
MainLandingGear.onUnlock=light/color "Gear Indicator Light" green;
"Boom Mag Plate".onLock=rotor/rotate BoomRotor 90;
```

:::note
Landing Gear hooks are also fired when the Landing Gear is used for parking via a toolbar action or the parking button `P`.
:::

**Example**

Imagine our Landing Gear has a status light we want to view elsewhere:

***DockLanding Gear CustomData***

```ini
[hooks]
onLock=light/color "Dock Light" red;
onUnlock=light/color "Dock Light" green;
```

***Mother CustomData***

```ini
[hooks]
DockLanding Gear.onUnlock=light/color "Dock Light" green;
"Fuel Landing Gear".onLock=tank/stockpile FuelTanks;
``` 
