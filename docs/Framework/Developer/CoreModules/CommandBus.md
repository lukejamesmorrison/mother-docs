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

### Important Commands

You can mark a command as "important" by prefixing it with `!` in your Custom Data. Important commands take priority over local commands when running on a construct with multiple Mother Core instances.

```ini title="Programmable Block A > Custom Data"
[commands]
!Alert=light/color WarningLights red; sound/play AlarmSound;
```

When any script on the construct runs `Alert`, it will always be delegated to Script A, even if other scripts have their own `Alert` command defined locally.

### Overriding Important Commands

If you need to run a local command that has the same name as an important command on the construct, prefix your command with `!!` to force local execution:

```bash title="Programmable Block B > Terminal"
!!Alert;  # Runs Script B's local Alert command, ignoring Script A's important command
```

### Command Resolution Priority

When a command is executed, Mother resolves it in the following order:

1. **Force Local (`!!`)**: If the command starts with `!!`, always run the local version
2. **Important Commands (`!`)**: If another script has this command marked as important, delegate to that script
3. **Local Commands**: Run locally if available
4. **Construct Commands**: Delegate to another script on the construct if they have the command 
