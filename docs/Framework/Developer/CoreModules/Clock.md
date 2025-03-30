# Clock

## Scheduling a Task

The `Schedule()` method allows you to execute a task on a specific interval in `seconds`.  This is useful for running periodic actions that should not be run every cycle.  In most cases, you should trying to schedule tasks rather than execute them within a Module's [`Run()`](../ExtensionModules/ExtensionModules.md#running-every-cycle) method.

```csharp title="DroneControlModule.cs"
// Schedule a launch event for a drone every 30 mins.
```

## Delaying an Action

The `Wait()` method allows you to delay an action for a specified amount of time in `seconds`.  This is useful for delaying actions that should not be executed immediately. I accepts an [`Action`]() as the first parameter.

```csharp title="DroneControlModule.cs"

// we can use an accessor on Mother 
Mother.Wait(() => {
    ActivateAutopilotSystem();
}, 10);
```

