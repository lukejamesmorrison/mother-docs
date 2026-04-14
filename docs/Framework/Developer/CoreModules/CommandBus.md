# Command Bus

[[toc]]

The Command Bus handles command execution for Mother.  Modules should register commands in the `Boot()` method to expose them to the player.

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

## Running Commands on Other Mother Core Instances

Mother Core version 1.1 introduces automatic command sharing between all Mother Core instances on the same construct. This means, that if Script A exposes a command, then Script B can run that command naturally without any setup. Let's look at an example:

```ini title="Programmable Block A > Custom Data"
[commands]
greeting=screen/print MainDisplay "Hello, Space Engineer!";
```

From Script B, we can run the `greeting` directly:

```bash title="Programmable Block B > Terminal"
greeting; # => Hello, Space Engineer! (printed via Programmable Block A)
```

Or we can include it in commands defined in Script B's Custom Data:

```ini title="Programmable Block B > Custom Data"
[commands]
welcome=greeting; light/color SpotLight1 blue;
```

When we run the `welcome` command from Script B, it will execute the `greeting` command from Script A, printing "Hello, Space Engineer!" on Script A's MainDisplay, and then change the color of SpotLight1 to blue. 
