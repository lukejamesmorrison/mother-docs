# Clock

[[toc]]

`Clock` is Mother's timing engine. It runs on `Update10`, which gives you about one tick every `0.166` seconds, and it supports three common patterns:

1. Repeating work with `Schedule()`.
2. One-off delayed work with `QueueForLater()`.
3. Multi-step routines with `AddCoroutine()`.

## Scheduling Repeating Work

Use `Schedule()` for work that should repeat on a fixed interval.

```csharp title="TelemetryModule.cs"
public override void Boot()
{
    Clock clock = GetModule<Clock>();
    clock.Schedule(UpdateTelemetry, 1);
    clock.Schedule(UpdateThreatAssessment, 5);
}

void UpdateTelemetry()
{
    Mother.Print($"Speed: {Mother.GetShipSpeed()}");
}

void UpdateThreatAssessment()
{
    // expensive scan here
}
```

## Queueing Delayed Work

Use `QueueForLater()` when something should run once after a delay.

```csharp title="LaunchModule.cs"
public void StartCountdown()
{
    Mother.Print("Launch in 10 seconds.");

    GetModule<Clock>().QueueForLater(() =>
    {
        Mother.Print("Ignition.");
        FireThrusters();
    }, 10);
}
```

## Running Coroutines

Use `AddCoroutine()` when a task needs to yield across multiple cycles.

```csharp title="BootModule.cs"
public override void Boot()
{
    GetModule<Clock>().AddCoroutine(SpinUpSequence());
}

IEnumerable<double> SpinUpSequence()
{
    Mother.Print("Opening blast doors...");
    OpenDoors();
    yield return 2.0;

    Mother.Print("Enabling reactors...");
    EnableReactors();
    yield return 1.0;

    Mother.Print("System ready.");
}
```

## Useful Properties and Methods

| Member | Use |
| - | - |
| `QueuedTaskCount` | Number of one-off delayed actions waiting to run |
| `CoroutineCount` | Number of active coroutines |
| `GetLoader()` | Small `/` or `\` activity indicator used by `Terminal` |
| `Reset()` | Clears queued tasks, repeating tasks, and coroutines |
| `ClearScheduledTasks()` | Clears only repeating scheduled tasks |

## Emitted Events

`Clock` does not emit any built-in events.

