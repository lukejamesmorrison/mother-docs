# Clock

Mother uses a clock system to schedule system actions and execute logic across program cycles.

[[toc]]

## Scheduling a Action

The `Schedule()` method allows you to execute an action on a specific interval in `seconds`.  This is useful for running periodic actions that should not be run every cycle.  In most cases, you should trying to schedule actions rather than execute them within a Module's [`Run()`](../ExtensionModules/ExtensionModules.md#running-every-cycle) method. It is highly recommended that take great consideration when scheduling actions to avoid performance issues.  Not all system actions need to run every cycle.


```csharp title="MissileGuidanceModule.cs"
public void Boot()
{
    // Schedule to run every program cycle
    Mother.Clock.Schedule(UpdatePosition());

    // Or, schedule to run every 10 seconds
    Mother.Clock.Schedule(DetonateIfStopped(), 10);
}

void UpdatePosition() { }
void DetonateIfStopped() { }
```

## Delaying an Action

The `Wait()` method allows you to delay an action for a specified amount of time in `seconds`.  This is useful for delaying actions that should not be executed immediately. It accepts an [`Action`](https://learn.microsoft.com/en-us/dotnet/api/system.action-1?view=net-9.0) as the first parameter.

```csharp title="MissileGuidanceModule.cs"
// we can use an accessor on Mother 
Mother.Wait(() => ActivateAutopilotSystem(), 10);
```

