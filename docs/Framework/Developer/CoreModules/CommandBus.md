# Command Bus

[[toc]]

`CommandBus` registers commands from core modules, extension modules, and programmable block Custom Data, then resolves and executes them as local commands, routines, or construct-wide delegated commands.

## Registering a Command

Commands are usually registered in a module's `Boot()` method.

```csharp title="LightModule.cs"
public override void Boot()
{
    RegisterCommand(new SetLightColorCommand(this));
}
```

## Running a Command or Routine

`RunTerminalCommand()` accepts the same routine syntax the player uses in the programmable block terminal.

```csharp title="DockingModule.cs"
GetModule<CommandBus>().RunTerminalCommand(
    "light/color \"Dock Light\" yellow; wait 2; light/color \"Dock Light\" green"
);
```

That means you can trigger:

1. Single commands.
2. Multi-step routines.
3. Config commands defined in `[commands]`.
4. Construct-wide commands exported by other Mother instances.

## Config Commands

Programmable block Custom Data commands are loaded by `Configuration`, then executed by `CommandBus`.

```ms title="Programmable Block > Custom Data"
[commands]
prepareDock=light/color "Dock Light" yellow; wait 1; connector/lock "Dock Connector"
```
<br>

```ms title="Programmable Block Terminal"
prepareDock
```

## Construct-Wide Command Sharing

Mother Core shares command names with other Mother instances on the same construct. If another script exposes a command and your script does not, `CommandBus` can delegate to that remote instance automatically.

```ms title="Programmable Block A > Custom Data"
[commands]
greeting=screen/print MainDisplay "Hello, Space Engineer!";
```
<br>

```ms title="Programmable Block B > Terminal"
greeting
```

## Important Commands and Force-Local Execution

Prefix a config command with `!` to mark it as construct-priority.

```ms title="Programmable Block A > Custom Data"
[commands]
!alert=light/color "Warning Lights" red; sound/play "Alarm"
```

If another script needs to bypass the important construct command and run its own local definition, prefix the call with `!!`.

```ms title="Programmable Block B > Terminal"
!!alert
```

## Helpful Members

| Member | Use |
| - | - |
| `ModuleCommands` | Commands registered on this instance |
| `ConstructCommands` | Command names discovered on other scripts on the same construct |
| `ImportantConstructCommands` | Important command names exported by other scripts |
| `FindInstanceWithCommand(name)` | Returns the script ID that owns a construct command |
| `GetSelfCommandNames()` | Returns the local command names exported to peers |

## Emitted Events

`CommandBus` does not emit any built-in events.
