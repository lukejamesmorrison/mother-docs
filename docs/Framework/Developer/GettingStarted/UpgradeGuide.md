# Upgrade Guide

[[toc]]

## 1.0.0 -> 1.1.0
🕓 15-30 mins

This release includes significant API changes, particularly around display management, logging, and mechanical block handling. If you've built custom modules, please review this guide carefully.

### Breaking Changes

#### 1. Display Type Configuration

Display types are no longer determined by the block name. The `type` property is now set in the block's Custom Data under `[general]`.

**Before:**
```csharp
// Searching for displays by name pattern
var mapDisplays = GetBlocksByName("MMAP");
var debugDisplays = GetBlocksByName("MDEBUG");
```

**After:**
```csharp
// Displays are now configured via Custom Data
// [general]
// type=log
// source=MotherOS
// surfaceIndex=1

// Use DisplayModule to get surfaces for a display type
var mapSurfaces = DisplayModule.GetSurfacesForDisplayType("map");
var logSurfaces = DisplayModule.GetSurfacesForDisplayType("log");
```

The `source` property replaces any script-specific prefixes in block names.

#### 2. Debug/Log Consolidation

The separate `Debug` and `Log` modules have been consolidated into a unified `Log` core module.

**Before:**
```csharp
Debug.Write("Debug message");

// DEBUG display type
```

**After:**
```csharp
Log.Info("Info message");
Log.Error("Error message");

// LOG display type (DEBUG is deprecated)
```

#### 3. Map and Almanac Displays Decoupled

Map and Almanac display rendering has been moved out of Mother Core and into MAPS (Mother Autopilot System). If your script rendered map or almanac displays, you'll need to either:

1. Depend on MAPS being installed alongside your script, or
2. Implement your own rendering logic

#### 4. Mechanical Block Module Added

A new `MechanicalBlockModule` core module has been added to handle attach/detach state changes for rotors, pistons, and hinges. This module emits events that your extension modules can subscribe to.

```csharp
public override void Boot()
{
    // Subscribe to mechanical block events
    Subscribe<MechanicalBlockAttachedEvent>();
    Subscribe<MechanicalBlockDetachedEvent>();
}

public override void HandleEvent(IEvent e)
{
    if (e is MechanicalBlockAttachedEvent)
    {
        // Handle attachment - Block Catalogue is automatically updated
    }
    else if (e is MechanicalBlockDetachedEvent)
    {
        // Handle detachment
    }
}
```

#### 5. Instance Nomenclature Changes

The terminology for referencing script instances has been clarified throughout the codebase:

| Old Term | New Term | Meaning |
|----------|----------|---------|
| `local` | `self` / `this` | The current script instance |
| `local` (other scripts) | `construct` | Other Mother instances on the same physical construct |
| `remote` (in some contexts) | `remote` | Instances communicating via antenna (not on this construct) |

**CommandBus:**
```csharp
// Before
Dictionary<long, List<string>> RemoteCommands;
CommandBus.GetLocalCommandNames();
CommandBus.FindScriptWithCommand(name);

// After
Dictionary<long, List<string>> ConstructCommands;
CommandBus.GetSelfCommandNames();
CommandBus.FindInstanceWithCommand(name);
```

**IntergridMessageService:**
```csharp
// Before
IntergridMessageService.LocalPing();
IntergridMessageService.SendLocalCommand(targetId, command);
IntergridMessageService.SendLocalBroadcastRequest(request, callback);
OriginIsLocal(originId);
// Channel: ".local"

// After
IntergridMessageService.ConstructPing();
IntergridMessageService.SendConstructCommand(targetId, command);
IntergridMessageService.SendConstructBroadcastRequest(request, callback);
OriginIsOnConstruct(originId);
// Channel: ".construct" (via CONSTRUCT_CHANNEL_TAG constant)
```

**AlmanacRecord:**
```csharp
// Before
AlmanacRecord.TransponderCode.Local

// After
AlmanacRecord.TransponderCode.Construct
```

---

### New Features

#### Command Priority ("Important" Flag)

When multiple scripts define a command with the same name, you can mark one as "important" using the `!` prefix in Custom Data. Important commands take priority over the same command defined on other Mother Core instances.

**Custom Data (Instance A - authoritative):**
```ms title="Terminal"
[commands]
; This command takes priority across all instances on the construct
!dock=connector/lock DockingPort
```

**Custom Data (Instance B):**
```ms title="Terminal"
[commands]
; This local command will be ignored in favor of Instance A's important command
dock=echo "Local dock command"
```

When Instance B runs `dock`, it executes Instance A's important command instead.

**Force Local Execution:** Use `!!` prefix when running a command to bypass important commands:
```ms title="Terminal"
; Forces local execution, ignoring important commands on other instances
!!dock
```

#### onBoot Hook

A new `onBoot` hook fires after successful boot completion. Users can define this in their Custom Data:

```ms title="Terminal"
[hooks]
onBoot=light/color StatusLight green; screen/print MainDisplay "System Ready"
```

This hook is processed during the boot cycle after all modules have initialized.

#### Cumulative Value Distribution

`BaseModuleCommand` now includes helper methods for distributing values across multiple blocks when the `--share` flag is used. Here's how the `piston/distance` command in Mother OS implements this:

```csharp
public class SetPistonDistanceCommand : BaseModuleCommand
{
    readonly PistonModule Module;
    
    public override string Name => "piston/distance";

    public override string Execute(TerminalCommand command)
    {
        string pistonName = command.Arguments[0];
        string distanceString = command.Arguments[1];
        float targetDistance = float.Parse(distanceString);
        
        // Check if --share flag is present
        bool isShared = IsSharedMode(command.Options);

        List<IMyPistonBase> pistons = Module.GetBlocksByName<IMyPistonBase>(pistonName);

        // Calculate distributed value (divides by block count if shared)
        float distancePerPiston = GetDistributedValue(targetDistance, pistons.Count, isShared);

        pistons.ForEach(piston => {
            Module.SetDistance(piston, distancePerPiston, speed);
        });

        return MessageFormatter.Format(BlockMessages.BlockUpdated, pistonName, $"distance={distanceString}m");
    }
}
```

**Helper methods in `BaseModuleCommand`:**

```csharp
// Returns true if --share option is present
protected bool IsSharedMode(Dictionary<string, string> options)
{
    return options.ContainsKey("share");
}

// Divides value by block count when cumulative mode is enabled
protected float GetDistributedValue(float totalValue, int blockCount, bool isCumulative)
{
    if (isCumulative && blockCount > 1)
        return totalValue / blockCount;
    return totalValue;
}
```

**Usage:**
```ms title="Terminal"
; Each piston extends to 10m
piston/distance PistonGroup 10

; Total 10m shared between pistons (5m each for 2 pistons)
piston/distance PistonGroup 10 --share
```

#### Merge Block Support

The Block Catalogue now automatically updates when merge blocks lock or unlock. Subscribe to merge block events:

```csharp
public override void Boot()
{
    Subscribe<MergeBlockLockedEvent>();
    Subscribe<MergeBlockOffEvent>();
}
```

#### Mechanical Block Attach/Detach Events

Block Catalogue updates when mechanical connections change:

```csharp
Subscribe<MechanicalBlockAttachedEvent>();
Subscribe<MechanicalBlockDetachedEvent>();
```

#### Hexadecimal Color Support

`ColorHelper` now accepts hexadecimal color values:

```csharp
// All of these now work
var color1 = ColorHelper.GetColor("red");
var color2 = ColorHelper.GetColor("255,0,0");
var color3 = ColorHelper.GetColor("#FF0000");
```

#### Variable Support

Users can now define variables in Custom Data and use them in commands:

```ms title="Terminal"
[variables]
SHIP_NAME=Serenity

[commands]
announce=screen/print MainDisplay "Welcome aboard the $SHIP_NAME"
```

Access variables programmatically via the Mother instance:

```csharp
string shipName = Mother.ConfigVariables["SHIP_NAME"];
```

#### Automatic Command Syncing

Scripts running Mother Core now automatically share commands with other instances on the same construct. No additional code required—commands are synced during boot handshake.

---

### Behavioral Changes

#### No Forced Reboot on CustomData Changes

Mother Core no longer forces a system reboot when the programmable block's Custom Data changes. Block-level configuration changes are applied dynamically. Only structural changes (like channel configuration) require a manual `boot` command.

#### Block Catalogue Mechanical Updates

The Block Catalogue now automatically refreshes when:
- Merge blocks merge/unmerge
- Mechanical blocks (rotors, pistons, hinges) attach/detach
- Connectors lock/unlock (existing behavior)

---

### Migration Checklist

- [ ] Update display type lookups to use `DisplayModule.GetSurfacesForDisplayType()`
- [ ] Replace `Debug.Write()` with `Log.Info()` or `Log.Error()`
- [ ] Update instance terminology (`local` → `self`/`construct`, see nomenclature section)
- [ ] If using map/almanac rendering, document MAPS dependency or implement custom rendering
- [ ] Update any hardcoded display name patterns (e.g., `MMAP`, `MDEBUG`) to use Custom Data `type` property
- [ ] Access variables via `Mother.ConfigVariables` dictionary instead of deprecated methods

---

## 1.0.0
🕓 0 mins

Initial release.
<!-- ## 0.2.X -> 0.2.X -->