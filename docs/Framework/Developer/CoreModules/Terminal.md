# Terminal

[[toc]]

The terminal module manages the terminal interface for the programmable block.

## Printing to the Terminal

Once Mother has booted, you can use the `Print()` method to print values to the terminal stack. This is useful for debugging or displaying information to the user.

```csharp title="MissileGuidanceModule.cs"
public override void Launch()
{
    Terminal terminal = Mother.GetModule<Terminal>();
    
    // Print a value to the terminal
    terminal.Print($"Launching missile...");

    // or simply use to method on Mother
    Mother.Print($"Launching missile...")
}
```

In situations where we have a lot of text to print, we can use an optional second parameter to disable trimming.

```csharp title="MissileGuidanceModule.cs"
MissileState currentState = MissileState.Idle;

public override void Launch()
{
    // Print a long message without trimming
    Mother.Print(
        $"Missile launching in 10 seconds.\nCurrent state: {currentState}", 
        false
    );
}
```

## Highlighting a Value

Sometimes it is convenient to always show a value of the terminal screen rather than have it disappear within the call stack.  You can use the `Highlight()` method to **pin** a printout to the top of the terminal window.

```csharp title="MissileGuidanceModule.cs"
MissileState currentState = MissileState.Idle;

public override void Run()
{
    Terminal terminal = Mother.GetModule<Terminal>();
    
    // Highlight a value continuously
    terminal.Highlight($"State: {currentState}");
}
```

## Clearing the Terminal

If you want to clear the terminal stack, you can use the `Clear()` method. This will remove all printed values from the terminal.

```csharp
Mother.GetModule<Terminal>().Clear();
```