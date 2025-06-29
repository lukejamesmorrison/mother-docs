# Upgrade Guide

[[toc]]

## 0.2.12 -> 0.2.13
🕓 0 mins

This update makes major changes to the boot process but does not require any changes to your existing scripts. 

Players can now use the `boot` command to run the Mother OS boot sequence. This is automatically run when the Programmable Block is started, but can be run manually to reset the system. 

Players can also increment and decrement inputs for various commands like `hinge/rotate` and `piston/distance` using the `add` and `sub` command options.

[![v0.2.13 Video](https://img.youtube.com/vi/cAdQMMQhYrQ/0.jpg)](https://youtu.be/cAdQMMQhYrQ)


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
