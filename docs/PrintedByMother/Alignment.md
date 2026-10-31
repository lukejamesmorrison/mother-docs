---
next: /PrintedByMother/Hooks.md
---

# Alignment

Printed by Mother recognizes the blueprint on a projector by its hash, keeps that blueprint's pose in its `[blueprint:<hash>]` section, aligns the projection to the block that will hold the print, and watches the welding on the projector's grid. This page explains the hash, the saved pose, attachments, the two ways of rotating a print, the projector state stack and weld observation. The commands themselves are on the [Commands](./Commands.md) page.

[[toc]]

## Blueprint Hashes

A projection is hashed from its grid size, its total block count and the count of every block type in it. The same blueprint therefore has the same hash on every projector, and the hash is how Mother finds the blueprint's section. Hashing needs an **unbuilt** projection: a projection with blocks already welded fails validation with "must be unbuilt before hashing". The `--async` option of `blueprint/load` and `blueprint/save` works around this by searching nearby offsets for a position where no block is built.

`blueprint/hash` shows the hash of the projection currently on a projector.

## Scans

`blueprint/load` and `blueprint/save` **scan** the projector. Both commands return at once with a "Queued" message and run over the following updates, printing a summary when they finish. A scan:

1. enables a disabled projector (unless `--noWake`) and, for a load, turns on Show Only Buildable so the projection can be inspected;
2. waits for the projection's block count to settle, since the game loads projections asynchronously;
3. with `--async`, if the projection is partially built, walks it through a set of offsets until an unbuilt position is found;
4. hashes the projection and does its work;
5. restores the projector's original offset, Show Only Buildable and enabled state.

Projectors are scanned a few at a time; `--p` sets how many per cycle (8 when omitted). Projectors of a busy printer defer their scan; see [Scans while a printer is busy](./PrintJobs.md#scans-while-a-printer-is-busy).

`blueprint/load` looks up the `[blueprint:<hash>]` section, applies the blueprint's weld settings to the projector and runs the `onLoad` hooks. A projector with no projection fires `onEmpty`; a projection whose hash has no section fires `onUnknown` with the hash, so you can save it. `blueprint/load` restores any temporary projector offset first, then runs the projector's `onLoad` hook to completion, then the blueprint's `onLoad` routine.

## The Saved Pose

The `offset` and `rotation` keys of the [blueprint section](./Configuration.md#blueprint-sections) are the blueprint's saved pose, two comma-separated triples with each rotation in 90-degree steps. `blueprint/save` writes them; `blueprint/transform` sets them directly.

- For a **merge block attachment** they describe the blueprint's own merge block in blueprint coordinates: its position and intrinsic rotation. That is why the same section works on any printer.
- For **any other attachment** they describe the projection's pose in the attachment's frame.

Which interpretation applies is decided at align time from the attachment, not from the section.

## Attachments

An **attachment** is what a saved pose is relative to. It can be:

- **A merge block** on the projector's grid (recommended). `blueprint/save` stores the blueprint's own merge block as the anchor, and `blueprint/align` places the projection so that the printed merge block sits one cell off the bay merge block's face, face to face, whatever the bay merge block's orientation. The merge block is also the print job's **bridge**: with `clear=auto` the job's clearing phase ends when it unlocks or is removed.
- **Any other block** on the projector's grid. The pose is stored in that block's frame. The print job then has no bridge, so clearing ends as soon as the projection completes unless the printer uses `clear=manual`.
- **A named attachment** defined with [`blueprint/attachment/set`](./Commands.md#blueprint-attachment-set): a fixed position and rotation in the projector grid's coordinates, stored as `[attachment:<name>]` on the programmable block. Named attachments are checked before block names.

A group or `#tag` given as an attachment must resolve to exactly one block, on the same grid as the projector.

The attachment the print job uses is the merge block the loaded blueprint was last aligned against (`blueprint/align`) or saved against (`blueprint/save`); both assert the association with equal confidence. Moving the projection by hand afterwards does not change it, and `blueprint/rotate` preserves it.

`blueprint/align` restores the saved pose against an attachment: for a merge block the printed merge block is placed face to face with it; for any other block or named attachment the saved pose is restored in that block's frame. It requires a loaded blueprint.

## Your First Blueprint

1. Paste the blueprint into the projector and position it by hand so that its merge block sits face to face with the bay's merge block, one cell off the merge face. Nothing may be welded yet.
2. Save the pose against the bay's merge block and give the blueprint a name:

```ms title="terminal"
blueprint/save "Bay 1 Projector" "Bay 1 Merge";
blueprint/name "Bay 1 Projector" "My First Ship";
```

3. From now on, loading the projector and aligning it is one routine, on this printer or any other with a merge block:

```ms title="terminal"
blueprint/load "Bay 1 Projector";
blueprint/align "Bay 1 Projector" "Bay 1 Merge";
blueprint/print "Bay 1 Projector";
```

::: tip
Put the align in the projector's `onLoad` hook (`onLoad=blueprint/align this "Bay 1 Merge"`) so that every blueprint loaded on that projector aligns itself. `blueprint/print` waits for a pending load, and its `onLoad` chain, to finish before it starts.
:::

## Rotation Semantics

There are two rotation commands with deliberately different semantics.

[`projector/rotation`](./Commands.md#projector-rotation) changes the projection rotation in the **projector's grid frame**. No flag is an absolute set; `--add` and `--sub` compose vector-wise with the current value. The convention is pitch on X, yaw on Y and roll on Z, each in 90-degree units. For an aligned merge-attached projection where the merge block sits in its default orientation, `--add 2 0 0` will visually flip the projection upside down. For other merge orientations it rotates about the grid's X axis, which may not be the axis you intended.

[`blueprint/rotate`](./Commands.md#blueprint-rotate) changes the projection rotation by a rotation expressed in the **attachment merge block's frame**. It is always additive; `--sub` negates the delta. There is no absolute form, because an absolute rotation in the attachment frame has no well-defined baseline. Use it for "rotate the printed ship upside down about the merge block's X axis" regardless of how the merge block is oriented on the printer. The projection offset is compensated automatically so the printed merge block stays at the same grid position across the rotation; without that, rotating about the projection origin would shift the printed merge block away from the bay's merge block and break the mating. It requires a loaded blueprint saved against a merge attachment.

A one-shot upside-down print with automatic restore is worked through in [Examples](./Examples.md#upside-down-print).

## The State Stack

`projector/push-state` captures a projector snapshot (Enabled, Show Only Buildable, Mark Missing Blocks, Mark Unfinished Blocks, Keep Projection, projection offset and projection rotation) onto a per-projector last-in-first-out stack. `projector/pop-state` restores the most recent snapshot and discards it.

Routines may nest pushes and pops as long as they pair last-in-first-out. A pop without a matching push is a silent no-op; the command's "popped N of M" total reflects how many actually popped.

::: warning Bookmarks, not transactions
If a routine errors between push and pop, the pop will not run and the projector stays in the modified state. Pair them carefully: Mother routines have no `try`/`finally`.
:::

Stacks are in memory only and are cleared on `boot` and on script reload. Each projector's stack holds at most 16 entries. Hitting the cap indicates a routine that is leaking pushes; further pushes on that projector are refused with a printed warning until the stack drains.

## Weld Observation

Mother watches the weld progress of blocks on the projector's grid. Progress on a block counts as welding: while the block Mother is watching keeps gaining build integrity, welding is in progress and the stall clock is reset. A block is **partial** while its construction is incomplete, that is, its build integrity is below maximum. Damage does not count: a dented but fully built block never holds a weld open or blocks completion. Mother finds partial blocks by walking the projector grid's bounding box a bounded number of cells per run, so on a large grid a hold engages, and completion is confirmed, a few runs after the fact rather than in the same run.

Weld observation is grid-scoped. Two printers whose projectors share one cube grid, or that are merged into one construct mid-print, will observe each other's welding, which can delay completion detection. Give concurrent printers separate grids where possible.

The weld hooks `onWeldStart`, `onWeldEnd`, `onTimedOut` and `onComplete` are pure notifications about welding on the projector's grid. They fire with or without a print job; see [Hooks](./Hooks.md#projector-hooks).

Each projector has a set of [weld settings](./Configuration.md#weld-settings): `maxWeldGap` is how many seconds without weld progress count as a pause and fire `onWeldEnd`, `timeout` is how many seconds of stall fire `onTimedOut`, and `keepProjection`, `showOnlyBuildable`, `markMissingBlocks` and `markUnfinishedBlocks` are applied to the projector when a blueprint is loaded. Their defaults come from the projector's own `[projector]` section, a loaded blueprint may override them with the same keys in its `[blueprint:<hash>]` section, and [`projector/settings`](./Commands.md#projector-settings) reads and changes them.
