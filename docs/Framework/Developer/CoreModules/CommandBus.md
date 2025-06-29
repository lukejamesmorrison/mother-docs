# Command Bus

The command bus handles all commands being run by Mother.  Modules who would like to expose commands should register them in the `Boot` method.

## Registering a Command

All commands should implement the `IModuleCommand` interface.

```csharp title="LightModule.cs"
public override void Boot()
{
    IModuleCommand setLightColorCommand = new SetLightColorCommand(this);

    RegisterCommand(setLightColorCommand);
}
```

## Running a Command

If you would like to run a command from it's raw command string, you can use the `RunTerminalCommand()` method:

```csharp title="LightModule.cs"
Mother.GetModule<CommandBus>()
    .RunTerminalCommand("light/color HangarLights green");
```