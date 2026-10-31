# Command Bus

[[toc]]

`CommandBus` registers commands from core modules, extension modules, and programmable block Custom Data, then resolves and executes them as local commands, routines, or construct-wide delegated commands. You can see how to create custom commands in [Building a Module](../BuildingAModule/BuildingAModule.md).

## Registering a Command

Commands are usually registered in a module's `Boot()` method.

```csharp title="LightModule.cs"
public override void Boot()
{
    RegisterCommand(new SetLightColorCommand(this));
}
```

## Registering a Simple Command

A command that needs no state of its own does not need a class - which is great! Pass a lambda function to `RegisterCommand()` on `BaseExtensionModule`. The character savings are substantial.

```csharp title="ConsoleModule.cs"
public override void Boot()
{
    RegisterCommand("clear", 0, command =>
    {
        ClearConsole();
        return "Console cleared";
    });
}
```

| Parameter | Description |
| - | - |
| `name` | The command name, for example `clear`. |
| `minArgs` | Fewer arguments than this are answered with `usage` and the lambda is not called. |
| `run` | Runs the command and returns the response text. |
| `usage` | Optional response for too few arguments. Defaults to `CommandBus.Messages.NoArgumentsProvided`. |

For naunced command logic, the `RegisterCommand(new MyCommand())` is still you best choice.

## Registering Block Commands

Many commands do one thing to every block of a type that matches a name, group or tag. Use `Block<T>()` from `BaseExtensionModule` to start a group of registrations for one block type, then chain `.Command()` to that group. The block type is written once, and your script stays smaller. It many cases it is *way* easier to read.

```csharp title="DoorModule.cs"
public override void Boot()
{
    Block<IMyDoor>("door")
        .Command("open", door => door.OpenDoor(), "Door opened: {0}")
        .Command("close", door => door.CloseDoor(), "Door closed: {0}");
}
```

| Parameter | Description |
| - | - |
| `prefix` | Passed to `Block<T>()`. Prepended to each command name with a slash, for example `door`. Leave empty for none. |
| `verb` | The command name after the prefix, for example `open` for `door/open`. |
| `action` | Applied to each matching block. |
| `message` | Format string for the success response. `{0}` is the block name. |

The same chain registers the block's [condition properties](./Conditions.md#registering-properties-and-predicates) and state monitoring with `.Number()`, `.Flag()`, `.Status()`, `.Monitor()` and `.On()`. See [Building a Module](../BuildingAModule/BuildingAModule.md#registering-block-commands-and-conditions).

`RegisterBlockCommand<T>(name, action, message)` still works and registers a single command.

Use a command class with `RegisterCommand()` when your command needs several arguments, options or custom validation.

## Conditional Steps in Routines

`CommandBus` runs the `if`, `elseif`, `else` and `end` steps of a routine. Steps in a branch that do not run are skipped before anything about them is resolved. A condition is evaluated by the [Conditions](./Conditions.md) module.

```ms title="Programmable Block > Custom Data"
[commands]
Dock=
| if "Dock Connector" connectable;
|   connector/lock "Dock Connector";
| else;
|   print "Nothing to dock with";
| end;
```

- Blocks nest, and an `if` block that is still open at the end of a called command is closed, so a command never leaves a block open for its caller.
- An `else` or `end` without a matching `if`, or an `elseif` after `else`, fails the routine.
- A failing step stops the routine and prints why.
- Two values with `==` or `!=` are compared as text, ignoring case: `if $MODE == parked;`. This form takes no options. A variable that is not defined stays as literal text and does not match.
- A condition that needs another script's answer pauses the routine, not the script.

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

## Built-in Commands

| Command | Description |
| - | - |
| `halt` | Halts the script by clearing every queued delayed task and active coroutine on the [Clock](./Clock.md). Pending `wait` delays and parallel commands that have not run yet are cleared. |

## Options With Spaces

Options accept double-quoted values, so a value can contain spaces. Read it with `GetOption()`.

```ms title="Terminal"
view/go "Cockpit:1" MainMenu --title="Custom Title"
```

```csharp title="ViewGoCommand.cs"
string title = command.GetOption("title"); // Custom Title
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
