---
next: /MotherGUI/MenuView.md
---

# Commands

Mother GUI exposes a small set of commands for navigation and screen management. These commands can be triggered from the programmable block terminal, toolbars, button panels, timers, event controllers, or other Mother routines.

[[toc]]

## Navigation Commands

### `view/up`

Move the current cursor up on a display.

```ms title="terminal"
view/up "Bridge LCD";
```

### `view/down`

Move the current cursor down on a display.

```ms title="terminal"
view/down "Bridge LCD";
```

### `view/select`

Run the selected menu item or enter the selected menu group.

```ms title="terminal"
view/select "Bridge LCD";
```

### `view/back`

Go back one step. This works across nested menus and across menu-to-menu jumps.

```ms title="terminal"
view/back "Bridge LCD";
```

### `view/go`

`view/go` is the most flexible command. It can:

- Open a named view
- Switch to a named menu
- Jump to a menu path

```ms title="terminal"
view/go "Bridge LCD" "RotorView" "Port Rotor";
view/go "Bridge LCD" "EngineeringMenu";
view/go "Bridge LCD" "BridgeMenu > Ship Systems > Mechanical";
```

When `view/go` runs from a Mother GUI menu item, you can use `self` instead of a literal display name so the current display targets itself.

```ms title="terminal"
view/go self "DoorView" "Hangar Door";
```

These are functionally equivalent to the `view/*` commands.

## Screen Commands

### `screen/content`

Change a surface content type.

```ms title="terminal"
screen/content "Bridge LCD" text;
screen/content "Bridge LCD" none;
screen/content "Bridge LCD" script;
```

Supported values are `none`, `script`, and `text`.

### `screen/script`

Switch a display surface into script mode and select a script.

```ms title="terminal"
screen/script "Bridge LCD" "TSS_ArtificialHorizon";
```

Built-in scripts:
|                           |
|-                          |
| TSS_ClockAnalog           |
| TSS_ArtificialHorizon     |
| TSS_ClockDigital          |
| TSS_FactionIcon           |
| TSS_EnergyHydrogen        |
| TSS_FactionStationAdvert  |
| TSS_Gravity               |
| TSS_Velocity              |
| TSS_TargetingInfo         |
| TSS_VendingMachine        |
| TSS_Weather               |
| TSS_Jukebox               |

Other popular display scripts:

|                           |
|-                          |
|RadioSpectrometer          |
|SolarMapTouch_Calibration  |
|SolarMapInfo               |
|SolarMapMap                |
|SolarMapPlanetary          |
|Touch_ButtonPad            |

### `screen/scripts`

Write the available in-game scripts to the targeted surface.

```ms title="terminal"
screen/scripts "Bridge LCD";
```

This command switches the target display to text mode and prints the available script names directly onto the screen.

## Targeting Multi-Surface Blocks

To address a specific surface on a cockpit, programmable block, or sound block, use `Block Name:SurfaceIndex`.

```ms title="terminal"
view/go "Fighter Cockpit:0" "MainMenu";
view/go "Fighter Cockpit:1" "HingeView" "Turret Hinge";
```