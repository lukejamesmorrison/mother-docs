# Extension Modules

[[toc]]

## Creating an Extension Module

Extension modules expose several powerful capabilities for players to leverage. They must implement the `IExtensionModule` interface and it is recommended that they extend the `BaseExtensionModule` class.  This class provides accessors for several core process that are commonly used across extension modules.

```csharp title="MissileGuidanceModule.cs"

### The `Boot` Method
The `Boot()` method of every module is called during boot by Mother.  Extension modules are registered and may access all [Core Module](../CoreModules/CoreModules.md) instances.  It is important to consider boot order to reduce conflicts among inter-module dependencies and leverage [Events](#events) where they make sense.

```csharp title="MissileGuidanceModule.cs"
class MissileGuidanceModule : BaseExtensionModule
{
    public void Boot()
    {
        // Setup actions
        ConfigureWarheads();

        // Register commands
        Commands.Add(new DetonateCommand())

        // Subscribe to events
        Subscribe(typeof(WaypointReachedEvent).Name, this);
        Subscribe(typeof(ReadyForLaunchEvent).Name, this);
    }
}
```

### The `Run` Method
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

## Commands

Mother allows modules to define commands that can be executed by players or other modules.  Commands implement the `ITerminalCommand` interface and are registered in the `Boot()` method of the module.

```csharp title="MissileGuidanceModule.cs"
class MissileGuidanceModule : BaseExtensionModule
{
    public void Boot()
    {
        // Register commands
        Commands.Add(new LaunchCommand();
        Commands.Add(new DetonateCommand();
    }
}
```

### Creating a Custom Command

To create a custom command, you must extends the `BaseModuleCommand` class.  This class requires the `Execute()` method, which is called when the command is executed.

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

We also accept the module as a parameter in the constructor to allow our command access to its methods.

```csharp title="LaunchCommand.cs"
public class LaunchCommand : BaseModuleCommand
{
    public MissileGuidanceModule Module { get; set; }

    public LaunchCommand(MissileGuidanceModule module)
    {
        Module = module;
    }
}
```

Now we implement the `Execute()` method, which will be called when the command is executed.  The `Execute()` method takes an `ITerminalCommand` object as the only parameter.

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

        // call method on module with arguments
        Module.Launch(targetCoordinate, detonationDistance, maxSpeed);
    }
}
```

## Events

### Listening For Events

Mother allows modules to emit and subscribe to events, allowing intermodule transmission.  Once subscribed to an event, a module can intercept it via the `HandleEvent()` method each time it is emitted:

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    // Subscribe to the event during instantiation
    public MissileGuidanceModule(Mother mother)
    {
        Mother = mother;

        Subscribe(typeof(WaypointReachedEvent).Name, this);
    }

    // Handle the event when it is emitted by a module
    public override void HandleEvent(string eventName, object eventData)
    {
        if(eventName.Equals(typeof(WaypointReachedEvent).Name))
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

Modules can emit events using the `Emit()` method.  This method takes an event object and an optional `object` of event data.

```csharp title="MissileGuidanceModule.cs"

    public void Detonate(MyMissile missile)
    {
        // Emit the event.  
        // We create the event with the missile instance, and then pass the 
        // missile object as event data via the second argument.
        Emit(new MissileDetonatingEvent(missile), missile);
    }
```

::: note
The `Emit()` and `Subscribe()` methods are accessors for the [Event Bus](../CoreModules/EventBus.md) via the `BaseExtensionModule` class.
:::

<!-- ## Examples
1. Connector Module
2. Piston Module -->