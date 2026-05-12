---
next: /MotherGUI/Configuration.md
---

# Installation

[[toc]]

## Prerequisites

To run Mother GUI, your grid should have:

1. A programmable block with the Mother GUI script loaded.
2. At least one screen-capable block you want Mother GUI to control.

Supported display targets include:

- LCD panels and other text panels
- Cockpit surfaces
- Programmable block surfaces
- Sound block surfaces

## Setup

### 1. Load Mother GUI into a programmable block

Open a programmable block, select `Edit`, and choose the Mother GUI script from the script list.

### 2. Rename the programmable block

Give the block a clear name such as `Mother GUI`. This makes the block easier to find later when you are editing Custom Data or linking commands.

### 3. Configure a display surface

Open the Custom Data for the block that owns the surface you want to use and add a `[surfaces]` section.

```ms title="Bridge LCD > Custom Data"
[general]
scale=1.15

[surfaces]
0=MainMenu
```

If you are targeting a cockpit or another block with multiple surfaces, use the correct zero-based surface index.

```ms title="Flight Seat > Custom Data"
[surfaces]
0=MainMenu
1=RotorView "Port Rotor"
```

### 4. Add a menu definition

Define your main menu in the Mother GUI programmable block's Custom Data.

```ms title="Mother GUI > Custom Data"
[general]
defaultMenu=MainMenu

[menu:MainMenu]
Mechanical=
.Rotor=view/go self "RotorView" "Port Rotor"
.Piston=view/go self "PistonView" "Lift Piston"
.Door=view/go self "DoorView" "Hangar Door"
```

### 5. Recompile or run the script

After saving your changes, recompile the programmable block or run `boot` if needed. Mother GUI will rediscover configured displays and render the initial menu or view.

## First Check

After setup, confirm that:

1. Your target screen shows a Mother GUI menu or view.
2. The programmable block compiles without errors.
3. Menu entries that use `view/go self ...` open the expected view on the same display.

The next step is learning how Mother GUI reads Custom Data and how to structure menus and surfaces cleanly.