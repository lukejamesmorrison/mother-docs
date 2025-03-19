# Command Line Interface (CLI)

<!-- [< Installation](Installation.md) -->

Mother's command line interface allows you to interact with your grid.  We can pass in *arguments* to the script to perform different actions.  The CLI is available in the programmable block terminal, and you can run it by hitting the `Run` button.


::: tip
See the [Command Cheatsheet](CommandCheatsheet.md) to get started!
:::

<!-- - [Anatomy of a Command](#anatomy-of-a-command)
- [Running Multiple Commands](#running-multiple-commands)
- [Delaying a Command for Execution](#delaying-command-execution)
- [The Terminal Window](#the-terminal-window)
- [Running Commands Automatically](#running-commands-automatically) -->


**Command Syntax**
```bash
<Command> <Argument,> [Option,]
```

Multple commands together form a *routine*:

```bash title="Terminal"
# commmand - set a light color
light/color LandingLight red; 

# routine - set a light color and make it blink
light/color LandingLight red; light/blink LandingLight fast;
```
<br>

[![Running a Command](https://img.youtube.com/vi/Ax5bhoeutcA/0.jpg)](https://www.youtube.com/watch?v=Ax5bhoeutcA)


## Anatomy of a Command
Commands are similar to a traditional command line interface, and consist of 3 *terms*:

| Term Type  | Example | Description |
| --------	|-| ------- |
| Command	| `hinge/rotate`<br>`light/color`<br>`help` | The command determines which action is performced by Mother.  See the [Command Cheetsheet](CommandCheatsheet.md) for a complete list of commands, or run Mother with the `help` command.  |
| Argument	| `Hinge`<br>`red`<br>`45`<br>`"Rotor 1"`| Arguments are expected by most commands and contain the details they require to operate.  This is usually values like angle, color or a GPS waypoint. Use double quotes when your arguments include spaces. In most cases, the first argument of command will target a **Block** or **Group** by its name. |
| Option	| `--speed=2`<br>`--offset=0.1`<br>`--force` |Options can be used with commands to trigger specific modifications like rotational speed or blink offset. Sometimes they may be used without a set value.  |

Let's start with an simple example:

```bash title="Terminal"
hinge/rotate Hinge 45
```

We can see the `hinge/rotate` command targets the block named `Hinge`, and rotates it to `45` degrees. If we wanted to rotate the hinge at 2 RPM, we can add the `speed` option:

```bash title="Terminal"
hinge/rotate Hinge 45 --speed=2
```

## Running Multiple Commands

### Using the Terminal
Sometimes it is useful to group commands in series to operate a system of blocks.  A `Routine` is simply a group of commands separated by a semi-colon `;`.  The following example changes the color of our `LandingLight`, and also initates a blinking effect.

```bash title="Terminal"
light/color LandingLight red; light/blink LandingLight 0.5 --length=0.5;
```
The light will blink for 0.25s, every 0.5s (50% duty cycle).

### Custom Commands and Routines

The command syntax can get verbose in the terminal, so it is recommended that you define routines in the `Commands` section of Mother's **CustomData**. We can use a multi-line syntax to make it much more readable:

```sh title="Mother > Custom Data"
[Commands]

ActivateLandingLight=
| light/color LandingLight red;
| light/blink LandingLight 0.5 --length=0.5;

ExtendArm=piston/distance LandingArm 3;
```

::: tip
The pipe character `|` is used to indicate a new line within Custom Data.  This is not required in the Programmable Block terminal. This only allows us to organize our commands and routines across multiple lines within CustomData.
:::

Now we can run `ActivateLandingLight` in the terminal to execute the routine, or get clever and set it as an *Action* in an Event Controller, or a *hook* on a [Sensor](./Modules/Extension/SensorModule.md).

```sh title="Terminal"
ActivateLandingLight; ExtendArm;
```

## Delaying Command Execution
Mother comes with a `wait` command that allow you to delays a command for execution in seconds.

```bash title="Terminal"
door/open AirlockDoor;
wait 10;
door/close AirlockDoor;
```

This works remotely as well:

```bash title="Terminal"
@StealthMissile fcs/start; wait 10; _Arm;
```

## The Terminal Window

The terminal window act as the primary interface for Mother.  You can run commands directly in the terminal, and you will receive immediate feedback from the script. The window also shows several indicators as relevant:

|Indicator	| Description|
|-			|-|
|#			| A number showing how many grids Mother is currently storing in the Almanac. Mother stores the position and status of other grids automatically as long as they are running Mother locally as well. |
|M			| Shows a mechanical system is currently in motion and tracked by the Activity Monitor.  Blocks like rotors, hinges and pistons will be monitored, and locked when finished to protect Space Engineers from the Almighty Clang.|
|C			| Indicates a communication is current in progress.  Girds running Mother will frequently communicate to share information automatically. |
|Q			| Indicates that a command is queued for future execution at a waypoint. |
|A			| Indicates that autopilot is currently enabled. |
|W          | Indicates that a command is currently waiting to be exeucuted at a later time via the `wait` command. |


![The terminal window](Assets/terminal-1.png)


## Running Commands Automatically

You can run commands via several methods:

1. [Programmable Block terminal](#programmable-block-terminal-mother)
2. [Cockpit or Control Station toolbar action](#cockpitcontrol-station-toolbar)
3. [Button action](#button)
4. Event Controller action
5. Timer Block action

### Programmable Block Terminal (Mother)

From within your Programmable Block terminal, you can run commands directly.  This is the easiest way to interact with Mother and you will receive immediate feedback in the terminal window.

![Open Programmable Block](Assets/run-terminal-1.png)

![Enter Command](Assets/run-terminal-2.png)

![Run Command](Assets/run-terminal-3.png)


### Cockpit/Control Station Toolbar

When you're flying a ship or sitting at a control station, you can add a button to your toolbar that will run a command when pressed.  This is useful for quick actions like toggling lights or opening doors. To do this, assign the Programmable Block running Mother to the toolbar, and use the `Run` action.  A window will appear asking you for an argument - type your command here and click `Confirm`. You can also set a short label for the button to make it easier to identify.

![Open Toolbar](Assets/run-toolbar-1.png)

![Select Run Action](Assets/run-toolbar-2.png)

![Enter Command as Argument](Assets/run-toolbar-3.png)

![Confirm Toolbar Command](Assets/run-toolbar-4.png)

### Button

Like a toolbar, you can also assign a command to a button.  This is useful for quick actions like toggling lights, or initiating a return-to-base procedure for a wandering grid.  To do this, assign the Programmable Block running Mother to the button action, and use the `Run` action.  A window will appear asking you for an argument - type your command here and click `Confirm`. You can also set a short label for the button.

::: tip
Due to the way Space Engineers shows button actions to the player, we are unable to see which command the button runs.  It is recommended to make your button positions intuitive, or to label them with a sign.
:::

![Open Button](Assets/run-button-1.png)

![Select Programmable Block](Assets/run-button-2.png)

![Select Button Action](Assets/run-button-3.png)

![Enter Command](Assets/run-button-4.png)

![Confirm Assignment](Assets/run-button-5.png)

![Label Button](Assets/run-button-6.png)

<!-- [Configuration >](Configuration.md) -->








