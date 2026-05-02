# Activity Monitor

[[toc]]

`ActivityMonitor` is for one-shot completion tracking. Use it when a block should be watched until it reaches a terminal state, then cleaned up automatically.

If you need continuous state monitoring for an entire block type, prefer `RegisterBlockTypeForStateMonitoring<T>()` from `BaseModule` and let [`BlockCatalogue`](BlockCatalogue.md) drive the checks.

## Registering a Block

`RegisterBlock()` accepts:

1. The block to watch.
2. A predicate that returns `true` when the terminal state has been reached.
3. A callback that runs once, right before the block is removed from monitoring.

```csharp title="HangarDoorModule.cs"
public void ExtendRamp()
{
    IMyPistonBase piston = GetBlocksByName<IMyPistonBase>("Hangar Ramp")
        .FirstOrDefault();

    if (piston == null)
        return;

    piston.Enabled = true;
    piston.Velocity = 0.5f;

    GetModule<ActivityMonitor>().RegisterBlock(
        piston,
        block => ((IMyPistonBase)block).CurrentPosition >= 8f,
        block =>
        {
            var ramp = (IMyPistonBase)block;
            ramp.Velocity = 0;
            ramp.Enabled = false;
            Mother.Print("Ramp fully extended.");
        }
    );
}
```

## Unregistering a Block

Call `UnregisterBlock()` if the activity is cancelled before the terminal state is reached.

```csharp title="HangarDoorModule.cs"
public void AbortRamp()
{
    IMyPistonBase piston = GetBlocksByName<IMyPistonBase>("Hangar Ramp")
        .FirstOrDefault();

    if (piston == null)
        return;

    piston.Velocity = 0;
    GetModule<ActivityMonitor>().UnregisterBlock(piston);
}
```

## When to Reach for It

Use `ActivityMonitor` when the lifecycle is:

1. Start a block action.
2. Wait until one condition becomes true.
3. Run one callback.
4. Stop watching that block.

That pattern is common for pistons, rotors, hinges, merge blocks, and connectors when you only care about the completion of a single action.

## Emitted Events

`ActivityMonitor` does not emit any built-in events.