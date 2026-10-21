# Announcements

<!-- [[toc]] -->

---

<!-- Add new announcements below this line, with the most recent at the top -->

## October 2026 Update

This update brings **Mother OS 1.2**, **Mother Core 1.1.4**, **Mother GUI 0.2**, and **Mother Autopilot System (MAPS) 0.2**. It adds Automatic LCDs 2 support, in-menu notifications, and lets scripts share screens with each other. There are no breaking changes, but update all of your scripts at the same time so they run the same version of Mother Core.

### Release Highlights

- **Mother OS 1.2** adds the `autolcd/print` and `autolcd/clear` commands, and expands `screen/print` with `bgcolor`, `alignment` and `padding` options. Sorters gain `sorter/mode`, `sorter/add`, `sorter/remove` and `sorter/clear` for managing item filters.
- **Mother Core 1.1.4** adds the `halt` command, shared views between scripts, quoted option values, and fixes for merge and unmerge handling.
- **Mother GUI 0.2** adds the `view/notify` command, custom menu titles, scroll indicators, and a simpler `< Back` entry on every menu.
- **MAPS 0.2** shares `MapView` with Mother GUI so one screen can switch between a menu and the map.

Check out the [Nova Blade Mk1 (Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3823300552) - designed as a demonstration aircraft for the synergy of Mother OS, Mother GUI and Mother Autopilot System, all built using [Mother Core](./Framework/README.md).

<iframe width="100%" height="400" src="https://www.youtube.com/embed/UJhYhdJwrFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### Mother OS 1.2

Players can now show [Automatic LCDs 2](https://steamcommunity.com/sharedfiles/filedetails/?id=822950976) views on any screen with a single command. Define named views in the `[autolcd]` section of the programmable block, then print them to a screen. Use `autolcd/clear` to remove config from a screen.

```ms title="Mother > Custom Data"
[commands]
ShowPowerView=autolcd/print "Cockpit:1" PowerView

[autolcd]
PowerView=
| Power {T:*}
| Working {TG:Batteries}
```

![Automatic LCDs 2 Support](./IngameScript/Assets/mother-os-autolcds1.png)

Conveyor sorters now support filtering. Switch a sorter between whitelist and blacklist with `sorter/mode`, and manage its filter list with `sorter/add`, `sorter/remove` and `sorter/clear`. Items are written as `Type/Subtype` (such as `Ore/Iron`), or as a type alone (such as `Ore`) to match every item of that type. `sorter/add` accepts `--fresh` and `--mode` so a sorter can be fully reconfigured in a single command.

```ms title="Terminal"
sorter/add "Cargo Sorter" Ore/Stone Ore/Ice --fresh --mode=blacklist;
```

Explore Mother OS: [AutoLCD Module](./IngameScript/Modules/Extension/AutoLCDModule.md) | [Sorter Module](./IngameScript/Modules/Extension/SorterModule.md) | [Upgrade Guide](./IngameScript/UpgradeGuide.md)

### Mother GUI 0.2

Mother GUI can now give feedback to the player and is a bit easier to use. Use `view/notify` to show a transient message in the footer of a view, and `--title` with `view/go` to replace the header of a menu. Menus show scroll indicators when they overflow, use a larger and more readable font, and every menu with history shows a `< Back` option. Rather than nesting multiple menu layers, this simplifies a modular menu structure with navigation history.

```ms title="Terminal"
view/notify "Cockpit:1" "Docking complete" --level=success --duration=5;
view/go "Cockpit:1" MapMenu --title="Map Menu Title";
```

![Automatic LCDs 2 Support](./MotherGUI/Assets/mother-gui-notification1.png)

Explore Mother GUI: [Notifications](./MotherGUI/MenuView.md#notifications) | [MenuView](./MotherGUI/MenuView.md)

### Mother Autopilot System 0.2

`MapView` can now be opened from Mother GUI. A cockpit screen can show a menu, switch to the map with `view/go`, and return with `view/back`.

Explore MAPS: [Map Module](./MotherAutopilotSystem/Modules/MapModule.md#switching-between-the-map-and-mother-gui) | [Upgrade Guide](./MotherAutopilotSystem/UpgradeGuide.md)

### Mother Core 1.1.4

Scripts now share *views* in the same way they share commands, so a script can draw on a screen owned by another script. Developers also get the `halt` command, the `ConstructRefreshedEvent`, a `preserveState` option for block state monitoring, and options that accept double-quoted values.

Explore Mother Core: [Upgrade Guide](./Framework/Developer/GettingStarted/UpgradeGuide.md) | [Intergrid Message Service](./Framework/Developer/CoreModules/IntergridMessageService.md#sharing-views-with-other-scripts) | [Command Bus](./Framework/Developer/CoreModules/CommandBus.md)

---

## Version 1.1 Update - 12 May 2026



The upcoming Mother ecosystem release brings together **Mother OS 1.1**, **Mother Core 1.1**, **Mother Autopilot System 0.1**, **Mother GUI 0.1**, and the expanded **Mother CLI 1.1** command experience. This release separates flight systems into a dedicated companion script, broadens the in-game command model, modernizes display configuration, and opens up more focused entry points for both players and developers.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/YdISX1VCmLs?si=5OpIN9IwscWgfCAf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Release Highlights

- **Mother OS 1.1** adds variables, runtime command parameters, parallel routines, wheel suspension commands, cumulative `--share` movement, block renaming, hex colors, and the new `onBoot` hook.
- **Mother Core 1.1** moves display targeting into Custom Data, consolidates logging, adds command priority, and improves mechanical and merge block awareness.
- **Mother Autopilot System (MAPS) 0.1** launches as a standalone companion for flight planning, flight control, docking, attitude control, and Map/Almanac displays.
- **Mother GUI 0.1** launches as a new display-focused script for interactive menus and live mechanical views.
<!-- - **Mother CLI 1.1** makes command libraries more expressive and automatically routes commands between Mother-powered scripts on the same construct. -->

::: warning Upgrading from Mother 1.0?
If you use flight plans, docking, `gyro/face`, or `fcs/*` commands, install MAPS on a second programmable block alongside Mother OS. The `nav/set-flight-plan` command has been renamed to `fp/set`, and Map/Almanac displays are now rendered by MAPS.
:::

---

### Mother OS 1.1

Mother OS 1.1 expands day-to-day ship automation without changing the familiar programmable-block workflow. Players can define reusable `$VARIABLES`, build commands with `{{runtime parameters}}`, run routines in parallel, and control more block types directly. Wheel suspension controls, shared piston/rotor/hinge movement with `--share`, `block/rename`, grid renaming, and hex color support all land in this release.

```ms title="Mother > Custom Data"
[variables]
PLAYER=Dave

[commands]
Greeting=screen/print BedroomDisplay "Good morning, $PLAYER"
OpenAirlock=
| wait 5;
| { door/open AirlockDoor1 }
| { door/open AirlockDoor2 }
```

Explore Mother OS: [Overview](./IngameScript/IngameScript.md) | [Installation](./IngameScript/Installation.md) | [Upgrade Guide](./IngameScript/UpgradeGuide.md) | [Examples](./IngameScript/Examples.md)

### Mother Core 1.1

Mother Core 1.1 is the shared foundation under Mother OS, MAPS, and Mother GUI. Displays are now configured in Custom Data instead of block names, the old `Debug` and `Log` split is replaced by the unified `Log` module, and map and almanac rendering move out into MAPS. Developers also get new command priority behavior, the `onBoot` hook, clearer instance naming (`self`, `construct`, `remote`), and better catalogue updates when merge blocks and mechanical connections change.

Explore Mother Core: [Overview](./Framework/README.md) | [Installation](./Framework/Developer/GettingStarted/Installation.md) | [Upgrade Guide](./Framework/Developer/GettingStarted/UpgradeGuide.md) | [Core Modules](./Framework/Developer/CoreModules/CoreModules.md)

### Mother Autopilot System (MAPS) 0.1

MAPS is the new standalone autopilot companion for Mother-powered constructs. The initial release packages **Flight Control**, **Flight Planning**, **Docking**, **Attitude**, and **Map** functionality into a dedicated script that runs beside Mother OS. Install it on a second programmable block and Mother Core will automatically share commands across both scripts during boot, so players do not need to remember which block owns which feature.

For players migrating existing automations, the key command change is simple: `nav/set-flight-plan` is now `fp/set`.

Explore MAPS: [Overview](./MotherAutopilotSystem/README.md) | [Installation](./MotherAutopilotSystem/Installation.md) | [Upgrade Guide](./MotherAutopilotSystem/UpgradeGuide.md) | [Flight Planning](./MotherAutopilotSystem/Modules/FlightPlanningModule.md) | [Docking](./MotherAutopilotSystem/Modules/DockingModule.md)

### Mother GUI 0.1

Mother GUI is a brand new script focused on shipboard interfaces. It turns LCDs, cockpits, programmable blocks, and other text surfaces into navigable menus and live mechanical status views. Configure screens with `[surfaces]`, drive navigation with `view/*` commands, and reuse the same menus across multiple displays with `view/go self ...` for a clean, scalable UI layer that fits naturally beside Mother OS.

Explore Mother GUI: [Overview](./MotherGUI/README.md) | [Installation](./MotherGUI/Installation.md) | [MenuView](./MotherGUI/MenuView.md) | [Commands](./MotherGUI/Commands.md) | [Views](./MotherGUI/Views.md)

<!-- ### Mother CLI 1.1

The Mother command-line experience is more capable in 1.1. The in-game CLI now supports reusable variables, runtime parameters with defaults, parallel command dispatch, and automatic command sharing across Mother-powered scripts on the same construct. For framework developers, the `mother` console tool remains the fastest way to scaffold projects, modules, commands, and events when building on top of Mother Core.

Explore Mother CLI: [Command Line Interface](./IngameScript/CommandLineInterface.md) | [Cheatsheet](./Cheatsheet.md) | [Mother Core Console](./Framework/Developer/Console.md) | [Build a Module](./Framework/Developer/BuildingAModule/BuildingAModule.md) -->

### Where To Start

| If you want to... | Start here |
|-------------------|------------|
| Automate a ship or station with commands and routines | [Mother OS](./IngameScript/IngameScript.md) |
| Add flight plans, attitude control, or docking | [MAPS](./MotherAutopilotSystem/README.md) |
| Build navigable displays and mechanical dashboards | [Mother GUI](./MotherGUI/README.md) |
| Create your own programmable block scripts | [Mother Core](./Framework/README.md) |
| Learn the command syntax or scaffold project files | [Mother CLI](./IngameScript/CommandLineInterface.md) |


