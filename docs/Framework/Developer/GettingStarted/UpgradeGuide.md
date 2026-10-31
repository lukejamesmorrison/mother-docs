# Upgrade Guide

[[toc]]

## 1.1.4 -> 1.2.0
🕓 10 mins

This release adds a conditional logic engine, a shorter way to register commands and block vocabulary, and a larger set of build-time size optimizations. There is one breaking change: the `connector/lock`, `connector/unlock` and `connector/toggle` commands are no longer part of Mother Core.

::: warning Update Every Script Together
Scripts share commands, views and now conditions across the construct. Update every Mother-powered script on your construct to Mother Core 1.2.0 so they all share the same vocabulary.
:::

### Breaking Changes

#### 1. Connector Commands Removed

`connector/lock`, `connector/unlock` and `connector/toggle`, along with `ConnectorModule.LockConnector()`, `UnlockConnector()` and `ToggleConnector()`, have been removed from Core. `ConnectorModule` still monitors connectors, emits `ConnectorLockedEvent`, `ConnectorUnlockedEvent` and `ConnectorReadyToLockEvent`, and runs the `onLock`, `onUnlock` and `onReady` hooks, which `BlockCatalogue` relies on.

[Mother OS](../../../IngameScript/Modules/Extension/ConnectorModule.md) still provides the commands. [Mother GUI](../../../MotherGUI/README.md) and [MAPS](../../../MotherAutopilotSystem/README.md) do not. If your script needs them, register them from your own module:

```csharp title="ConnectorCommandsModule.cs"
public override void Boot()
{
    Block<IMyShipConnector>("connector")
        .Command("lock", connector => connector.Connect(), "Connector locked: {0}")
        .Command("unlock", connector => connector.Disconnect(), "Connector unlocked: {0}")
        .Command("toggle", connector => connector.ToggleConnect(), "Connector toggled: {0}");
}
```

### New Features

#### 1. Conditional Logic

The new [`ConditionModule`](../CoreModules/Conditions.md) evaluates conditions of the form `<target> <predicate>` or `<target> <property> <operator> <value>`. Players use them two ways: polled `when` rules in a `[rules]` section, and inline `if` / `elseif` / `else` / `end` steps in any routine.

```ms title="Programmable Block > Custom Data"
[rules]
LowPower=
| when Batteries low;
|   view/notify "Cockpit:1" "Power is low";
| else;
|   view/notify "Cockpit:1" "Power OK";

[commands]
Dock=
| if Connector connectable;
|   connector/lock Connector;
| else;
|   view/notify "Cockpit:1" "Not in range of a connector." --level=error;
| end;
```

Core only provides `enabled` and `working` (with the `on`, `off`, `working` and `broken` predicates), plus connector `status` (`unconnected`, `connectable`, `connected`) and the `disconnected` predicate. Everything else is registered by the extension module that owns the block.

#### 2. Block Vocabulary and `Block<T>()`

`BaseModule.Block<T>(prefix)` returns a `BlockSet<T>` that groups registrations for one block type, so the type is written once. `.Command()`, `.Number()`, `.Flag()`, `.Status()`, `.Monitor()` and `.On()` replace separate `RegisterBlockCommand<T>()`, condition and `RegisterBlockTypeForStateMonitoring<T>()` calls. `RegisterPredicate()` on `BaseExtensionModule` names a condition.

**Before:**
```csharp title="DoorModule.cs"
RegisterBlockCommand<IMyDoor>("door/open", door => door.OpenDoor(), "Door opened: {0}");
RegisterBlockCommand<IMyDoor>("door/close", door => door.CloseDoor(), "Door closed: {0}");
```

**After:**
```csharp title="DoorModule.cs"
Block<IMyDoor>("door")
    .Command("open", door => door.OpenDoor(), "Door opened: {0}")
    .Command("close", door => door.CloseDoor(), "Door closed: {0}")
    .Status("status", door => door.Status);
```

`RegisterBlockCommand<T>()` still works. `RegisterBlockTypeForStateMonitoring<T>()` is unchanged, except it is now `protected internal`. See [Building a Module](../BuildingAModule/BuildingAModule.md#registering-block-commands-and-conditions).

`.Monitor(read)` without a handler dispatches state changes to `.On<TEvent>(state, hook)` declarations. Each one emits the event with the block and runs the block hook (`on` plus the state name by default). This replaces hand-written `if` / `else` state handlers:

```csharp title="AirVentModule.cs"
Block<IMyAirVent>("Airlock Vent")
    // Continously monitor the vent's status
    .Monitor(vent => vent.Status)
    // Trigger the onPressurized hook when state changes to Pressurized
    .On<AirVentPressurizedEvent>(VentStatus.Pressurized);
```

#### 3. Construct-Wide Conditions

Scripts advertise the properties, predicates and state words they define, and answer each other's conditions. Mother GUI can test MAPS's `inspace`, and MAPS can test Mother OS's `low`, with nothing registered in the script that uses them. See [Sharing Vocabulary Across the Construct](../CoreModules/Conditions.md#sharing-vocabulary-across-the-construct). Set `[general] condTimeout` (default `2` seconds) to change how long an inline `if` waits for another script.

#### 4. Lambda Commands

`RegisterCommand(name, minArgs, run, usage)` registers a command as a lambda, so a simple command needs no class, field, constructor or `Name` override. It is available on `BaseModule`, `Mother` and `CommandBus`. Keep a command class for commands that hold their own state. See [Registering a Simple Command](../CoreModules/CommandBus.md#registering-a-simple-command).

```csharp title="ConsoleModule.cs"
RegisterCommand("clear", 0, command =>
{
    ClearConsole();
    return "";
});
```

`TerminalCommand` also gains `GetIncrement(value)`, `IsShared()` and `GetDistributedValue(...)` for lambda commands. The protected `BaseModuleCommand` versions remain and forward to them.

#### 5. Text Compare

An `if` or `elseif` with two values and `==` or `!=` compares them as text, ignoring case: `if $MODE == parked;`. It runs after variables are resolved, takes no options, and is not available in `when` rules.

### Other Changes To Expect

- **Smaller scripts** - The build now runs a [script optimizer and keyword remover](../GettingStarted/ManagingScriptSize.md#build-time-optimization) after MDK packs the script. Expect to save about 2.7K characters in Mother Core. Conditions cost about 4,100 characters in each script, so prune where you can.
- **Rules load after boot** - `when` rules are rebuilt one per cycle, so they start working a few cycles after boot rather than at once. The old rules keep running until the new ones replace them.
- **Runtime variables survive a reload** - `Configuration.Reload` no longer resets variables set at runtime. A variable keeps its runtime value unless its entry in `[variables]` was edited since the last load. A reboot still starts from Custom Data.
- **Own Custom Data writes are not changes** - `BlockCatalogue.Accept` records a configuration the script wrote itself, so `var/set --save` no longer makes every script rebuild its rules.
- **Large grids** - `BlockCatalogue` now reads at most 100 blocks per cycle and stops early once 40% of the instruction limit is used. This fixes "script too complex" on grids with thousands of blocks.
- **Update frequency** - Scripts run at `Update1`.
- **`BlockCatalogue.ReplaceThisKeywordWithBlockName`** is now public.

### Migration Checklist

- [ ] Update every Mother-powered script on your construct to Mother Core 1.2.0
- [ ] Register `connector/lock`, `connector/unlock` and `connector/toggle` from your own module if your script needs them
- [ ] Rebuild your project and check your script size against the 100,000 character limit
- [ ] (Optional) Use `Block<T>()` to register commands, properties and state monitoring for a block type
- [ ] (Optional) Use `RegisterPredicate()` to share your own predicates with the construct
- [ ] (Optional) Use `RegisterCommand(name, minArgs, run)` for commands that need no class

---

## 1.1.0 -> 1.1.4
🕓 5 mins

This release adds shared views between scripts, a `halt` command, and several fixes for merge and unmerge handling. There are no breaking changes. Custom modules that monitor block state should be updated to handle construct refreshes, as described below.

### New Features

#### 1. Shared Views

Scripts now share their views in the same way they share commands. A module can declare a view it draws with `RegisterOwnedView()`, and any other script on the construct can find the owner and ask it to show the view on a display. [Mother GUI](../../../MotherGUI/README.md) uses this to open views from other scripts, such as the [MAPS](../../../MotherAutopilotSystem/Modules/MapModule.md) `MapView`, with `view/go`.

```csharp title="MapModule.cs"
GetModule<IntergridMessageService>()
    .RegisterOwnedView("MapView", (displayName, show) => { /* take or release the surface */ });
```

See [Sharing Views With Other Scripts](../CoreModules/IntergridMessageService.md#sharing-views-with-other-scripts).

::: warning
All scripts that share views must run Mother Core 1.1.4 or later.
:::

#### 2. `halt` Command

The new `halt` command clears all queued delayed tasks and active coroutines. It calls the new `Clock.Halt()` method.

```ms title="Terminal"
halt
```

#### 3. `ConstructRefreshedEvent`

`BlockCatalogue` now emits `ConstructRefreshedEvent` when a construct refresh completes after a merge or unmerge, attach or detach, or a full refresh. Subscribe to it to register blocks again after the grid topology changes.

#### 4. `RegisterBlockTypeForStateMonitoring` Accepts `preserveState`

The method has a new optional `preserveState` parameter. When `true`, blocks that are already monitored keep their previous state, and only new blocks are initialized. Use it when you register blocks again in response to `ConstructRefreshedEvent`, so in-flight transitions are not discarded.

**Before:**
```csharp title="MissileGuidanceModule.cs"
RegisterBlockTypeForStateMonitoring<IMyShipConnector>(
    connector => connector.Status,
    (block, state) => HandleConnectorStateChange(block as IMyShipConnector, state)
);
```

**After:**
```csharp title="MissileGuidanceModule.cs"
public override void Boot()
{
    Subscribe<ConstructRefreshedEvent>();
    Monitor(preserveState: false);
}

public override void HandleEvent(IEvent e, object eventData)
{
    if (e is ConstructRefreshedEvent)
        Monitor(preserveState: true);
}

void Monitor(bool preserveState)
{
    RegisterBlockTypeForStateMonitoring<IMyShipConnector>(
        connector => connector.Status,
        (block, state) => HandleConnectorStateChange(block as IMyShipConnector, state),
        preserveState
    );
}
```

#### 5. Quoted Option Values

Options now support double quotes, so a value can contain spaces.

```ms title="Terminal"
view/go "Cockpit:1" MainMenu --title="Custom Title"
```

### Other Changes To Expect

- **Smaller decal** - The Mother logo on displays is smaller and less imposing.
- **Fixed `var/set --save`** - Saving a variable no longer removes line breaks from custom data.
- **Fixed unmerge detection** - The absorbed grid after a merge now detects unmerge events. `Mother` refreshes `GridTerminalSystem` and `CubeGrid` every run cycle so block discovery is always current.
- **Fixed "Block not found" after merge or unmerge** - Hooks that fire right after a merge or unmerge are held until `ConstructRefreshedEvent` fires, so the block topology is resolved before lookup.
- **Fixed duplicate block registration** - `BlockCatalogue` now de-duplicates incoming blocks by `EntityId` when the grid topology changes.

### Migration Checklist

- [ ] Update every Mother-powered script on your construct to Mother Core 1.1.4
- [ ] Subscribe to `ConstructRefreshedEvent` in modules that register blocks for state monitoring
- [ ] (Optional) Use `RegisterOwnedView()` to share views with other scripts
- [ ] (Optional) Use `RegisterBlockCommand<T>()` for simple block commands to reduce script size

---

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