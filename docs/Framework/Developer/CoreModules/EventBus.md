# Event Bus

## Emitting an Event

We can emit an event by using the `Emit()` method. Any module that has subscribe to this event will receive it.

```csharp title="MissileGuidanceModule.cs"
// show code to emit an event from within an extension module
public void Launch()
{
    // Do launch stuff
    // ...

    Mother.GetModule<EventBus>().Emit(new MissileLaunchedEvent());
}
```

Since this is a very common activity, the `BaseExtensionModule` class provides an accessor method:

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    public void Launch()
    {
        // Do launch stuff
        // ...
        Emit(new MissileLaunchedEvent());
    }
}
```
## Subscribing to an Event

Before we can take action when an event is emitted, we need to subscribe to it. This is typically done in the `Boot()` method of an extension module.

```csharp title="MissileGuidanceModule.cs"
// show code to subscribe to an event from within an extension module with the boot method
public class MissileGuidanceModule : BaseExtensionModule
{
    // show code to emit an event from within an extension module
    public override void Boot()
    {
        // subscribe using the Event Bus module
        Mother.GetModule<EventBus>().Subscribe<MissileLaunchedEvent>(this);

        // Or via an accessor 
        Subscribe<MissileLaunchedEvent>(this);
    }
}
```

## Listening for an Event

Extension modules can override the `HandleEvent` method to listen for events they have subscribed to. This method will be called whenever an event is emitted to this module.

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    // Handle the event
    public override void HandleEvent(IEvent e, object eventData)
    {
        if (e is MissileLaunchedEvent)
            ArmWarhead();
    }

    // Do something as a result
    void ArmWarhead() { }
}
```

## Unsubscribing from an Event

To unsubscribe from an event, you can use the `Unsubscribe` method of the `EventBus` module. Perhaps in our example above, it makes sense to unsubscribe from the `MissileLaunchedEvent` once the missile has been launched.

```csharp title="MissileGuidanceModule.cs"
public class MissileGuidanceModule : BaseExtensionModule
{
    // Handle the event
    public override void HandleEvent(IEvent e, object eventData)
    {
        if (e is MissileLaunchedEvent)
        {
            // Unsubscribe from the event
            Mother.GetModule<EventBus>().Unsubscribe<MissileLaunchedEvent>(this);

            // Do more stuff
            // ...
        }
    }
}
```

You can easily check if a module is subscribed to an event by using the `IsSubscribed` method of the `EventBus` module.

```csharp title="MissileGuidanceModule.cs"
MissileGuidanceModule module = Mother.GetModule<MissileGuidanceModule>();

bool subscribed = Mother.GetModule<EventBus>()
                        .IsSubscribed<MissileLaunchedEvent>(module);
```