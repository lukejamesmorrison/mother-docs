# Command Bus

The Command Bus handles commands execution for Mother.  Modules should register commands in the `Boot()` method to expose them to the player.

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