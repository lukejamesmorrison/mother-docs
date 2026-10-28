# Announcements

<!-- [[toc]] -->

---

<!-- Add new announcements below this line, with the most recent at the top -->

## 2nd October Update

This update brings **Mother OS 1.2.1**, **Mother Core 1.2**, **Mother GUI 0.2.1**, and **Mother Autopilot System (MAPS) 0.3**. Your constructs can now make decisions. Conditional logic lets any script react to the state of your blocks (`"Batteries" low`, `ship altitude < 100`) with `when` rules and `if` steps, and every script on the construct shares the same vocabulary. Update all of your scripts at the same time so they run the same version of Mother Core.

::: warning Breaking change: connector commands
`connector/lock`, `connector/unlock` and `connector/toggle` are no longer part of Mother Core. Mother OS still provides them, but Mother GUI and MAPS do not. Developers building on Mother Core should register these commands from their own module.
:::

### Release Highlights

- **Conditional logic** adds polled `when` rules, inline `if` / `elseif` / `else` / `end` steps, text compare, and a `[predicates]` section for defining your own predicates.
- **Shared vocabulary** lets a script use conditions that only another script defines. Mother GUI can test MAPS's `inspace`, and MAPS can test Mother OS's `low`, with nothing extra to configure.
- **Mother OS 1.2.1** registers block properties and predicates for batteries, tanks, jump drives, doors, landing gear, pistons, rotors, sensors, cockpits, air vents and thrusters. It also adds a `--backup` option to `battery/charge` and `$VARIABLES` in autolcd views.
- **MAPS 0.3** adds `speed`, `moving`, `gravity`, `altitude`, `inspace` and `ingravity`, and fixes the `roll` command.
- **Mother GUI 0.2.1** refreshes displays more reliably on multiplayer servers and no longer hits "script too complex" on grids with many displays.
- **Mother Core 1.2** is about 3,000 characters smaller, runs at `Update1`, and no longer hits "script too complex" on very large grids or with large `[rules]` sections.

### Conditional Logic

A condition is a target followed by a predicate, or by a property, an operator and a value. Use it in a `when` rule to run a routine when the condition changes, or in an `if` step to branch inside any routine.

```ms title="Mother > Custom Data"
[rules]
LowPower=
| when "Batteries" low;
|   screen/print "Cockpit:1" "Power is low";
| else;
|   screen/print "Cockpit:1" "Power OK";

[commands]
Land=
| if ship altitude < 100;
|   gear/lock Gear;
| end;
```

Indent the steps under each `when`, `if`, `elseif` and `else` to make the nesting easy to read. Spaces after the `|` are ignored. Every `if` needs its own `end;`, so put `else;` and `end;` in the same column as the `if` they belong to.

Predicates are the names you can use after a target. Each script defines the predicates for the blocks it owns, and shares them with every other script on the construct. Select a tab to see what is available in each script. You can add your own, or change a built-in one, in the `[predicates]` section of the programmable block's Custom Data.

::: tabs

@tab Mother Core

Available in every script, including Mother GUI.

| Predicate | True when | Applies to |
|---|---|---|
| `on` | the block is switched on | any functional block |
| `off` | the block is switched off | any functional block |
| `working` | the block is working | any block |
| `broken` | the block is not working | any block |
| `connected` | the connector is connected | connectors |
| `connectable` | the connector is in range of another and ready to connect | connectors |
| `disconnected` | the connector is not connected | connectors |

**Properties:** `enabled`, `working` and `status` (`unconnected`, `connectable`, `connected`).

@tab Mother OS

| Predicate | True when | Applies to |
|---|---|---|
| `low` | charge is under 20%, fill is under 15%, or oxygen is under 50% | batteries and jump drives, gas tanks, air vents |
| `critical` | charge is under 10%, or fill is under 10% | batteries and jump drives, gas tanks |
| `empty` | charge or fill is under 2%, or nobody is in the seat | batteries and jump drives, gas tanks, cockpits |
| `full` | charge or fill is over 98% | batteries and jump drives, gas tanks |
| `ready` | charge is over 99%, or the gear is ready to lock | batteries and jump drives, landing gear |
| `locked` | the gear or rotor is locked | landing gear, rotors and hinges |
| `unlocked` | the gear or rotor is unlocked | landing gear, rotors and hinges |
| `attached` | the rotor, hinge or piston head is attached | rotors, hinges, pistons |
| `detached` | the rotor, hinge or piston head is not attached | rotors, hinges, pistons |
| `detected` | the sensor detects something | sensors |
| `clear` | the sensor detects nothing | sensors |
| `occupied` | someone is in the seat | cockpits and other ship controllers |
| `stockpiling` | the tank is stockpiling | gas tanks |
| `weak` | thrust effectiveness is under 30% | thrusters |

`low` and `critical` use a built-in band so they do not flicker around the limit (5% and 3%). Change any of them in `[predicates]`.

**Properties:** `charge`, `mode`, `status`, `fill`, `stockpile`, `oxygen`, `position`, `angle`, `locked`, `attached`, `detected`, `occupied`, `dampeners`, `handbrake` and `effectiveness`.

**State words** are compared by name and also work as predicates: doors (`open`, `opening`, `closed`, `closing`), landing gear (`locked`, `unlocked`, `readytolock`), pistons (`extending`, `extended`, `retracting`, `retracted`, `stopped`), air vents (`pressurized`, `pressurizing`, `depressurized`, `depressurizing`), batteries (`auto`, `recharge`, `discharge`) and jump drives (`charging`, `jumping`, `ready`).

@tab MAPS

| Predicate | True when | Applies to |
|---|---|---|
| `moving` | the ship is moving faster than 0.1 m/s | ship |
| `stopped` | the ship is not moving | ship |
| `inspace` | there is no gravity | ship |
| `ingravity` | there is gravity | ship |

**Properties:** `speed`, `gravity` and `altitude` (above the surface of the planet). Use `ship` as the target, for example `if ship altitude < 100;`.

@tab Mother GUI

Mother GUI does not define its own predicates. It uses every predicate from Mother Core, and from Mother OS and MAPS when they run on the same construct, so a menu can react to the state of your ship.

```ms title="Mother GUI > Custom Data"
[rules]
Alert=
| when "Batteries" critical;
|   view/notify "Cockpit:1" "Batteries critical" --level=error;
```

:::

#### Common Recipes

Rules go in the `[rules]` section of the programmable block's Custom Data. Commands and menu entries can use `if` directly. Rules run when a condition changes, so a rule only fires when its condition goes from false to true, and its optional `else;` branch fires when it goes back to false. Replace the quoted block and group names with your own.

::: tabs

@tab Airlock

Two commands cycle the airlock, and each step checks that the previous one worked before moving on. The inner door must be closed before the vent depressurizes, and the vent must be depressurized before the outer door opens. Two rules act as an interlock, so both doors can never be open at the same time, even if a player opens one by hand.

```ms title="Mother OS > Custom Data"
[commands]
AirlockExit=
| door/close "Airlock Inner";
| wait 2;
| if "Airlock Inner" closed;
|   vent/depressurize "Airlock Vent";
|   wait 5;
|   if "Airlock Vent" depressurized;
|     door/open "Airlock Outer";
|   else;
|     view/notify "Cockpit:1" "Airlock is still depressurizing." --level=warning;
|   end;
| else;
|   view/notify "Cockpit:1" "Inner door is blocked." --level=error;
| end;

AirlockEnter=
| door/close "Airlock Outer";
| wait 2;
| if "Airlock Outer" closed;
|   vent/pressurize "Airlock Vent";
|   wait 5;
|   if "Airlock Vent" pressurized;
|     door/open "Airlock Inner";
|   else;
|     view/notify "Cockpit:1" "Airlock is still pressurizing." --level=warning;
|   end;
| else;
|   view/notify "Cockpit:1" "Outer door is blocked." --level=error;
| end;

[rules]
InterlockOuter=
| when "Airlock Outer" open;
|   door/close "Airlock Inner";

InterlockInner=
| when "Airlock Inner" open;
|   door/close "Airlock Outer";
```

@tab Landing Lights

Turn the landing lights on when the ship drops below 100 m, and off again when it climbs. `--band=20` keeps the lights from flickering when you hover near 100 m, so they only switch off above 120 m. `--for=2` waits for two seconds before reacting. `altitude` has no value in space, so the lights stay off there. A second rule parks the ship when the landing gear locks: the batteries charge (keeping one in auto mode) and the tanks stockpile.

```ms title="Mother OS > Custom Data"
[rules]
LandingLights=
| when ship altitude < 100 --band=20 --for=2;
|   block/on "Landing Lights";
| else;
|   block/off "Landing Lights";

Parked=
| when "Landing Gear" locked --for=2;
|   block/off "Landing Lights";
|   battery/charge "Batteries" --backup=BackupBattery;
|   tank/stockpile "Hydrogen Tanks";
| else;
|   battery/auto "Batteries";
|   tank/share "Hydrogen Tanks";
```

`altitude` is provided by MAPS. Mother OS can use it without any setup as long as MAPS runs on the same construct.

@tab Space Transition

Switch engine groups when the ship leaves a planet's gravity. Atmospheric thrusters do nothing in space, so turn them off and bring the hydrogen thrusters online, then reverse it on the way back in. `--for=3` stops the switch from firing while the ship skims the edge of the atmosphere.

```ms title="Mother OS > Custom Data"
[rules]
Atmosphere=
| when ship inspace --for=3;
|   block/off "Atmospheric Thrusters";
|   block/on "Hydrogen Thrusters";
|   view/notify "Cockpit:1" "Entered space." --level=info;
| else;
|   block/on "Atmospheric Thrusters";
|   block/off "Hydrogen Thrusters";
|   view/notify "Cockpit:1" "Entered gravity." --level=info;
```

`inspace` is only true when there is no gravity at all. To switch earlier, compare the `gravity` property in m/s² instead (the ship's gravity is about 9.8 at 1 g):

```ms title="Mother OS > Custom Data"
[rules]
Atmosphere=
| when ship gravity < 2 --band=1 --for=3;
|   block/off "Atmospheric Thrusters";
|   block/on "Hydrogen Thrusters";
| else;
|   block/on "Atmospheric Thrusters";
|   block/off "Hydrogen Thrusters";
```

`inspace`, `ingravity` and `gravity` are provided by MAPS, so the rule works in Mother OS or Mother GUI as long as MAPS runs on the same construct.

@tab Docking

React to the connector instead of writing a hook for every state. Once the ship is docked, charge the batteries (keeping one in auto mode as a backup) and stockpile the tanks. When it leaves, go back to normal. `--for=2` ignores a connector that briefly connects while you manoeuvre.

```ms title="Mother OS > Custom Data"
[rules]
Docked=
| when "Dock" connected --for=2;
|   battery/charge "Batteries" --backup=BackupBattery;
|   tank/stockpile "Hydrogen Tanks";
|   block/off "Hydrogen Thrusters";
| else;
|   battery/auto "Batteries";
|   tank/share "Hydrogen Tanks";
|   block/on "Hydrogen Thrusters";
```

A command can also check a connector before it does something:

```ms title="Mother OS > Custom Data"
[commands]
Undock=
| if "Dock" connected;
|   connector/unlock "Dock";
|   wait 1;
| end;
| block/on "Hydrogen Thrusters";
```

@tab Low Power

Warn early, then save power when it gets critical. `low` and `critical` already include a built-in band, so these rules will not flicker. `--at` changes the threshold for a single rule, here warning at 25% instead of 20%.

```ms title="Mother OS > Custom Data"
[rules]
LowBattery=
| when "Batteries" low --at=25%;
|   view/notify "Cockpit:1" "Batteries low." --level=warning;
| else;
|   view/notify "Cockpit:1" "Batteries recovered." --level=success;

PowerSaver=
| when "Batteries" critical --for=3;
|   block/off "Spotlights";
|   block/off "Projectors";
|   view/notify "Cockpit:1" "Power saver on." --level=error;
| else;
|   block/on "Spotlights";
|   block/on "Projectors";
```

@tab Menu Toggle

Use `if` in a menu entry to replace separate On and Off buttons with a single one. Because `on` and `off` are predicates for any functional block, this works for lights, doors, thrusters and more.

```ms title="Mother GUI > Custom Data"
[menu:Lighting]
Headlights=
| if "Headlights" on;
|   block/off "Headlights";
|   view/notify "Cockpit:1" "Headlights off." --level=success;
| else;
|   block/on "Headlights";
|   view/notify "Cockpit:1" "Headlights on." --level=success;
| end;
```

:::

Explore Mother OS: [Upgrade Guide](./IngameScript/UpgradeGuide.md) | Explore Mother Core:  [Upgrade Guide](./Framework/Developer/GettingStarted/UpgradeGuide.md)

---

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


