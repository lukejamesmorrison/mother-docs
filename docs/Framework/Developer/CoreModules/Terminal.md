# Terminal

[[toc]]

`Terminal` owns the programmable block console output that Mother renders each run. It keeps a short message buffer, a highlight area, and a compact indicator row for system activity.

## Printing Messages

Use `Print()` or `Mother.Print()` for standard output.

```csharp title="LaunchModule.cs"
public void Launch()
{
    GetModule<Terminal>().Print("Launch sequence started.");
    Mother.Print("Ignition confirmed.");
}
```

By default, long messages are trimmed to fit the in-game console width. Pass `false` to keep the full message.

```csharp title="LaunchModule.cs"
Mother.Print(
    "Missile launching in 10 seconds. Current state: Awaiting final clearance.",
    false
);
```

## Highlighting Important Values

Highlights render near the top of the terminal and are useful for status that should stay visible.

```csharp title="FlightModule.cs"
public override void Run()
{
    GetModule<Terminal>().Highlight($"Speed: {Mother.GetShipSpeed():0.0} m/s");
    GetModule<Terminal>().Highlight($"Altitude: {Mother.GetAltitude():0.0} m");
}
```

## Clearing the Console

Use `ClearConsole()` to remove queued console lines.

```csharp title="DebuggingModule.cs"
GetModule<Terminal>().ClearConsole();
```

## Useful Details

| Behavior | Detail |
| - | - |
| Trimmed message width | About 37 characters before shortening |
| Buffer size | 20 recent lines |
| Highlights | Reset after each terminal update |
| `Echo()` | Writes directly to `Program.Echo()` |

Most modules should not call `UpdateTerminal()` directly, because Mother handles the render cycle for you.

## Emitted Events

`Terminal` does not emit any built-in events.