# Extension Modules

## Creating a Custom Module

Extension modules expose several important capabilities for players to leverage. The must implement the `IExtensionModule` interface.

### Boot
The `Boot` method of every module is called during boot by Mother.  Extension modules are registered and may access registered Core Modules.  It is important to consider boot order to reduce conflicts among inter-module dependencies.

```csharp
class MissileGuidanceModule : IExtensionModule
{
    public void Boot()
    {
        DetermineCurrentPosition();

        ConfigureWarheads();
    }
}

```

### Run
You may also run processes each time the program cycles using the `Run` method, though this is only recommended for light use cases.  Otherwise it is advised to use the Clock's `Schedule` method.

```csharp
class MissileGuidanceModule : IExtensionModule
{
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


### HandleEvent

Mother allows modules to emit and subscribe to events, allow intermodule transmission of system events.  Once subscribed to an event, a Module can intercept it each time it is emitted using the `HandleEvent` method:

```csharp
public class NavigationModule : BaseExtensionModule
{

    public NavigationModule(Mother mother)
    {
        Mother = mother;

        // subscribe to the event
        Mother.EventBus.Subscribe(typeof(WaypointReachedEvent).Name, this);
    }

    // handle the event when it is emitted by a module
    public override void HandleEvent(string eventName, object eventData)
    {
        if(eventName.Equals(typeof(WaypointReachedEvent).Name))
        {
           Mother.Print("Waypoint Reached!")
        }

    }
}
```

## Examples
1. Connector Module
2. Piston Module