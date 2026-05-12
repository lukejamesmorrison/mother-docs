# Upgrade Guide

[[toc]]

## 1.0.0 -> 1.1.0
🕓 10-15 mins

This is a significant update that restructures how autopilot features are delivered. Flight-related modules have been extracted into a new companion script called **Mother Autopilot System (MAPS)**. If you use flight plans, docking, or gyro commands, you'll need to install MAPS alongside Mother OS.

### Breaking Changes

#### 1. Autopilot Modules Moved to MAPS

The following modules have been removed from Mother OS and are now part of MAPS:
- `FlightControlModule`
- `FlightPlanningModule`
- `DockingModule`
- `GyroModule` (now called `AttitudeModule`)

::: warning Action Required
If you use any flight-related commands (`nav/set-flight-plan`, `dock`, `gyro/face`, `fcs/*`), you must install MAPS into a second programmable block on your grid.
:::

**Installation:**
1. Subscribe to MAPS on the Steam Workshop
2. Load the MAPS script into a new programmable block on your grid
3. Both scripts will automatically sync during boot

#### 2. Flight Plan Command Renamed

The `nav/set-flight-plan` command has been renamed to `fp/set`.

**Before:**
```ms title="Terminal"
nav/set-flight-plan "GPS:Waypoint1:0:0:0:#FFFFFF:"
```

**After:**
```ms title="Terminal"
fp/set "GPS:Waypoint1:0:0:0:#FFFFFF:"
```

Update any custom commands or hooks that reference `nav/set-flight-plan`.

#### 3. Display Surface Configuration Changed

Display routing is no longer inferred from block names like `MMAP`, `MALMANAC`, or `MLOG:1`. Instead, assign views directly in the target block's Custom Data using the `[surfaces]` section.

**Before (block name):**
```
LCD Panel [MMAP]
```

**After (Custom Data):**
Use the `[surfaces]` section on the display block to assign views to each surface:
```ms title="Custom Data"
[surfaces]
; show the MAPS map view of surface 0
0=MapView

; view a script's log on surface 1
1=LogView "Mother OS"
```

The block can now be named anything you like. This applies to map, almanac, log, and GUI views.

::: tip
Map and Almanac displays are now rendered by MAPS, not Mother Core. Make sure MAPS is installed if you want to use these display types.
:::

#### 4. Debug/Log Display Consolidation

The `debug` display type has been merged with `log`. Use `log` for all logging output.

### Migration Checklist

- [ ] Install MAPS if you use flight/docking features
- [ ] Replace `nav/set-flight-plan` with `fp/set` in all custom commands
- [ ] Replace `gyro/face` usage (now in MAPS)
- [ ] Replace block-name display tags like `MMAP`, `MALMANAC`, and `MLOG:1` with `[surfaces]` view assignments
- [ ] Change any `debug` display types to `log`
- [ ] Run `boot` command after updating Custom Data

### New Features Available

After upgrading, you'll have access to:
- **Variables** - Use `$VARNAME` in commands
- **Command parameters** - Define `{{param:default}}` in custom commands
- **Parallel execution** - Run commands simultaneously with `{command1} {command2}`
- **Wheel commands** - `wheel/height`, `wheel/power`, `wheel/strength`, `wheel/friction`
- **`--share` flag** - Distribute values across block groups
- **Merge block support** - `onMerge`/`onUnmerge` hooks
- **Mechanical attach/detach** - `piston/*`, `rotor/*`, and `hinge/*` now support attach/detach commands and `onAttach`/`onDetach` hooks
- **Grid and block renaming** - Use `rename` and `block/rename` to rename grids and terminal blocks
- **Hexadecimal colors** - Use values like `#FF0000` anywhere colors are accepted
- **Important commands** - Prefix a custom command with `!` to make it authoritative across the construct
- **`block/rename`** - Rename blocks programmatically
- **`onBoot` hook** - Trigger commands after boot completes

### Other Changes To Expect

- **Automatic command sharing** - Mother OS, MAPS, and Mother GUI now share command libraries automatically on the same construct
- **No forced reboot on Custom Data edits** - Most programmable block configuration changes refresh without a full reboot
- **Better construct awareness** - Merge and mechanical connection changes now refresh block discovery automatically

---

## 0.2.14 -> 1.0.0
🕓 5 mins

This is a major release that introduces several new features and improvements. I highly recommend updating Mother OS on all of your grids to ensure compatibility and take advantage of the latest features. It never hurts to run the `purge * --force` command to clear out old data.

This version introduces automatic refreshing to block custom data meaning you should only need to reach for the `boot` command, or hit recompile when things go wrong. This has massively improved our productivity and I'm sure it will for you too. You now also print messages to cockpit screens, and change both text and background colors.

Enjoy!

## 0.2.13 -> 0.2.14
🕓 5 mins

This update introduces changes to the way your grids communicate. I highly advise installing the latest version on Mother on all of your grids.  Mother Core now uses a Version Manager to help with this.

If you are encountering issues or the rare complexity failure, you should purge storage to clear all data related to grid communications.

```ms title="Terminal"
purge * --force
```

<!-- [![v0.2.14 Video](https://img.youtube.com/vi/)](https://youtu.be/) -->

## 0.2.12 -> 0.2.13
🕓 0 mins

This update makes major changes to the boot process but does not require any changes to your existing scripts. 

Players can now use the `boot` command to run the Mother OS boot sequence. This is automatically run when the Programmable Block is started, but can be run manually to reset the system. 

Players can also increment and decrement inputs for various commands like `hinge/rotate` and `piston/distance` using the `add` and `sub` command options.

<iframe width="560" height="315" src="https://www.youtube.com/embed/cAdQMMQhYrQ?si=pXwoQzaQInuuhbTy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!-- [![v0.2.13 Video](https://img.youtube.com/vi/cAdQMMQhYrQ/0.jpg)](https://youtu.be/cAdQMMQhYrQ) -->


## 0.2.11 -> 0.2.12
🕓 5 mins

This update ensures compatibility with the new Fieldwork Update (1.206). This should fix Mother across your grids caused by changes to the programmable block API by Keen. Thanks for your patience with this one!

::: important
You will need to refresh Mother in all of your grids.
:::

- Players will also have access to the following hooks:

  - **Air Vent**
    - `onPressurizing` - Activated when an air vent is in the *Pressurizing* state.
    - `onDepressurizing` - Activated when an air vent is in the *Depressurizing* state.
    - `onPressurized` - Activated when an air vent is in the *Pressurized* state.
    - `onDepressurized` - Activated when an air vent is in the *Depressurized* state.

  - **Piston**
    - `onExtended` - Activated when a piston is in the *Extended* state.
    - `onRetracted` - Activated when a piston is in the *Retracted* state.
    - `onExtending` - Activated when a piston is in the *Extending* state.
    - `onRetracting` - Activated when a piston is in the *Retracting* state.

  - **Door**
    - `onClosing` - Activated when a door is in the *Closing* state.
    - `onOpening` - Activated when a door is in the *Opening* state.

Players may now use the `block/toggle` command to toggle a block's on/off state.

<!-- [![v0.2.12 Video](https://img.youtube.com/vi/CPeas5AVd9A/0.jpg)](https://www.youtube.com/watch?v=CPeas5AVd9A) -->


## 0.2.10 -> 0.2.11
🕓 0 mins

- Players can now use the following new commands:
    - `dampeners/on` - Turns on the dampeners of the ship (aircraft).
    - `dampeners/off` - Turns off the dampeners of the ship (aircraft).
    - `handbrake/on` - Turns on the handbrake of the ship (rover).
    - `handbrake/off` - Turns off the handbrake of the ship (rover).

- Players can now print multi-line messages to LCD panels.

[![v0.2.11 Video](https://img.youtube.com/vi/CPeas5AVd9A/0.jpg)](https://www.youtube.com/watch?v=CPeas5AVd9A)

## 0.2.9 -> 0.2.10
🕓 0 mins

- Players can now target blocks with [`#tags`](./CommandLineInterface.md#by-tag). Tags provide a flexible alternative to using terminal groups to associate your blocks by function and targeting them with commands.
  
[![v0.2.10 Video](https://img.youtube.com/vi/PkYn7pcir70/0.jpg)](https://www.youtube.com/watch?v=PkYn7pcir70)

## 0.2.8 -> 0.2.9
🕓 0 mins

### Features
- [`screen/print`](./Modules/Extension/DisplayModule.md#print) command allows players to print custom messagesm to LCD panels.
- Autodocking has been improved and contains several failsafes to protect player grids.  Planetary docking should be attempted with caution but zero-g docking is very reliable.

## 0.2.7 -> 0.2.8
🕓 0 mins

### Features
- Autodocking with the `dock` command.
- Improved performance and hook capabilities. Doors now trigger hooks when the player interacts with them.
- New documentation suite to assist with building automations with Mother.

[![0.2.8 Video](https://img.youtube.com/vi/Wnc81j_g4GI/0.jpg)](https://www.youtube.com/watch?v=Wnc81j_g4GI)

### Migration

You do not need to change anything to upgrade to this version. Woohoo!


## 0.2.7

[![0.2.7 Video](https://img.youtube.com/vi/REUa4MP4ZfE/0.jpg)](https://www.youtube.com/watch?v=REUa4MP4ZfE)
