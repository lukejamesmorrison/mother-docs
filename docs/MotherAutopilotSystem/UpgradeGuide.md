# Upgrade Guide

[[toc]]

## 0.2.0 -> 0.3.0
🕓 2 mins

This release adds ship conditions that every Mother-powered script on your construct can use in [conditional logic](../IngameScript/ConditionalLogic.md), and fixes the `roll` command. There is one breaking change to connector commands.

::: warning Breaking change: connector commands
`connector/lock`, `connector/unlock` and `connector/toggle` are no longer part of Mother Core, so MAPS no longer provides them. [Mother OS](../IngameScript/Modules/Extension/ConnectorModule.md) still does. If a command or flight plan in your MAPS Custom Data runs one of them, Mother OS needs to run on the same construct. The `dock` command is not affected.
:::

::: warning Compatibility
MAPS 0.3 runs on Mother Core 1.2. Update Mother OS and Mother GUI at the same time so every script on the construct is running the same version of Mother Core and shares the same conditions.
:::

### New Features

- **Ship conditions** - MAPS registers `speed`, `moving`, `stopped`, `gravity`, `altitude`, `inspace` and `ingravity` with conditional logic, so a rule or `if` step in any script on the construct can test them. See [Conditions](./Modules/FlightControlModule.md#conditions).

  ```ms title="Mother OS > Custom Data"
  [rules]
  LandingLights=
  | when grid altitude < 100 --buffer=20 --for=2;
  |   block/on "Landing Lights";
  | else;
  |   block/off "Landing Lights";
  ```
  
### Migration Checklist

- [ ] Update Mother OS and Mother GUI alongside MAPS
- [ ] Check that Mother OS runs on the construct if you run `connector/lock`, `connector/unlock` or `connector/toggle` from MAPS
- [ ] (Optional) Use `grid altitude`, `grid inspace` and the other ship conditions in your rules

## 0.1.0 -> 0.2.0
🕓 2 mins

This release lets [Mother GUI](../MotherGUI/README.md) share screens with the MAPS map. There are no breaking changes.

::: warning Compatibility
MAPS 0.2 uses view sharing from Mother Core 1.1.4. Update Mother OS and Mother GUI at the same time so every script on the construct is running the same version of Mother Core.
:::

### New Features

- **Shared `MapView`** - A surface can now switch between a Mother GUI menu and the MAPS map using `view/go`.

  ```ms title="Terminal"
  view/go "Cockpit:0" MapView;
  ```

### Migration Checklist

- [ ] Update Mother Core based scripts (Mother OS, Mother GUI) to the latest version
- [ ] (Optional) Use `view/go` to open `MapView` from a Mother GUI menu

## 0.1.0 - Initial Release
🕓 5 mins

Welcome to the Mother Autopilot System (MAPS)! This is the first release of MAPS as a standalone companion script. If you previously used autopilot features in Mother OS, this guide will help you migrate.

::: warning Compatibility
MAPS 0.1 requires Mother Core 1.1.0 or later. In practice, that means you should update Mother OS to 1.1 at the same time so command sharing and display rendering behave correctly.
:::

### Coming from Mother OS?

MAPS contains the flight-related modules that were previously part of Mother OS:
- **FlightControlModule** - Automated flight control
- **FlightPlanningModule** - Flight plan creation and execution
- **DockingModule** - Automated docking procedures
- **AttitudeModule** - Gyroscope control (formerly GyroModule)
- **MapModule** - Map and Almanac display rendering

If your existing routines, toolbar actions, or hooks use flight features, move them to MAPS. That includes `fp/*`, `fcs/*`, `dock`, and `gyro/face` workflows.

### Installation

1. Subscribe to MAPS on the Steam Workshop
2. Load the MAPS script into a programmable block on your grid
3. Ensure Mother OS is running on another programmable block
4. Both scripts will automatically sync commands during boot
5. Ensure the grid has a Remote Control block for flight planning and autopilot features

### Command Changes

| Old Command (Mother OS) | New Command (MAPS) |
|------------------------|-------------------|
| `nav/set-flight-plan`  | `fp/set`          |
| `gyro/face`            | Available in MAPS |

`dock` and `fcs/*` commands also live in MAPS now. Mother OS no longer owns flight-planning or autopilot behavior.

### Display Configuration

Map and Almanac displays are now rendered by MAPS. If you previously used block-name tags like `[MMAP]`, move those displays to block Custom Data using `[surfaces]` assignments:

```ms title="Block > Custom Data"
[surfaces]
0=MapView
```

Available views:
- `MapView` - Visual map of tracked grids and waypoints
- `AlmanacView` - List of almanac records

::: caution Docking Status
Docking support ships in MAPS 0.1, but it is still best treated as a tuned early feature. Docking is currently recommended in space, and undocking is not yet supported.
:::

### Migration Checklist

- [ ] Install MAPS into a second programmable block on grids that use flight or docking features
- [ ] Update Mother OS and Mother Core to 1.1 before relying on command sharing
- [ ] Replace `nav/set-flight-plan` with `fp/set`
- [ ] Move map and almanac displays from block-name tags to `[surfaces]` assignments
- [ ] Re-test any `dock`, `gyro/face`, or `fcs/*` routines after moving them to MAPS

::: tip Automatic Command Sharing
You don't need to remember which script has which command. Mother Core automatically syncs commands between all Mother-powered scripts on your construct. Just run the command and it will be routed to the correct script.
:::
