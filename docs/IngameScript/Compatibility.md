# Compatibility

Mother OS is designed to be compatible with other scripts and most ingame systems. This page outlines several considerations for players and script developers to maximize compatibility.

## Running other Scripts with Mother OS

Mother OS is designed to be compatible with other scripts.  However, some scripts may not work as expected due to the way they are designed to accept arguments. If you are developing your own script, it is recommend that you accept the `Script` update type in your `Main` method. This allows programmable blocks scripts to run other programmable blocks scripts with arguments.

Example main function that accepts the `Script` update type:
```csharp
public void Main(string argument, UpdateType updateSource)
{
    if (updateSource == UpdateType.Script)
    {
        // Run based on a trigger from another programmable block script.
    }
}
```

::: tip
Check out the documentation for [UpdateTypes](https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.UpdateType) for more information.
:::

## Known Issues
