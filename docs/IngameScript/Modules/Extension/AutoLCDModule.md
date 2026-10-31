# AutoLCD Module

The AutoLCD module lets you swap what a screen shows from a Mother command. It works with [Automatic LCDs 2](https://steamcommunity.com/sharedfiles/filedetails/?id=822950976) (AutoLCDs) by MMaster, which draws live ship data on LCD panels and cockpit screens.

[[toc]]

::: info Requires Automatic LCDs 2
Mother does not draw anything itself. It copies a named view into the target block's `Custom Data` and AutoLCDs 2 does the rendering. You must run AutoLCDs 2 in a programmable block on the same grid - which you should, because it's great.
:::

## Defining Views

Views live in the `[autolcd]` section of the Mother OS programmable block's `Custom Data`. Each key is a view name and the value is the AutoLCD command text for one screen. We use the `|` prefix for multi-line values.

[Automatic LCDs 2 Full Guide](https://steamcommunity.com/sharedfiles/filedetails/?id=407158161)

```ms title="Mother OS > Custom Data"
[autolcd]
PowerView=
| Power {T:*}
| Working {TG:Batteries}

HydrogenTanksView=
| tanks {TG:*} hydrogen
| StopDistance
| StopTime
```

- Mother copies the text as written. It does not interpret `{T:...}`, `;` separators or `//` comments.
- Mother resolves `$VARIABLES` from the `[variables]` section, and `{{parameter:default}}` placeholders from options on `autolcd/print`, when the view is printed. See [Using Variables](#using-variables).
- View names are case-insensitive.
- Edits to the section are picked up automatically. You do not need to run `boot`.

### Using Variables

Use `$VARIABLES` to keep names that appear in many views in one place, or `{{parameter:default}}` placeholders that you fill in when you print the view.

```ms title="Mother OS > Custom Data"
[variables]
POWER_GROUP=Batteries

[autolcd]
PowerView=
| {{command:Power}} {T:*}
| Working {TG:$POWER_GROUP}

[commands]
ShowPowerView=autolcd/print "Cockpit:1" PowerView
ShowPowerStoredView=autolcd/print "Cockpit:1" PowerView --command=PowerX
```

Variables are resolved each time you print, so a view always uses the current value.

## Commands

### autolcd/print

Copy a view to a screen. AutoLCD then renders it.

```
autolcd/print <Block|Group|#tag>[:SurfaceIndex] <View> [--options]
```

| Argument | Description |
| - | - |
| Target | A block name, group or `#tag`. Add `:<index>` to select a surface on a cockpit or other multi-screen block. The index defaults to `0`. |
| View | The name of a view in the `[autolcd]` section. |

If the target matches several blocks, each one is updated.

**Example**

```ms title="Terminal"
; Show the power view on a text panel
autolcd/print "Engineering LCD" PowerView;

; Show the hydrogen view on the second cockpit screen
autolcd/print "Pilot Cockpit:1" HydrogenTanksView;

; Update every screen tagged #status
autolcd/print #status PowerView;

; With an override via a variable "command"
autolcd/print "Pilot Cockpit:1" PowerView --command=PowerX;
```

Use it from a [command](../../CommandLineInterface.md) or [Mother GUI](../../../MotherGUI/README.md) menu to build screens that switch between views:

```ms title="Mother OS > Custom Data"
[commands]
ShowPowerView=autolcd/print "Pilot Cockpit:1" PowerView
ShowHydrogenView=autolcd/print "Pilot Cockpit:1" HydrogenTanksView
```

### autolcd/clear

Remove the AutoLCD commands for one screen so AutoLCD stops drawing on it. Other screens on the same block are not changed.

```
autolcd/clear <Block|Group|#tag>[:SurfaceIndex]
```

**Example**

```ms title="Terminal"
autolcd/clear "Pilot Cockpit:1";
```

## How It Works

AutoLCD reads its commands from the area of a block's `Custom Data` below the `---` line. Mother only edits that area, so the rest of the block's configuration (such as `[general]` and `[hooks]`) is never changed.

```ms title="Pilot Cockpit > Custom Data"
[general]
; Mother configuration is untouched

---
@0 autolcd
Power {T:*}
@1 autolcd
tanks {T:*} hydrogen
```

Each `@<index> autolcd` header starts the commands for one screen. When you print a view, Mother replaces only that screen's section.

- Custom data in the older AutoLCD layout (no `---` line) is converted the first time you print to that block.
- If the `Custom Data` is not valid, for example it has a broken `[section]`, Mother leaves it unchanged and reports an error.
- Views are written for a single screen. A view that contains an `@<n> autolcd` header or a `---` line is rejected.

## Responses

| Message | Cause |
| - | - |
| `Block updated: <target> -> <view>` | The view was copied. |
| `Cleared AutoLCD on <target>` | The screen was cleared. |
| `AutoLCD view not found: <view>` | The view is not defined in `[autolcd]`. |
| `AutoLCD cannot update <block>: custom data is not valid ini` | The block's `Custom Data` could not be parsed. |

## Faster Updates

Stock AutoLCD can take several seconds to react to a `Custom Data` change, so a printed view may feel slow to appear. Two small edits to the AutoLCD script reduce that to about half a second:

1. Poll `Custom Data` every `0.5` seconds instead of every `5` seconds.
2. Remove the random start delay on each command.

::: warning
The author of AutoLCD asks that the script, and any derivation of it, is not republished. Keep a patched copy for personal use only.
:::
