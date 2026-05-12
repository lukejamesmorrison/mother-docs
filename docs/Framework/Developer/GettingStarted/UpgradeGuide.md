# Upgrade Guide

[[toc]]

## 1.0.0 -> 1.1.0
🕓 15-30 mins

This release includes significant API and runtime changes around construct command sharing, display management, logging, and mechanical block handling. If you've built custom modules, please review this guide carefully.

### Breaking Changes

#### 1. Remote Control Dependency Removed

Mother Core no longer requires a Remote Control block to operate. Remote-control-specific flight logic has moved into MAPS, and general ship state should now be sourced from the first available `IMyShipController` when your script needs mass, gravity, or controller-derived data.

If your startup checks or helper modules previously assumed a Remote Control block was always present, update them before upgrading.

#### 2. Automatic Construct Command Syncing

`IntergridMessageService` and `CommandBus` now automatically handshake with other Mother Core instances on the same construct during boot. That means commands are shared automatically between compatible scripts without extra player configuration.

This also means command collisions matter more in 1.1. If two instances define the same command name, use the new important-command behavior described later in this guide to make one authoritative.

#### 3. Display Surface Configuration

Display rendering is no longer determined by block-name tags like `MMAP`, `MALMANAC`, or `MDEBUG`. Surfaces are now configured directly in block Custom Data using `[surfaces]` assignments.

**Before:**
```csharp title="DisplayModule.cs"
// Searching for displays by name pattern
var mapDisplays = GetBlocksByName("MMAP");
var debugDisplays = GetBlocksByName("MDEBUG");
```

**After:**
```ms title="Display Block > Custom Data"
[surfaces]
0=MainMenu
1=MapView
2=LogView "Mother OS"
```

Your script should treat surface/view assignment as configuration on the display block, not something inferred from the block's name.

#### 4. Debug/Log Consolidation

The separate `Debug` and `Log` modules have been consolidated into a unified `Log` core module.

**Before:**
```csharp title="MissileGuidanceModule.cs"
Debug.Write("Debug message");

// DEBUG display type
```

**After:**
```csharp title="MissileGuidanceModule.cs"
Log.Info("Info message");
Log.Error("Error message");

// LOG display type (DEBUG is deprecated)
```

#### 5. Map and Almanac Displays Decoupled

Map and Almanac display rendering has been moved out of Mother Core and into MAPS (Mother Autopilot System). If your script rendered map or almanac displays, you'll need to either:

1. Depend on MAPS being installed alongside your script, or
2. Implement your own rendering logic

#### 6. Mechanical and Merge Block Tracking

A new `MechanicalBlockModule` core module has been added to handle attach/detach state changes for rotors, pistons, and hinges. Mother Core also now updates the Block Catalogue when merge blocks merge or unmerge. Extension modules can subscribe to these events instead of relying on manual rescans.

```csharp title="MissileGuidanceModule.cs"
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

Merge block subscriptions follow the same pattern:

```csharp title="MissileGuidanceModule.cs"
public override void Boot()
{
    Subscribe<MergeBlockLockedEvent>();
    Subscribe<MergeBlockOffEvent>();
}
```

#### 7. Instance Nomenclature Changes

The terminology for referencing script instances has been clarified throughout the codebase:

| Old Term | New Term | Meaning |
|----------|----------|---------|
| `local` | `self` / `this` | The current script instance |
| `local` (other scripts) | `construct` | Other Mother instances on the same physical construct |
| `remote` (in some contexts) | `remote` | Instances communicating via antenna (not on this construct) |

**CommandBus:**
```csharp title="CommandBus.cs"
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
```csharp title="IntergridMessageService.cs"
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
```csharp title="Almanac Record"
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

```csharp title="SetPistonDistanceCommand.cs"
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

```csharp title="BaseModuleCommand.cs"
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

```csharp title="MissingGuidanceModule.cs"
public override void Boot()
{
    Subscribe<MergeBlockLockedEvent>();
    Subscribe<MergeBlockOffEvent>();
}
```

#### Mechanical Block Attach/Detach Events

Block Catalogue updates when mechanical connections change:

```csharp title="MissingGuidanceModule.cs"
Subscribe<MechanicalBlockAttachedEvent>();
Subscribe<MechanicalBlockDetachedEvent>();
```

#### Hexadecimal Color Support

`ColorHelper` now accepts hexadecimal color values:

```csharp title="LightModule.cs"
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

```csharp  title="IFFModule.cs"
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

- [ ] Remove Remote Control assumptions from startup and controller lookup logic
- [ ] Replace block-name display tags like `MMAP`, `MALMANAC`, and `MDEBUG` with `[surfaces]` assignments on the target block
- [ ] Audit any code that infers renderer choice from a block's name
- [ ] Replace `Debug.Write()` with `Log.Info()` or `Log.Error()`
- [ ] Update instance terminology (`local` → `self`/`construct`, see nomenclature section)
- [ ] If using map/almanac rendering, document MAPS dependency or implement custom rendering
- [ ] Access variables via `Mother.ConfigVariables` dictionary instead of deprecated methods

---

## 1.0.0
🕓 0 mins

Initial release.
<!-- ## 0.2.X -> 0.2.X -->