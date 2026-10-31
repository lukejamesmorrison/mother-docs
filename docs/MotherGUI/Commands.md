---
next: /MotherGUI/MenuView.md
---

# Commands

Mother GUI exposes a small set of commands for navigation and screen management. These commands can be triggered from the programmable block terminal, toolbars, button panels, timers, event controllers, or other Mother routines. Use them inside `if` steps and `when` rules to change what a display shows based on the state of your blocks. See [Conditional Menu Entries](./MenuView.md#conditional-menu-entries).

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

Go back one step. This works across nested menus, across menu-to-menu jumps, and back from a view owned by another script such as `MapView`.

```ms title="terminal"
view/back "Bridge LCD";
```

::: tip Navigate With 3 Fingers
Every menu with navigation history shows a `< Back` entry at the end of the list, so most displays only need `view/up`, `view/down` and `view/select` to be fully navigable.
:::

### `view/go`

`view/go` is the most flexible command. It can:

- Open a named view
- Switch to a named menu
- Jump to a menu path
- Open a view owned by another script on the construct, such as `MapView` from [MAPS](../MotherAutopilotSystem/Modules/MapModule.md)

```ms title="terminal"
view/go "Bridge LCD" "RotorView" "Port Rotor";
view/go "Bridge LCD" "EngineeringMenu";
view/go "Bridge LCD" "BridgeMenu > Ship Systems > Mechanical";
view/go "Bridge LCD" "MapView";
```

When `view/go` runs from a Mother GUI menu item, you can use `self` instead of a literal display name so the current display targets itself.

```ms title="terminal"
view/go self "DoorView" "Hangar Door";
```

**Options**

| Option | Description |
| - | - |
| `title` | Replace the menu name shown in the header with a custom title. Applies when `view/go` opens a menu path. Wrap titles that include spaces in double quotes. |

```ms title="terminal"
view/go "Cockpit:1" MapMenu --title="Map Menu Title";
```

<!-- The custom title is cleared as soon as the player navigates within the menu. -->

### `view/notify`

Show a short-lived notification in the footer of a display. Use it to confirm that an action ran. This does not guarantee the actions occured, only that Mother processed all commands successful before executing this command.

```
view/notify <Display> <Message> [--level=<Level>] [--duration=<Seconds>]
```

**Options**

| Option | Values | Default | Description |
| - | - | - | - |
| `level` | `info`, `success`, `warning`, `error` | `info` | Sets the color of the notification. Unknown values fall back to `info`. |
| `duration` | Seconds, `1` to `30` | `3` | How long the notification stays on the display. |

```ms title="terminal"
view/notify "Cockpit:1" "Docking complete" --level=success --duration=5;
```

Messages wrap across multiple lines and the notification box grows to fit them. Use `\n` for a line break. A new notification replaces the one currently showing, and navigating does not dismiss it.

Because menu items are commands, you can chain `view/notify` with another command to give feedback from a menu:

```ms title="Mother GUI > Custom Data"
[menu:MainMenu]
Hangar=
.Open=door/open "Hangar Door"; view/notify self "Hangar door opening" --level=success
.Close=door/close "Hangar Door"; view/notify self "Hangar door closing"
```

Since commands are shared across the construct, scripts like Mother OS can also call `view/notify`.

The `menu/up`, `menu/down`, `menu/select`, `menu/back` and `menu/go` commands are aliases of their `view/*` equivalents.

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