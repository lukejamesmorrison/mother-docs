# Announcements

<!-- [[toc]] -->

---

<!-- Add new announcements below this line, with the most recent at the top -->

## Version 1.1 Update - XX May 2026

We're excited to announce version 1.1 of the Mother ecosystem! This update brings powerful new scripting features, introduces the **Mother Autopilot System (MAPS)** as a dedicated companion script, and includes numerous quality-of-life improvements.

### Introducing: Mother Autopilot System (MAPS)

Autopilot features have been split into their own dedicated script called **MAPS** (Mother Autopilot System). This includes:

- **Flight Control Module** - Automated flight and navigation
- **Flight Planning Module** - Flight plan creation and execution
- **Docking Module** - Automated docking procedures  
- **Attitude Module** (formerly GyroModule) - Gyroscope control and orientation
- **Map & Almanac Displays** - Now rendered by MAPS instead of Mother Core

**Why the split?** Separating autopilot into MAPS allows faster development of both Mother OS and autopilot features without script size limitations.

::: tip Seamless Integration
Any Mother-powered script on your construct automatically syncs commands with other instances during boot. Load MAPS into a second programmable block and both scripts will share their command libraries—no configuration needed.
:::

**Command Change:** `nav/set-flight-plan` → `fp/set`

---

### New Scripting Features

#### Variables

Use variables in your commands and routines:

```ini
[variables]
PLAYER=Dave

[commands]
greeting=screen/print BedroomDisplay "Good morning, $PLAYER"
```

#### Command Parameters

Commands can accept arguments with default values:

```ini
[commands]
greeting=screen/print AirlockScreen "Hello, {{player:Space Engineer}}!"
```
```bash
greeting --player="Ellen Ripley"
# => Hello, Ellen Ripley!
```

#### Parallel Command Execution

Run multiple commands simultaneously using curly braces:

```ini
[commands]
; Parallel: open BOTH doors at the same time
openAirlock=wait 5; {door/open AirlockDoor1} {door/open AirlockDoor2}
```

---

### New Commands & Features

#### Wheel Suspension Control

New commands for wheel suspensions:
- `wheel/height` - Set height offset (`--add` / `--sub` supported)
- `wheel/power` - Set power percentage
- `wheel/strength` - Set strength percentage  
- `wheel/friction` - Set friction percentage

#### Cumulative Movement with `--share`

Distribute movement across multiple blocks:

```bash
# 10m total shared between pistons (5m each for 2 pistons)
piston/distance PistonGroup 10 --share

# 90° total shared between rotors (45° each for 2 rotors)  
rotor/rotate RotorGroup 90 --share

# Works with hinges too
hinge/rotate HingeGroup 60 --share
```

#### Merge Block Support

- Block catalogue automatically updates on merge/unmerge
- New hooks: `onMerge`, `onUnmerge`

#### Mechanical Block Attach/Detach

Rotors, Pistons, and Hinges now support:
- Attach/detach commands
- `onAttach` and `onDetach` hooks
- Block catalogue updates when mechanical connections change

#### Other New Features

- **`block/rename`** - Rename terminal blocks programmatically
- **Hexadecimal colors** - Use `#FF0000` anywhere colors are accepted
- **`onBoot` hook** - Trigger commands after successful boot
- **Grid name override** - Set custom grid name via configuration
- **Command priority** - Mark commands as "important" when multiple scripts define the same command name

---

### Improvements

- **No forced reboot** - Editing programmable block CustomData no longer forces a system reboot
- **Consolidated logging** - Debug and log functions merged into unified "Log" system
- **Automatic command sync** - Scripts on the same construct share command libraries automatically
- **LOG/DEBUG display fixes** - Resolved issues with log and debug displays
- **Mechanical block refactor** - Piston, Rotor, and Hinge modules now share common parent for consistency

---

### Upgrade Notes

::: warning For Autopilot Users
If you use flight plans, docking, or gyro commands:
1. Install MAPS into a second programmable block
2. Change `nav/set-flight-plan` to `fp/set`
3. The `gyro/face` command is now in MAPS

Mother OS continues to work for all non-flight features without changes.
:::

### Links

| Mother OS | MAPS | Mother Core |
|-----------|------|-------------|
| [Installation](./IngameScript/Installation.md) | [Installation](./MotherAutopilotSystem/Installation.md) | [Installation](./Framework/Developer/GettingStarted/Installation.md) |
| [Upgrade Guide](./IngameScript/UpgradeGuide.md) | [Upgrade Guide](./MotherAutopilotSystem/UpgradeGuide.md) | [Upgrade Guide](./Framework/Developer/GettingStarted/UpgradeGuide.md) |

---

## Version 1.0 Released - September 29, 2025

The first stable release of Mother OS is here! See the full changelog for details.

---

