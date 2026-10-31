# Examples

Let's look at some practical Mother GUI setups. See [MenuView](./MenuView.md) for the full menu syntax and [Commands](./Commands.md) for available commands.

[[toc]]

## GUI Template

This template is a complete control panel for a small ship. It gives you a main menu with submenus for systems, lights, thrusters, sensors, tanks, power, displays, the projector, the antenna, a utilities menu (purge storage, purge almanac, halt, and reboot), and a map scale selector if yor are running [Mother Autopilot System](./../MotherAutopilotSystem/README.md). 

Copy it, then change the `[variables]` section to match your own block and group names.

### Setup
1. Install [Mother GUI](./Installation.md).
2. Install [Mother OS](./../IngameScript/IngameScript.md).
3. (Optional) Install [Automatic LCDs 2](https://steamcommunity.com/sharedfiles/filedetails/?id=822950976) - It's an incredible script and lives on all my grids.
4. Paste the **Mother GUI** template below into the **Custom Data** of the `Mother GUI` programmable block, and the **Mother OS** template into the **Custom Data** of the `Mother OS` programmable block.
5. Update the values in `[variables]` to match the names of your blocks and groups.
6. Recompile or restart the Mother GUI programmable block.

The `[surfaces]` section on the Mother GUI programmable block shows a `LogView` on its own screen. To display the menu on a cockpit, configure the cockpit surface as described in [Configuration](./Configuration.md):

```ms title="Cockpit [LCD] > Custom Data"
[surfaces]
1="Main Menu"
```

:::tip Variables
Entries like `"$MAIN_SCREEN"` are replaced with the value of the matching variable in `[variables]`. Defining names once at the top means you only edit one place when your block names change.
:::

### Template

:::tabs

@tab Mother GUI

```ms title="Mother GUI > Custom Data"
[general]
debug=false

[channels]
default=

[surfaces]
0=LogView "Mother GUI"

[variables]
; Change these values to match your ship's block and group names.
MAIN_SCREEN="Cockpit [LCD]:0"
MENU_SCREEN="Cockpit [LCD]:1"
COCKPIT="Cockpit [LCD]"
BATTERIES=Batteries
SEARCHLIGHTS=Searchlights
LIGHTS_COLLISION="Lights - Collision"
LIGHTS_POSITION="Lights - Position"
LIGHTS_HEADLIGHT="Lights - Headlight"
THRUSTERS_ATMOSPHERIC=ThrustersAtmospheric
THRUSTERS_HYDROGEN=ThrustersHydrogen
THRUSTERS_ION=ThrustersIon
SENSORS=Sensors
TANKS_O2=TanksO2
TANKS_H2=TanksH2
REACTOR=Reactor
PROJECTOR=Projector
ANTENNA=Antenna
HOLOLCDS_GROUP="HoloLCDs"
HOLOLCD_LEFT="HoloLCD 1 [LCD]"
HOLOLCD_RIGHT="HoloLCD 2 [LCD]"
;------------------------------------------------------
; Main menu of menu system.
; Autolcd views are defined in the Mother OS 
; custom data.
;------------------------------------------------------
;
[menu:Main Menu]
System=
| view/go self SystemMenu --title=System;
| autolcd/print "$MAIN_SCREEN" SystemView;
Flight=
| view/go self FlightMenu --title=Flight;
| autolcd/print "$MAIN_SCREEN" FlightView;
Lights=
| view/go self LightsMenu --title=Lights;
| autolcd/print "$MAIN_SCREEN" LightsView;
Thrusters=
| view/go self ThrustersMenu --title=Thrusters;
| autolcd/print "$MAIN_SCREEN" ThrustersView;
Sensors=view/go self SensorsMenu --title=Sensors;
Tanks=
| view/go self TanksMenu --title=Tanks;
| autolcd/print "$MAIN_SCREEN" TanksView;
Power=
| view/go self PowerMenu --title=Power;
| autolcd/print "$MAIN_SCREEN" PowerView;
Map=
| view/go self MapMenu --title=Map;
| autolcd/clear "$MAIN_SCREEN";
| view/go "$MAIN_SCREEN" MapView;
| wait 1;
| view/go "$MAIN_SCREEN" MapView;
Displays=
| view/go self DisplaysMenu --title=Displays;
Projector=
| view/go self ProjectorMenu --title=Projector;
Antenna=
| view/go self AntennaMenu --title=Antenna;
Utilities=
| view/go self UtilitiesMenu --title=Utilities;
;------------------------------------------------------
; Main system commands menu.
;------------------------------------------------------
;
[menu:SystemMenu]
Start=
| start;
| view/notify "$MENU_SCREEN" "System starting." --level=success;
Shutdown=
| shutdown;
| view/notify "$MENU_SCREEN" "System shutting down." --level=success;
;------------------------------------------------------
; Flight systems menu.
;------------------------------------------------------
;
[menu:FlightMenu]
Thrusters=view/go self ThrustersMenu;
;------------------------------------------------------
; Light control menu.
;------------------------------------------------------
;
[menu:LightsMenu]
Searchlights=
| view/go self SearchlightsMenu --title=Searchlights;
Collision=
| view/go self CollisionLightsMenu --title="Collision Lights";
Position=
| view/go self PositionLightsMenu --title="Position Lights";
Headlight=
| view/go self HeadlightsMenu --title=Headlights;
;------------------------------------------------------
; Searchlight control menu.
;------------------------------------------------------
;
[menu:SearchlightsMenu]
On=
| block/on "$SEARCHLIGHTS";
| view/notify "$MENU_SCREEN" "Searchlights on." --level=success;
Off=
| block/off "$SEARCHLIGHTS";
| view/notify "$MENU_SCREEN" "Searchlights off." --level=success;
;------------------------------------------------------
; Collision light (strobe) control menu.
;------------------------------------------------------
;
[menu:CollisionLightsMenu]
On=
| block/on "$LIGHTS_COLLISION";
| view/notify "$MENU_SCREEN" "Collision lights on." --level=success;
Off=
| block/off "$LIGHTS_COLLISION";
| view/notify "$MENU_SCREEN" "Collision lights off." --level=success;
;------------------------------------------------------
; Position light (red/green) control menu.
;------------------------------------------------------
;
[menu:PositionLightsMenu]
On=
| block/on "$LIGHTS_POSITION";
| view/notify "$MENU_SCREEN" "Position lights on." --level=success;
Off=
| block/off "$LIGHTS_POSITION";
| view/notify "$MENU_SCREEN" "Position lights off." --level=success;
;------------------------------------------------------
; Headlight control menu.
;------------------------------------------------------
;
[menu:HeadlightsMenu]
On=
| block/on "$LIGHTS_HEADLIGHT";
| view/notify "$MENU_SCREEN" "Headlights on." --level=success;
Off=
| block/off "$LIGHTS_HEADLIGHT";
| view/notify "$MENU_SCREEN" "Headlights off." --level=success;
;------------------------------------------------------
; Thruster control menu. Control
; atmospheric, hydrogen, and ion
; thrusters.
;------------------------------------------------------
;
[menu:ThrustersMenu]
Atmospheric=
| view/go self AtmosphericThrustersMenu --title="Atmospheric Thrusters";
Hydrogen=
| view/go self HydrogenThrustersMenu --title="Hydrogen Thrusters";
Ion=
| view/go self IonThrustersMenu --title="Ion Thrusters";
;------------------------------------------------------
; Atmospheric thruster control menu.
;------------------------------------------------------
;
[menu:AtmosphericThrustersMenu]
On=
| block/on "$THRUSTERS_ATMOSPHERIC";
| view/notify "$MENU_SCREEN" "Atmospheric thrusters on." --level=success;
Off=
| block/off "$THRUSTERS_ATMOSPHERIC";
| view/notify "$MENU_SCREEN" "Atmospheric thrusters off." --level=success;
;------------------------------------------------------
; Hydrogen thruster control menu.
;------------------------------------------------------
;
[menu:HydrogenThrustersMenu]
On=
| block/on "$THRUSTERS_HYDROGEN";
| view/notify "$MENU_SCREEN" "Hydrogen thrusters on." --level=success;
Off=
| block/off "$THRUSTERS_HYDROGEN";
| view/notify "$MENU_SCREEN" "Hydrogen thrusters off." --level=success;
;------------------------------------------------------
; Ion thruster control menu.
;------------------------------------------------------
;
[menu:IonThrustersMenu]
On=
| block/on "$THRUSTERS_ION";
| view/notify "$MENU_SCREEN" "Ion thrusters on." --level=success;
Off=
| block/off "$THRUSTERS_ION";
| view/notify "$MENU_SCREEN" "Ion thrusters off." --level=success;
;------------------------------------------------------
; Sensor control menu.
;------------------------------------------------------
;
[menu:SensorsMenu]
On=
| block/on "$SENSORS";
| view/notify "$MENU_SCREEN" "Sensors on." --level=success;
Off=
| block/off "$SENSORS";
| view/notify "$MENU_SCREEN" "Sensors off." --level=success;
;------------------------------------------------------
; Gas tank control menu. Access
; hydrogen controls and manage
; oxygen tanks.
;------------------------------------------------------
;
[menu:TanksMenu]
Hydrogen=view/go self HydrogenTankMenu --title="H2 Tanks";
Oxygen=
.Share=
| tank/share "$TANKS_O2";
| view/notify "$MENU_SCREEN" "O2 tanks sharing." --level=success;
.Stockpile=
| tank/stockpile "$TANKS_O2";
| view/notify "$MENU_SCREEN" "O2 tanks stockpiling." --level=success;
.On=
| block/on "$TANKS_O2";
| view/notify "$MENU_SCREEN" "O2 tanks on." --level=success;
.Off=
| block/off "$TANKS_O2";
| view/notify "$MENU_SCREEN" "O2 tanks off." --level=success;
;------------------------------------------------------
; Hydrogen tank control menu.
;------------------------------------------------------
;
[menu:HydrogenTankMenu]
Share=
| tank/share "$TANKS_H2";
| view/notify "$MENU_SCREEN" "H2 tanks sharing." --level=success;
Stockpile=
| tank/stockpile "$TANKS_H2";
| view/notify "$MENU_SCREEN" "H2 tanks stockpiling." --level=success;
On=
| block/on "$TANKS_H2";
| view/notify "$MENU_SCREEN" "H2 tanks on." --level=success;
Off=
| block/off "$TANKS_H2";
| view/notify "$MENU_SCREEN" "H2 tanks off." --level=success;
;------------------------------------------------------
; Power control menu. Set battery mode
; and power state.
;------------------------------------------------------
;
[menu:PowerMenu]
Auto=
| battery/auto "$BATTERIES";
| view/notify "$MENU_SCREEN" "Batteries set to auto." --level=success;
Recharge=
| battery/charge "$BATTERIES";
| view/notify "$MENU_SCREEN" "Batteries recharging." --level=success;
Discharge=
| battery/discharge "$BATTERIES";
| view/notify "$MENU_SCREEN" "Batteries discharging." --level=success;
On=
| block/on "$BATTERIES";
| view/notify "$MENU_SCREEN" "Batteries on." --level=success;
Off=
| block/off "$BATTERIES";
| view/notify "$MENU_SCREEN" "Batteries off." --level=success;
Reactor=view/go self ReactorMenu --title="Reactor"

;------------------------------------------------------
; Reactor control menu.
;------------------------------------------------------
;
[menu:ReactorMenu]
Reactor On=
| block/on "$REACTOR";
| view/notify "$MENU_SCREEN" "Reactor on." --level=success;
Reactor Off=
| block/off "$REACTOR";
| view/notify "$MENU_SCREEN" "Reactor off." --level=success;

;------------------------------------------------------
; Display control menu. Control display
; theme and holo displays.
;------------------------------------------------------
;
[menu:DisplaysMenu]
Theme=
.Day=
| screen/color "$HOLOLCDS_GROUP" white;
| screen/color "$MAIN_SCREEN" white;
| view/notify "$MENU_SCREEN" "Day theme." --level=success;
.Night=
| screen/color "$HOLOLCDS_GROUP" red;
| screen/color "$MAIN_SCREEN" red;
| view/notify "$MENU_SCREEN" "Night theme." --level=success;
HoloLCDs=
| view/go self HoloLCDsMenu --title=HoloLCDs;
;------------------------------------------------------
; Holo LCD control menu.
;------------------------------------------------------
;
[menu:HoloLCDsMenu]
On=
| block/on "$HOLOLCDS_GROUP";
| view/notify "$MENU_SCREEN" "HoloLCDs on." --level=success;
Off=
| block/off "$HOLOLCDS_GROUP";
| view/notify "$MENU_SCREEN" "HoloLCDs off." --level=success;
Left=
| view/go self HoloLCDLeftMenu --title="HoloLCD Left";
Right=
| view/go self HoloLCDRightMenu --title="HoloLCD Right";
;------------------------------------------------------
; Left Holo LCD control menu.
;------------------------------------------------------
;
[menu:HoloLCDLeftMenu]
On=
| block/on "$HOLOLCD_LEFT";
| view/notify "$MENU_SCREEN" "Left HoloLCD on." --level=success;
Off=
| block/off "$HOLOLCD_LEFT";
| view/notify "$MENU_SCREEN" "Left HoloLCD off." --level=success;
;------------------------------------------------------
; Right Holo LCD control menu.
;------------------------------------------------------
;
[menu:HoloLCDRightMenu]
On=
| block/on "$HOLOLCD_RIGHT";
| view/notify "$MENU_SCREEN" "Right HoloLCD on." --level=success;
Off=
| block/off "$HOLOLCD_RIGHT";
| view/notify "$MENU_SCREEN" "Right HoloLCD off." --level=success;
;------------------------------------------------------
; Projector control menu.
;------------------------------------------------------
;
[menu:ProjectorMenu]
On=
| block/on "$PROJECTOR";
| view/notify "$MENU_SCREEN" "Projector on." --level=success;
Off=
| block/off "$PROJECTOR";
| view/notify "$MENU_SCREEN" "Projector off." --level=success;
;------------------------------------------------------
; Antenna control menu.
;------------------------------------------------------
;
[menu:AntennaMenu]
On=
| block/on "$ANTENNA";
| view/notify "$MENU_SCREEN" "Antenna on." --level=success;
Off=
| block/off "$ANTENNA";
| view/notify "$MENU_SCREEN" "Antenna off." --level=success;
;------------------------------------------------------
; Map control menu.
;------------------------------------------------------
;
[menu:MapMenu]
Map Scale=
.100m=
| block/config "$COCKPIT" general.mapScale 100;
| view/notify "$MENU_SCREEN" "Map scale 100m." --level=success;
.200m=
| block/config "$COCKPIT" general.mapScale 200;
| view/notify "$MENU_SCREEN" "Map scale 200m." --level=success;
.500m=
| block/config "$COCKPIT" general.mapScale 500;
| view/notify "$MENU_SCREEN" "Map scale 500m." --level=success;
.1000m=
| block/config "$COCKPIT" general.mapScale 1000;
| view/notify "$MENU_SCREEN" "Map scale 1000m." --level=success;
;------------------------------------------------------
; Utilities menu. Maintenance commands for
; clearing data, stopping routines, and rebooting.
;------------------------------------------------------
;
[menu:UtilitiesMenu]
Purge Storage=
| purge storage --force;
| view/notify "$MENU_SCREEN" "Storage purged." --level=success;
Purge Almanac=
| purge almanac --force;
| view/notify "$MENU_SCREEN" "Almanac purged." --level=success;
Halt=
| halt;
| view/notify "$MENU_SCREEN" "Halted." --level=success;
Reboot=
| view/notify "$MENU_SCREEN" "Rebooting." --level=success;
| Reboot;

[commands]

[hooks]
```

@tab Mother OS

```ms title="Mother OS > Custom Data"
[general]
debug=false

[channels]
default=

[surfaces]
0=LogView "Mother OS"

[variables]
; Change these values to match your ship's block and group names.
MAIN_SCREEN="Cockpit [LCD]:0"
MENU_SCREEN="Cockpit [LCD]:1"
COCKPIT="Cockpit [LCD]"
PB_AUTOPILOT="PB - [Mother Autopilot System]"
PB_GUI="PB - [Mother GUI]"
BATTERIES=Batteries
GYROS=Gyros
SEARCHLIGHTS=Searchlights
LIGHTS=Lights
LIGHTS_COLLISION="Lights - Collision"
LIGHTS_POSITION="Lights - Position"
LIGHTS_HEADLIGHT="Lights - Headlight"
THRUSTERS=Thrusters
THRUSTERS_ATMOSPHERIC=ThrustersAtmospheric
THRUSTERS_HYDROGEN=ThrustersHydrogen
THRUSTERS_ION=ThrustersIon
LANDING_GEAR="Landing Gear"
CONNECTOR=Connector
SENSORS=Sensors
TANKS_O2=TanksO2
TANKS_H2=TanksH2
REACTOR=Reactor
PROJECTOR=Projector
ANTENNA=Antenna
HOLOLCDS_GROUP="HoloLCDs"
HOLOLCD_LEFT="HoloLCD 1 [LCD]"
HOLOLCD_RIGHT="HoloLCD 2 [LCD]"

[commands]
;------------------------------------------------------
; Start all required systems for flight.
;------------------------------------------------------
;
start=
| battery/auto "$BATTERIES";
| dampeners/on;
| block/on "$GYROS";
| block/on "$ANTENNA";
| block/on "$LIGHTS";
| block/on "$THRUSTERS";
| tank/share "$TANKS_O2";
| tank/share "$TANKS_H2";
| block/on "$HOLOLCDS_GROUP";
| wait 0.5;
| view/notify "$MENU_SCREEN" "Systems started." --level=success;
;------------------------------------------------------
; Shutdown all systems that are not
; essential while parked.
;------------------------------------------------------
;
shutdown=
| tank/stockpile "$TANKS_H2";
| tank/stockpile "$TANKS_O2";
| block/off "$THRUSTERS";
| block/off "$LIGHTS";
| block/off "$ANTENNA";
| block/off "$GYROS";
| dampeners/off;
| battery/charge "$BATTERIES";
| block/off "$HOLOLCDS_GROUP";
| wait 0.5;
| view/notify "$MENU_SCREEN" "Systems shutdown."  --level=success;
;------------------------------------------------------
; Reboot all Mother Core scripts on grid.
;------------------------------------------------------
;
Reboot=
| view/notify "$MENU_SCREEN" "Rebooting..." --level=error;
| pb/run "$PB_AUTOPILOT" boot;
| pb/run "$PB_GUI" boot;
| boot;

[autolcd]
;------------------------------------------------------
; System view written in the autolcd standard.
; TG: is a group on the grid, T: is a single block.
;------------------------------------------------------
;
SystemView=
| EnabledCount {TG:$THRUSTERS_ATMOSPHERIC}
| EnabledCount {TG:$THRUSTERS_HYDROGEN}
| EnabledCount {TG:$THRUSTERS_ION}
| EnabledCount {TG:$BATTERIES}
| EnabledCount {TG:$TANKS_H2}
| EnabledCount {TG:$TANKS_O2}
| working {T:$CONNECTOR}
| EnabledCount {TG:$LANDING_GEAR}
| EnabledCount {TG:$GYROS}
;------------------------------------------------------
; Flight view written in the autolcd standard.
;------------------------------------------------------
;
FlightView=
| StopDistance
| StopTime
| Echo
| Echo Thrusters
| Echo
| EnabledCount {TG:$THRUSTERS_ATMOSPHERIC}
| EnabledCount {TG:$THRUSTERS_HYDROGEN}
| EnabledCount {TG:$THRUSTERS_ION}
;------------------------------------------------------
; Thrusters view written in the autolcd standard.
;------------------------------------------------------
;
ThrustersView=
| Echo Thrusters
| Echo
| EnabledCount {TG:$THRUSTERS_ATMOSPHERIC}
| EnabledCount {TG:$THRUSTERS_HYDROGEN}
| EnabledCount {TG:$THRUSTERS_ION}
;------------------------------------------------------
; Lights view written in the autolcd standard.
;------------------------------------------------------
;
LightsView=
| EnabledCount {TG:$LIGHTS}
;------------------------------------------------------
; Tanks view written in the autolcd standard.
;------------------------------------------------------
;
TanksView=
| tanks {T:*} hydrogen
| tanks {T:*} oxygen
| echo
| propbool {TG:$TANKS_H2} Stockpile {H2 - Stockpile}
| propbool {TG:$TANKS_O2} Stockpile {O2 - Stockpile}
;------------------------------------------------------
; Power view written in the autolcd standard.
;------------------------------------------------------
;
PowerView=
| Power {T:*}

[hooks]
```

:::

### How It Works

- **`[variables]`** holds every block and group name in one place. Menu commands reference them with `$NAME`.
- **`MAIN_SCREEN` and `MENU_SCREEN`** are two surfaces of the same cockpit. The menu is shown on `MENU_SCREEN` while `autolcd/print` and `view/go` show live detail views on `MAIN_SCREEN`.
- **Submenus** are opened with `view/go self <MenuName>`. Each one has its own `[menu:...]` section and a `< Back` entry is added automatically.
- **Nested entries** such as `Oxygen` and `Theme` use leading dots to create groups. See [Nested Menu Syntax](./MenuView.md#nested-menu-syntax).
- **Notifications** confirm each action in the footer of the menu screen. See [Notifications](./MenuView.md#notifications).

### Adding Your Own Menu

To add a new device, follow the same three steps used for the Projector and Antenna menus:

1. Add a variable for the block or group name.

    ```ms title="MOTHER GUI > Custom Data"
    [variables]
    TURRET=Turret
    ```

2. Add an entry to `[menu:MainMenu]` that opens a submenu.

    ```ms title="MOTHER GUI > Custom Data"
    Turret=view/go self TurretMenu --title=Turret;
    ```

3. Define the submenu.

    ```ms title="MOTHER GUI > Custom Data"
    [menu:TurretMenu]
    On=
    | block/on "$TURRET";
    | view/notify "$MENU_SCREEN" "Turret on." --level=success;
    Off=
    | block/off "$TURRET";
    | view/notify "$MENU_SCREEN" "Turret off." --level=success;
    ```
    :::tip
    Mother GUI uses the same syntax as Mother OS - so this should look very similar to a typical routine you would write in the [commands] section of the **Custom Data**.
    :::



    ## Conditional Entries

    Menu entries can use `if` steps to react to the state of your blocks, so one entry can replace a pair of On and Off entries or ask for confirmation first. See [Conditional Menu Entries](./MenuView.md#conditional-menu-entries) and the [Conditional Logic](../IngameScript/ConditionalLogic.md) reference.

    ## Demo

Check out the [Nova Blade Mk1 (Steam Workshop)](https://steamcommunity.com/sharedfiles/filedetails/?id=3823300552) - designed as a demonstration aircraft for the synergy of Mother OS, [Mother GUI](../MotherGUI/README.md) and [Mother Autopilot System (MAPS)](./../MotherAutopilotSystem/README.md), all built using the [Mother Core](./Framework/README.md) framework for programmable block scripts in Space Engineers.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/UJhYhdJwrFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>