# Block Catalogue

The Block Catalogue one of Mother's biggest stars.  It allows Mother to access all blocks on all connected grids easily.  It also manages their configuration during boot and exposes blocks for use later.

When Mother boots, she will cache all `IMyTerminalBlock` blocks on the grid and subgrids.

[[toc]]


## Accessing Blocks

### By Type
You can access blocks by their type, such as `IMyDoor`, `IMyLight`, etc. using the `GetBlocks()` method. This is the most basic way to access blocks.

```csharp
List<IMyThrust> thrusters = BlockCatalogue.GetBlocks<IMyThrust>();
```

We can filter this with an option parameter:

```csharp
List<IMyThrust> retroThrusters = BlockCatalogue.GetBlocks<IMyThrust>(
    block => block.CustomName.Contains("RetroThruster")
);
``` 

<!-- GetBlocksByTag -->
<!-- SetBlocksWithTag -->

### By Block Name
If you want to target blocks by their name, you can use the `GetBlocksByName()` method.

```csharp
List<IMyThrust> retroThrusters = Mother.GetModule<BlockCatalogue>()
    .GetBlocksByName<IMyThrust>("RetroThruster");
```

### By Group Name
If you want to target blocks by their group name, you can use the `GetBlocksBName()` method as well.

```csharp
List<IMyThrust> lateralThrusters = Mother.GetModule<BlockCatalogue>()
    .GetBlocksByName<IMyThrust>("Lateral Thrusters");
```

### By Tag
We also have the ability to access blocks with [tags](#working-with-tags). Again, we can reach for the `GetBlocksByName()` method. We will access our hydrogen engines with the tag `hydrogen` within their Custom Data.

```csharp
List<IMyThrust> lateralThrusters = Mother.GetModule<BlockCatalogue>()
    .GetBlocksByName<IMyThrust>("#hydrogen");
```


## Working With Tags

Tags allow us to create subgroups on our grid without using Grid Terminal System groups.  The problem with using groups is that they merge together when connecting with other grids via a connector.  This means that if you have a group called "Lateral Thrusters" on your ship, and you connect to another ship with the same group name, the two groups will merge into one causing conflict.


**Example Custom Data:**
```ini title="Ion Thruster 1 > Custom Data"
[general]
tags=lateral-thrusters
```

```ini title="Hydrogen Thruster 3 > Custom Data"
[general]
tags=retro-thruster
```

### Setting a Tag
To set a tag on a block, you can use the `SetBlockWithTag()` or `SetBlocksWithTag()` method.  It accepts a block/group/tag name as its first parameter, and the tag to set as its second.

```csharp
// Add tag to the a single block - RetroThruster
BlockCatalogue.SetBlockWithTag("RetroThruster", "retro-thruster");

// Add the tag "lateral-thrusters" to all blocks in the group "Lateral Thrusters"
BlockCatalogue.SetBlocksWithTag("Lateral Thrusters", "lateral-thrusters");
```

### Getting All Blocks With a Tag
To get all blocks with a specific tag, you can use the `GetBlocksByTag()` method. This will return a `List<IMyTerminalBlock>` of blocks where the tag is set in their Custom Data.

```csharp
List<IMyTerminalBlock> lateralThrusters = BlockCatalogue.GetBlocksByTag("lateral-thrusters");
``` 

## Hooks

Mother uses hooks as triggers when certain events occur.  Players can define commands within the Custom Data field that will be excuted when a hook is run.

```ini title="Connector > Custom Data"
[hooks]
onLock=light/color ConnectorLight red;
```

### Running a Hook

Mother registers all hooks during boot, so we only have to target the correct block with the name of the hook. This is most practical to use when using [block state changes](../BuildingAModule/BuildingAModule.md#block-state-changes) to trigger hooks.

```csharp title="ConnectorModule.cs"
IMyShipConnector connector = Mother.GetModule<BlockCatalogue>()
    .GetBlocksByName<IMyShipConnector>("Connector")
    .FirstOrDefault();

// run the onLock hook for the connector
Mother.GetModule<BlockCatalogue>().RunHook(connector, "onLock");
```

### Creating a Custom Hook

We can also define custom hooks to expand what the player has access to.  Remember that during an Extension Module's boot process, we can register blocks for state monitoring. Let's see how we do this in the `ConnectorModule` of [Mother OS](../../../IngameScript/IngameScript.md):

```csharp title="ConnectorModule.cs"
public class ConnectorModule : BaseCoreModule
{
    public override void Boot()
    {
        // register the block for ongoing state monitoring
        RegisterBlockTypeForStateMonitoring<IMyShipConnector>(
            connector => connector.Status,
            (block, state) => HandleConnectorStateChange(block as IMyShipConnector, state)
        );
    }
}
```

Notice the `HandleConnectorStateChange()` method we are calling when the block's state changes. Let's imagine we can currently handle the `onLock` and `onUnlock` hooks. Our method uses the new state to determine what to do.

```csharp title="ConnectorModule.cs"
protected void HandleConnectorStateChange(IMyShipConnector connector, object newState)
{
    var status = newState as MyShipConnectorStatus?;

    var previousStatus = PreviousStates.ContainsKey(connector.EntityId) 
        ? PreviousStates[connector.EntityId] as MyShipConnectorStatus? 
        : null;

    // We are docked
    if (status == MyShipConnectorStatus.Connected)
    {
        BlockCatalogue.RunHook(connector, "onLock");
    }

    // We are undocked
    else if (
        (
            status == MyShipConnectorStatus.Connectable 
            && previousStatus == MyShipConnectorStatus.Connected
        )
        || status == MyShipConnectorStatus.Unconnected
    )
    {
        BlockCatalogue.RunHook(connector, "onUnlock");
    }
}
```

In our connector's Custom Data, we can target these hooks:

```ini title="Connector > Custom Data"
[hooks]
onLock= light/color "Dock Light" red;
onUnlock= light/color "Dock Light" green;
```



If we want to add an `onReady` hook, we simply add it to the `HandleConnectorStateChange()` method above:

```csharp title="ConnectorModule.cs"
protected void HandleConnectorStateChange(IMyShipConnector connector, object newState)
{
    var status = newState as MyShipConnectorStatus?;

    var previousStatus = PreviousStates.ContainsKey(connector.EntityId) 
        ? PreviousStates[connector.EntityId] as MyShipConnectorStatus? 
        : null;

    // We are docked
    // ...

    // We are undocked
    // ...

    // We are ready to lock
    else if (status == MyShipConnectorStatus.Connectable)
    {
        BlockCatalogue.RunHook(connector, "onReady");
    }
}
```

That's it.  Now you can use the `onReady` hook in any connector's Custom Data.

```ini title="Connector > Custom Data"
[hooks]
onReady= light/color "Dock Light" yellow;
onLock= light/color "Dock Light" red;
onUnlock= light/color "Dock Light" green;
```

## Block Configuration

You can configure a block using its Custom Data field.  Mother uses the existing [MyIni](https://github.com/malware-dev/MDK-SE/wiki/VRage.Game.ModAPI.Ingame.Utilities.MyIni) class to parse block configuration.

To get a blocks configuration, you can use the `GetBlockConfiguration()` method:

```csharp
IMyTextPanel textPanel = BlockCatalogue.GetBlocksByName<IMyTextPanel>("HUD Display")
    .FirstOrDefault();

MyIni config = BlockCatalogue.GetBlockConfiguration(textPanel);
```

If we want to get a specific value from the configuration, we can use the `Get()` method:

```csharp
// get the color of the display from the general section
string displayColor = config.Get("general", "color");
```