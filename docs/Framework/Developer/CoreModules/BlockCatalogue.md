# Block Catalogue

[[toc]]

`BlockCatalogue` is Mother Core's block discovery layer. It crawls the construct, caches terminal blocks, parses block Custom Data, tracks tags, and runs hooks when other modules ask for them.

It is also the backbone behind most helper methods exposed on `BaseModule`, including `GetBlocksByName<T>()`.

## Getting Blocks by Type

Use `GetBlocks<T>()` when you want every block of a type, optionally filtered.

```csharp title="ThrusterModule.cs"
List<IMyThrust> allThrusters = GetModule<BlockCatalogue>().GetBlocks<IMyThrust>();

List<IMyThrust> hydrogenThrusters = GetModule<BlockCatalogue>().GetBlocks<IMyThrust>(
    thruster => thruster.BlockDefinition.SubtypeName.Contains("Hydrogen")
);
```

## Getting Blocks by Name, Group, or Tag

`GetBlocksByName<T>()` resolves three different targets:

1. A block name.
2. A block group name.
3. A tag when the string starts with `#`.

```csharp title="DockingModule.cs"
IMyShipConnector connector = GetBlocksByName<IMyShipConnector>("Dock Connector")
    .FirstOrDefault();

List<IMyThrust> lateralThrusters = GetBlocksByName<IMyThrust>("Lateral Thrusters");
List<IMyThrust> dockingThrusters = GetBlocksByName<IMyThrust>("#docking");
```

## Working with Tags

Tags are stored in block Custom Data under `[general] tags=` and avoid the construct-merge problems of vanilla block groups.

```ms title="Hydrogen Thruster > Custom Data"
[general]
tags=docking,retro
```

You can also set a tag from code. `SetBlockWithTag()` accepts a block instance, not a block name.

```csharp title="DockingModule.cs"
IMyShipConnector connector = GetBlocksByName<IMyShipConnector>("Dock Connector")
    .FirstOrDefault();

if (connector != null)
    GetModule<BlockCatalogue>().SetBlockWithTag(connector, "docking");
```

## Reading Block Configuration

`GetBlockConfiguration()` returns a `MyIni` snapshot for a block that Mother has already parsed.

```csharp title="DisplayModule.cs"
IMyTextSurfaceProvider panel = GetBlocksByName<IMyTextSurfaceProvider>("Bridge LCD")
    .FirstOrDefault();

if (panel != null)
{
    MyIni config = GetModule<BlockCatalogue>().GetBlockConfiguration(panel as IMyTerminalBlock);
    string profile = $"{config.Get("general", "profile")}";
    Mother.Print($"Display profile: {profile}");
}
```

## Running Hooks

Hooks are command strings stored in block Custom Data or in the programmable block configuration. `BlockCatalogue` resolves them and forwards the command text to `CommandBus`.

```ms title="Connector > Custom Data"
[hooks]
onLock=light/color "Dock Light" red;
onUnlock=light/color "Dock Light" green;
```

```csharp title="DockingModule.cs"
IMyShipConnector connector = GetBlocksByName<IMyShipConnector>("Dock Connector")
    .FirstOrDefault();

if (connector != null)
    GetModule<BlockCatalogue>().RunHook(connector, "onLock");
```

## Monitoring State Changes

The usual pattern is to let your module register state monitoring through the `BaseModule` helper `RegisterBlockTypeForStateMonitoring<T>()`, while `BlockCatalogue` performs the batched checks behind the scenes.

```csharp title="DockingModule.cs"
public override void Boot()
{
    RegisterBlockTypeForStateMonitoring<IMyShipConnector>(
        connector => connector.Status,
        (block, state) =>
        {
            var connector = block as IMyShipConnector;
            var status = state as MyShipConnectorStatus?;

            if (connector != null && status == MyShipConnectorStatus.Connected)
                GetModule<BlockCatalogue>().RunHook(connector, "onLock");
        }
    );
}
```

`BlockCatalogue` processes monitored blocks in batches of 50 per cycle, which keeps continuous monitoring affordable on larger constructs.

## Emitted Events

| Event | When it fires | `eventData` |
| - | - | - |
| `BlockConfigChangedEvent` | Any cached block Custom Data changes during runtime | `IMyTerminalBlock` |
| `SystemConfigChangedEvent` | The programmable block Custom Data changes during runtime | `IMyTerminalBlock` |