# Troubleshooting

Use this page to diagnose common Mother OS setup and command issues. If a problem persists, note the command you ran, the Programmable Block's output, and any relevant Custom Data before asking for help.

[[toc]]

:::tip Punctuation Matters
Separate commands in a routine with semicolons (`;`). For multi-line commands in Custom Data, start each continuation line with `|`. If your argument has a space in it then wrap it in double quotes `""`.
:::

```ms title="Custom Data"
; Semi-colons tell Mother a command is complete.
; Pipes ensure we can continue a routine on a new line.
BigCommand=
| FirstCommand;
| light/color "Main Lights" green;
| ThirdCommand;
; Outbound script calls should use quotes when 
; passing multiple arguments.
TurretRangeAuto=
| pb/run PB.WhipsTurretBasedRadar "range auto";
```

## Mother OS is Missing from the Script List

1. Confirm that you have subscribed to Mother OS on the [Steam Workshop](https://steamcommunity.com/sharedfiles/filedetails/?id=3411507973).
2. In the Programmable Block editor, use the refresh button above the script search.
3. Reopen the script list and check again.

See [Installation](Installation.md) for the complete setup steps.

## Mother OS Does Not Start

- Confirm that Mother OS is selected in the Programmable Block's editor and that you saved the change.
- Press **Recompile** or run the `boot` command in the Programmable Block terminal.
- Confirm that the grid has a Remote Control block - it enables a lot of features.
- Check that you are not running multiple Mother OS instances on the same ship or station *construct*. Multiple instances can duplicate event monitoring and compete to render LCDs. Don't worry, she can handle it.

For initial setup instructions, see [Installation](Installation.md). For details about the multiple-instance limitation, see [Compatibility](Compatibility.md#known-issues).

## A Command Is Not Recognized

- Run `help` in the Programmable Block terminal to see the available commands.
- Check that the command name and its arguments match the documented syntax. See the [Command Line Interface](CommandLineInterface.md#anatomy-of-a-command) and [Cheatsheet](../Cheatsheet.md).
- If you are running a custom command, confirm that it is defined in the `[commands]` section of Custom Data and that you are running it with the same name.



See [Configuration](Configuration.md) for examples of commands and routines in Custom Data.

## A Command Runs but Does Not Affect the Expected Blocks

- Check the target block, group, or tag name. Use double quotes around names containing spaces, for example `light/color "Landing Lights" red;`.
- Confirm that the target block type is supported by that command. The [Cheatsheet](../Cheatsheet.md) and the relevant module page list command details.
- If you target blocks with a tag, confirm the tag is defined in the block's Custom Data under `[general]` as `tags=...`.
- If the command is a custom routine, check each command in the routine separately to identify which step is not taking effect.

For more on block targeting and tags, see [Targeting Blocks](CommandLineInterface.md#targeting-blocks) and [Configuration](Configuration.md#block-configuration).

## Custom Data Configuration Is Not Taking Effect

- Check that the settings are in the correct Custom Data field: commands and shared hooks can be defined in Mother's Custom Data, while block-specific tags and hooks can be defined in that block's Custom Data.
- Check section names such as `[commands]`, `[hooks]`, and `[general]`.
- Check for missing semicolons, misspelled command names, and unquoted values that contain spaces.
- For multiline routines, use the `|` continuation marker as shown in the [Configuration](Configuration.md) examples.

## Another Programmable Block Script Does Not Respond

Some scripts may not accept arguments when invoked by another script. If you are developing the other script, its `Main` method should accept the `Script` update type and handle that update source. See [Compatibility](Compatibility.md#running-other-scripts-with-mother-os) for an example.

## A Routine or Flight Plan Does Not Behave as Expected

Test each command in the routine individually before combining them. For flight plans, check that the GPS entries and any commands enclosed at waypoints are formatted as shown in [Examples](Examples.md#dispatch-ship-to-a-landing-site-via-a-flight-plan).

The `general.debug` setting can be enabled in Mother's Custom Data to highlight script complexity in the terminal. See [Configuration](Configuration.md#mother-configuration).

## My Script Keeps Crashing and I Don't know What to Do!

Assuming you've tried all of the above, then jump into the [Mother Discord Server](https://discord.gg/PrrmBujmXQ) and please tell me everything you can! It's a lively bunch who can probably help, and there is no shortage of cool things to break. 
