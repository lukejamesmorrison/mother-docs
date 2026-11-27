---
next: /MotherGUI/CommandLineInterface.md
---

<script setup>
import MotherThemeEditor from '@source/.vuepress/components/MotherGUI/MotherThemeEditor.vue'
</script>

# Configuration

Mother GUI is configured entirely through `Custom Data`. In practice, you will work in two places:

- The Mother GUI programmable block for named menus, the default menu, and the shared GUI theme
- Each display block for surface assignments and optional inline menus

[[toc]]

## Surface Assignments

Mother GUI scans the `[surfaces]` section on each supported display block. Each entry uses this format:

```ms title="Surface Entry Format"
[surfaces]
<surfaceIndex>=<ViewName> [parameter]
```

Examples:

```ms title="Bridge LCD > Custom Data"
[general]
scale=1.15

[surfaces]
0=MainMenu
```
**MainMenu** is a [Named Menu](#named-menus).
<br>

```ms title="Cockpit > Custom Data"
[general]
scale=1.05

[surfaces]
0=MainMenu
1=RotorView "Port Rotor"
```

<!-- <br>

```ms title="Engineering Console > Custom Data"
[surfaces]
0=RotorGridView "2x2:Port Rotor,Starboard Rotor,Top Rotor,Bottom Rotor"
``` -->

Rules worth knowing:

- Surface indices are zero-based. `[0...1...2...3]`
- Parameters are optional.
- Block names with spaces should be wrapped in `""` double quotes.
- A surface can name a view owned by another script on the construct, such as `MapView` from [MAPS](../MotherAutopilotSystem/Modules/MapModule.md). That script draws the surface, and Mother GUI can take it over with `view/go` and `view/back`.
<!-- - Trailing semicolons are ignored in surface entries. -->

## General Display Settings

Mother GUI currently reads two optional display-level settings from `[general]`:

```ms title="Display Settings"
[general]
scale=1.15
size=0
```

- `scale` adjusts the render scale for the display. Menus default to `1.4`.
- `size` can be used when you need to override the default text size behavior on a screen.

In most cases, `scale` is the setting you will use first.

## GUI Themes

Add a `[theme]` section to the **Mother GUI programmable block's Custom Data** to customise the colours across every GUI display. Colours accept exactly six hexadecimal digits (`RRGGBB` or `#RRGGBB`, case-insensitive). 

The following example lists every supported key with its default:

```ini title="Mother GUI > Custom Data"
[theme]
primary=#C20000
accent=#B59336
text=#FFFFFF
bg=#000000
selection=#801919
selection-text=#FFFFFF
success=#00C850
warning=#B59336
danger=#DC3232
```

| Key | Controls |
| --- | --- |
| `primary` | Dial needles, action indicators, and progress fills |
| `accent` | Navigation and limit markers |
| `text` | Primary text and the logo outline |
| `bg` | Full-screen background |
| `selection` | Background of the selected menu row |
| `selection-text` | Selected menu row text; inherits `text` when omitted or invalid |
| `success` | Healthy, unlocked, and active states; success notifications |
| `warning` | Caution states and warning notifications, independently of `accent` |
| `danger` | Locked states, errors, and faults; error notifications |

Secondary colours are derived automatically rather than configured separately:

- Labels and decorative chrome blend `text` with `bg`, using a `text` weight of `166 / 255`.
- Muted text uses a `text` weight of `85 / 255`; separators use `38 / 255`.
- Unlocked dial rings blend `success` with `bg`, using a `success` weight of `179 / 255`, then retain their fixed transparency (alpha `180 / 255`).

### Theme Editor

Use the theme editor to adjust the GUI colours. Select a preset theme to replace the current colours or modify individual colours in the live preview. Click **Copy [theme]** and paste the generated section into the Mother GUI programmable block's Custom Data.

<MotherThemeEditor />

Changes apply when Mother detects a Custom Data configuration change. You only need to include the keys you want to customise.

## Named Menus

Named menus live on the Mother GUI programmable block. We can pass the default view for a surfaces in the `[surfaces]` sections of the custom data.

For a full walkthrough of menu structure, navigation behavior, and practical patterns, see [MenuView](./MenuView.md).

```ms title="Mother GUI > Custom Data"
[surfaces]
0=MainMenu

[menu:MainMenu]
Mechanical=
.Rotor=view/go self "RotorView" "Port Rotor"
.Piston=view/go self "PistonView" "Lift Piston"

Power=
.Reactors=block/on Main Reactors
.Batteries=battery/auto Main Batteries
```

Mother GUI resolves menus in this order:

1. A display-specific named menu (ie. `RotorView`)
2. An player defined menu`[menu:]`

## Inline Menus

If a display needs a one-off menu, define it directly on the block with the `[menu]` section in the custom data.

```ms title="Airlock LCD > Custom Data"
[surfaces]
0=MenuView

[menu]
Airlock=
.Open Outer Door=door/open "Outer Door"
.Close Outer Door=door/close "Outer Door"
.Depressurize=vent/depressurize Airlock Vent
```

Inline menus are useful for local control panels that should not reuse the global menu tree.

## Nested Menu Syntax

Menus use dot prefixes to define depth. Every line still needs an `=` so the INI parser keeps the entry.

```ms title="Nested Menu Example"
[menu:BridgeMenu]
; top level
Ship Systems=
; first level
.Lighting=
; second level
..Red Alert=light/color Warning Lights red
..Clear Alert=light/color Warning Lights whiteS
.Mechanical=
..Rotor=view/go self "RotorView" "Port Rotor"
..Piston=view/go self "PistonView" "Lift Piston"
```

This creates the following menu structure:
```plaintext title="Menu Outline"
Ship Systems /
    |-- Lighting /
        | -- Red Alert
        | -- Clear Alert
    |-- Mechanical /
        | -- Rotor
        | -- Piston
``` 






|||
|--|--|
|![Menu Top Level](./Assets/mother-gui-menu1.png)|![First Level](./Assets/mother-gui-menu2.png)|
|![Second Level](./Assets/mother-gui-menu3.png)|![Third Level](./Assets/mother-gui-menu4.png)|


If you need duplicate labels under the same section, prefix the key with an internal id and a colon. The id is hidden when rendered.

```ms title="Duplicate Labels"
[menu]
Light 1=
.1:Red=light/color MenuLight1 red
.2:Green=light/color MenuLight1 green

Light 2=
.3:Red=light/color MenuLight2 red
.4:Green=light/color MenuLight2 green
```

## Widescreen Behavior

On widescreen displays, `view/go` opens a live view in a side panel while the current menu stays visible. On smaller screens, the selected view replaces the menu until you use `view/back`.

That makes widescreen LCDs a good fit for bridge consoles, while cockpit screens work well as compact detail displays.

![Widescreen Display](./Assets/mother-gui2.png)