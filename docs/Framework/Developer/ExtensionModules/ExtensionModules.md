# Extension Modules

Extension modules should be the main body of your scripts. This section will cover the basics of creating an extension module, registering custom terminal commands, and handling events.

[[toc]]

## Creating an Extension Module

Extension modules must implement the `IExtensionModule` interface. It is recommended that they extend the `BaseExtensionModule` class which provides accessors for many common actions.

::: note
[Mother OS](../../../IngameScript/IngameScript.md) is composed mostly of extension modules to enable it's various capabilities.
:::

### Booting a Module
The `Boot()` method of every module is called during boot by Mother.  When Extension modules boot, they may access all [Core Module](../CoreModules/CoreModules.md) instances.  It is important to consider boot order to reduce conflicts among inter-module dependencies and leverage [Events](#events) where they make sense.

```csharp title="MissileGuidanceModule.cs"
class MissileGuidanceModule : BaseExtensionModule
{
    public void Boot()
    {
        // Register commands
        RegisterCommand(new DetonateCommand())

        // Subscribe to events
        Subscribe<WaypointReachedEvent>();
        Subscribe<ReadyForLaunchEvent>();

        // Setup actions
        ConfigureWarheads();
    }
}
```

### Running a Module
You may also run processes each time the program cycles using the `Run()` method, though this is only recommended for specific use cases where you need the module to run every cycle.  Otherwise it is advised to use the [Clock](../CoreModules/Clock.md)'s `Schedule()` method to control the frequency, or use an [Event](#handling-events).

```csharp title="MissileGuidanceModule.cs"
class MissileGuidanceModule : BaseExtensionModule
{
    // Run every program cycle. 
    public void Run()
    {
        DetermineCurrentPosition();
        UpdateThrusters();

        if(IsWithinTerminalRange())
        {
            ArmWarheads();
        }
    }
}
```

### Registering a Module

Mother makes it easy to register Extension Modules via the `RegisterModule` method. This ensure our module is accessible when Mother boots.

```csharp title="Program.cs"
// Instantiate module
MissileGuidanceModule module = new MissileGuidanceModule(this);

// Register module with Mother
Mother.RegisterModule(module);
```

::: important
Extension Modules must conform the the `IExtensionModule` interface.
:::

## Commands

Mother allows modules to register commands that can be executed by players or other modules.  Commands implement the `ITerminalCommand` interface and are registered in the `Boot()` method of the module.

### Creating a Command

To create a custom command, you can extend the `BaseModuleCommand` class.  This class requires the `Execute()` method, which is called when the command is executed. It gives us access to several useful methods that are commonly used in commands.

First we define the command `Name`:

```csharp title="LaunchCommand.cs"
public class LaunchCommand : BaseModuleCommand
{
    // The name of the command
    public string Name => "launch";
    // or we can use a namespace to organize our 
    // commands by function or block   
    public string Name => "missile/launch";
}
```

We instantiate the command with the module as a parameter in the constructor for easy reference.

```csharp title="LaunchCommand.cs"
public class LaunchCommand : BaseModuleCommand
{
    readonly MissileGuidanceModule Module;

    public LaunchCommand(MissileGuidanceModule module)
    {
        Module = module;
    }
}
```

Now we implement the `Execute()` method, which will be called when the command is executed via a player command or other trigger.  The method takes an `ITerminalCommand` object as the only parameter and returns a `string` which will be printed in the terminal.

```csharp title="LaunchCommand.cs"
public class LaunchCommand : BaseModuleCommand
{
    public string Execute(ITerminalCommand command)
    {
        // first argument
        string targetCoordinate = command.Arguments[0];

        // second argument as a double
        string detonationDistance;
        double.TryParse(command.Arguments[1], out detonationDistance);

        // get an option
        string maxSpeed = command.GetOption("maxSpeed");

        // call Launch() method on parent module
        bool success = Module.Launch(targetCoordinate, detonationDistance, maxSpeed);

        if(success)
            return "Missile Launched!";
        else
            return "Missile Launch Failed!";
    }
}
```

### Registering a Command
To register a command, we use `RegisterCommand()` method. We define it in the `Boot()` method of the parent module.  This method accepts an instance of the module to allow access to its specialized methods.

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    public void Boot()
    {
        // Register commands
        RegisterCommand(new LaunchCommand(this));
        RegisterCommand(new DetonateCommand(this));
    }
}
```

## Events

### Subscribing to Events

Mother allows modules to emit and subscribe to events, allowing modules to monitor the behaviour of other modules.  Once subscribed to an event, a module can intercept it via the `HandleEvent()` method:

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    // Subscribe to the event during instantiation
    public override void Boot()
    {
        Subscribe<WaypointReachedEvent>();
    }
 
    // Handle the event when it is emitted by a module
    public override void HandleEvent(IEvent e, object eventData)
    {
        if(e is WaypointReachedEvent)
        {
           Mother.Print("Waypoint Reached!");

           Detonate();
        }
    }

    // Detonate the warhead
    public void Detonate() { }
}
```

### Emitting Events

Modules can emit events using the `Emit()` method.  This method takes an `IEvent` instances as a parameter and an optional `object` of event data.

```csharp title="MissileGuidanceModule.cs"
    public void Detonate(MyMissile missile)
    {
        // Emit the event.  
        // We pass in the event type with missile object as event data.
        Emit<MissileDetonatingEvent>(missile);
    }
```

::: note
The `Emit()` and `Subscribe()` methods are accessors for the [Event Bus](../CoreModules/EventBus.md) via the `BaseExtensionModule` class.
:::

## Blocks

### Getting Blocks From the Grid

Mother's Block Catalogue makes a ledger of all blocks on the grid when it boots. This allows us to access these blocks more efficiency when updated via commands or events. Any `IMyTerminalBlock` on your construct can be accessed via the `GetBlocks()` method. It accepts a block type parameter, which is the type of block you want to get. The method accepts an option `bool` parameter for filtering the retrived blocks. 

::: tip
See Malware's [API Index](https://github.com/malware-dev/MDK-SE/wiki/Api-Index) for more information on block types.
:::

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    public void Boot()
    {
        // Get all thrusters on the grid
        List<IMyThrust> thrusters = Mother
            .GetModule<BlockCatalogue>()
            .GetBlocks<IMyThrust>();

        // or, only get blocks where name contains a key
        List<IMyThrust> thrusters = Mother
            .GetModule<BlockCatalogue>()
            .GetBlocks<IMyThrust>(block => block.CustomName.Contains("key"));
    }
}
```

The more practical situation is when we want to get a specific block on the grid, or multiple blocks within a *group*.  This can be done by via the `GetBlocksByName()` method.  It accepts a block type parameter, a string for the block or group name.

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    public void Boot()
    {
        // Get the thrusters in the group "Booster Thrusters"
        List<IMyThrust> thrusters = Mother
            .GetModule<BlockCatalogue>()
            .GetBlocksByName<IMyThrust>("Booster Thrusters");

        // or, get a specific block by name
        IMyThrust thruster = Mother
            .GetModule<BlockCatalogue>()
            .GetBlocksByName<IMyThrust>("RetroThruster")
            .firstOrDefault();
    }
}
```

::: important
Mother treats all blocks connected via hinges, rotors, and pistons as a single **construct**. It is fully compatible with subgrids and will not interfere with blocks on other grids via connector connections. Programmable blocks do not recompile correctly when unmerging grids via Merge Blocks.
:::

### Monitoring Blocks For Changes

#### Blocks in Motion
Blocks that *move* can leverage the [Activity Monitor](../CoreModules/ActivityMonitor.md) to monitor their changing state ie. angle, distance.  In the case of pistons, we can set a piston in motion, and then stop and lock it in place when it reaches the specified angle. For blocks that change state infrequently, [monitoring for state changes](#state-changes) instead.

```csharp title="MissileGuidanceModule.cs"
// in our module, we will define a method to open our shield flaps and register the piston motion 
```

::: note
The [hinge/rotate](../../../IngameScript/Modules/Extension/HingeModule.md#rotate) command is an example of where the activity monitor is used. Mother OS also used the Activity Monitor to track the motion of hinges and rotors.
:::

#### State Changes
All blocks on the grid can also be monitored for state changes.  The state value of blocks varies by type, so we will define the property to watch, and define an action to handle the state change when it occurs. We do this in the `Boot()` method of our module:

```csharp title="MissileGuidanceModule.cs"
public void Boot()
{
    // Register connectors and monitor the Status property
    RegisterBlockTypeForStateMonitoring<IMyShipConnector>(
        connector => connector.Status, 
        (block, state) => HandleConnectorStateChange(block as IMyShipConnector, state);
    );
}
```

We will create the `HandleConnectorStateChange()` method to accept the new state of the connector and emit an event.

```csharp title="MissileGuidanceModule.cs"
public void HandleConnectorStateChange(IMyShipConnector connector, object newState)
{
    var status = newState as MyShipConnectorStatus?;

    if(status.hasValue)
    {
        switch(newState)
        {
            case ConnectorStatus.Connected:
                Emit<ConnectorLockedEvent>(connector);
                break;
            case ConnectorStatus.Unconnected:
                Emit<ConnectorUnlockedEvent>(connector)
                break;
            default:
                break;
        }
    }
}
```

::: note
The Connector Module's [hooks](../../../IngameScript/Modules/Extension/ConnectorModule.md#hooks) are activated by the connector's state change using the method above.
:::

<!-- ## Examples
1. Connector Module
2. Piston Module -->