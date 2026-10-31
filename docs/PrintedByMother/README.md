---
next: /PrintedByMother/Installation.md
---

# Printed by Mother

![Static Badge](https://img.shields.io/badge/version-0.1.0-blue?color=green)

 <!-- [![Static Badge](https://img.shields.io/badge/Steam%20Workshop-2b3645?logo=steam)]() -->

Printed by Mother is projector automation for Space Engineers, built with [Mother Core](../Framework/README.md). It turns a projector, a set of welders and (usually) a merge block into a **printer**: Mother routines, projector hooks and per-blueprint configuration sections drive the whole print, from recognizing the blueprint on the projector to knowing when the finished ship has left the bay.

::: warning Alpha Development
Printed by Mother is at an early version and command or hook names may still change between builds. The aim is to make these changes minimal, and an upgrade guide will be provided for early adopters.
:::

Like every script built with Mother Core it shares commands with the other Mother programmable blocks on your construct. A printer routine can switch welders and lights with [Mother OS](../IngameScript/IngameScript.md) commands, and Mother OS, buttons, sensors and timers can run Printed by Mother commands.

[[toc]]

## Features

- **Blueprint recognition** - every projection gets a hash from its block counts, so the same blueprint is recognized on any projector and its settings live in one `[blueprint:<hash>]` section on the programmable block. See [Alignment](./Alignment.md#blueprint-hashes).
- **Saved poses and alignment** - save where a blueprint sits relative to the merge block that will hold the print, then `blueprint/align` puts it back there on any printer with one command. Rotate the print about the merge block without breaking the mating.
- **Print jobs** - `blueprint/print` runs the print as a job with phases, hooks and a busy flag, so two prints never weld into the same space. See [Print Jobs](./PrintJobs.md).
- **Weld observation** - Mother watches weld progress on the projector's grid and fires hooks when welding starts, pauses, stalls or completes. Stalls are notifications you can escalate to an abort.
- **Projector state stack** - push a projector's settings, change them for one print, pop them back when the job ends. See [The State Stack](./Alignment.md#the-state-stack).

## Quick Example

One projector, one merge block the printed ship mates to, and a group of welders. The projector aligns every blueprint it loads to the bay's merge block, the blueprint section switches the welders, and one routine runs the print.

```ms title="Bay 1 Projector > Custom Data"
[printer]
name=bay-1

[hooks]
onLoad=blueprint/align this "Bay 1 Merge"
onTimedOut=printer/abort this
```
<br>

```ms title="Printed by Mother > Custom Data"
[blueprint:35db1dca]
name=AMD Rover
offset=0,-3,12
rotation=0,2,0
onPrint=block/on "Bay 1 Welders"
onClear=block/off "Bay 1 Welders"
onFailed=block/off "Bay 1 Welders"

[commands]
PrintBay1=
| blueprint/load "Bay 1 Projector";
| blueprint/print "Bay 1 Projector";
```

`blueprint/load` scans the projector and runs the `onLoad` hooks, which align the projection. `blueprint/print` waits for that load to finish, runs the `onPrint` hooks, watches the welding, waits for the ship to leave the merge block and then runs the `onClear` hooks. The print is then over and the printer is idle again.

::: tip
The examples on these pages switch welders and lights with Mother OS commands such as `block/on` and `light/color`. Those come from a Mother OS programmable block on the same construct: Mother Core hands a command it does not own to the Mother programmable block that does.
:::

## Printers

A **printer** is the set of projectors and attachment points that weld into the same space: typically one projector, the merge block the printed ship mates to, and the welders around them. By default every projector is its own printer. Projectors that print into one bay are grouped by giving them the same `name` in a `[printer]` section of their Custom Data.

Mother runs **one print job per printer at a time**. A job occupies both the printer and its target projector. `blueprint/print` into a busy printer fails immediately, and there is no queue. See [Print Jobs](./PrintJobs.md).

## Blueprints and Hashes

When `blueprint/load` or `blueprint/save` scans a projector, Mother hashes the projection: grid size, total block count and the count of every block type. The hash identifies the blueprint wherever it is projected. The programmable block's Custom Data holds one `[blueprint:<hash>]` section per blueprint with its display name, saved pose, weld settings and the routines to run when it is loaded, printed, cleared or aborted. See [Configuration](./Configuration.md#blueprint-sections).

## Attachments

The **attachment** is the block the printed grid is held by, normally a merge block on the printer. `blueprint/save` records the blueprint's pose against it and `blueprint/align` restores that pose. A merge attachment also tells the print job when the printer is clear: the job's clearing phase ends when the merge block unlocks or disappears. See [Alignment](./Alignment.md).

With the upcoming Warfare 3 release, attachments will be somewhat more complicated. A second set of commands allows specifying non-terminal (i.e., conveyor or armor) blocks as named attachment points, such that a blueprint-borne separation charge can be aligned to them. See the `blueprint/attachment/*` command reference for more details.

## Hooks

Every step of a print can run a routine. The projector's own `[hooks]` section carries scan, job and weld hooks, and the blueprint section carries `onLoad`, `onPrint`, `onClear` and `onFailed` routines for that blueprint. Scan and job hooks receive the projector name, blueprint name and hash as `{{projector}}`, `{{bp}}` and `{{hash}}`. See [Hooks](./Hooks.md).

Continue with the [installation guide](./Installation.md) to load the script and check your first projector.
