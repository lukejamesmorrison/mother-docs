# Upgrade Guide

[[toc]]

## 0.1.0 - Initial Release
🕓 5 mins

Welcome to the Mother Autopilot System (MAPS)! This is the first release of MAPS as a standalone companion script. If you previously used autopilot features in Mother OS, this guide will help you migrate.

### Coming from Mother OS?

MAPS contains the flight-related modules that were previously part of Mother OS:
- **FlightControlModule** - Automated flight control
- **FlightPlanningModule** - Flight plan creation and execution
- **DockingModule** - Automated docking procedures
- **AttitudeModule** - Gyroscope control (formerly GyroModule)
- **MapModule** - Map and Almanac display rendering

### Installation

1. Subscribe to MAPS on the Steam Workshop
2. Load the MAPS script into a programmable block on your grid
3. Ensure Mother OS is running on another programmable block
4. Both scripts will automatically sync commands during boot

### Command Changes

| Old Command (Mother OS) | New Command (MAPS) |
|------------------------|-------------------|
| `nav/set-flight-plan`  | `fp/set`          |
| `gyro/face`            | Available in MAPS |

### Display Configuration

Map and Almanac displays are now rendered by MAPS. Configure displays using the block's Custom Data:

```ini
[general]
type=map
```

Available display types in MAPS:
- `map` - Visual map of tracked grids and waypoints
- `almanac` - List of almanac records

::: tip Automatic Command Sharing
You don't need to remember which script has which command. Mother Core automatically syncs commands between all Mother-powered scripts on your construct. Just run the command and it will be routed to the correct script.
:::
