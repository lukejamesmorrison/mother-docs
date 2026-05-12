# Announcements

<!-- [[toc]] -->

---

<!-- Add new announcements below this line, with the most recent at the top -->

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


