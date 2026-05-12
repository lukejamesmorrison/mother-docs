# Upgrade Guide

[[toc]]

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
