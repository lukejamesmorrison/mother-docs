# Clock

Mother uses a clock system to schedule system actions and execute logic across program cycles.

[[toc]]

## Scheduling a Action

The `Schedule()` method allows you to execute an action on a specific interval in `seconds`.  This is useful for running periodic actions that should not be run every cycle.  In most cases, you should trying to schedule actions rather than execute them within a Module's [`Run()`](../BuildingAModule/BuildingAModule.md#running-a-module) method. It is highly recommended that you take great consideration when scheduling actions to avoid performance issues.  

Not all system actions need to run every cycle.


```csharp title="MissileGuidanceModule.cs"
public void Boot()
{
    Clock clock = Mother.GetModule<Clock>();
    // Schedule to run every program cycle
    clock.Schedule(UpdatePosition());

    // Or, schedule to run every 10 seconds
    clock.Schedule(DetonateIfStopped(), 10);
}

void UpdatePosition() { }
void DetonateIfStopped() { }
```

## Delaying an Action

The `QueueForLater()` method allows you to delay an action for a specified amount of time in `seconds`.  This is useful for delaying actions that should not be executed immediately. It accepts an [`Action`](https://learn.microsoft.com/en-us/dotnet/api/system.action-1?view=net-9.0) as the first parameter.

```csharp title="MissileGuidanceModule.cs"
Clock clock = Mother.GetModule<Clock>();

GetModule<Clock>().QueueForLater(ActivateAutopilotSystem(), 10);
```

Due to how common this action is, Mother exposes a simple helper method `Wait()`:

```csharp title="MissileGuidanceModule.cs"
Mother.Wait(() => ActivateAutopilotSystem(), 10);
```

## Using a Corountine

If you want to run a process in parallel, we can use the `StartCoroutine()` method.  This method accepts an `IEnumerable<double>` input. Mother uses this method as part of the boot process.

```csharp title="MissileGuidanceModule.cs"
public void Arm()
{
    GetModule<Clock>().StartCoroutine(
        ArmSystems()
    );
}
```

