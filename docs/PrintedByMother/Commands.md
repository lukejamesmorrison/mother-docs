---
next: /PrintedByMother/PrintJobs.md
---

# Commands

Printed by Mother adds three families of commands: `projector/*` sets projector settings and reads the tracker, `blueprint/*` recognizes, configures and aligns blueprints and starts prints, and `printer/*` acts on a running print job. They can be run from the programmable block terminal, toolbars, button panels, sensors, timers, event controllers, or other Mother routines.

Every `<Projector|Group>` argument accepts a projector name, a group name or a `#tag`. Every `<Printer|Projector|MergeBlock|Group>` argument names a printer by anything that belongs to it: the printer name from its `[printer]` section, one of its projectors, or its attachment merge block; groups and `#tag`s work too.

[[toc]]

## Projector Commands

### `projector/offset`

Set the projection offset in the projector's grid frame, in blocks. Without a flag the value is set absolutely; `--add` and `--sub` compose it with the current offset.

```
projector/offset <Projector|Group> <X> <Y> <Z> [--options]
```

**Options**

| Option | Values | Description |
|---|---|---|
| `add` | | Add the values to the current offset. |
| `sub` | | Subtract the values from the current offset. |

```ms title="terminal"
projector/offset "Bay 1 Projector" 0 -3 12;
```

Nudge the projection one block up:

```ms title="terminal"
projector/offset "Bay 1 Projector" 0 1 0 --add;
```

### `projector/rotation`

Set the projection rotation in the projector's grid frame, in 90-degree steps: X is pitch, Y is yaw, Z is roll. Without a flag the value is set absolutely; `--add` and `--sub` compose it with the current rotation. Read [Rotation Semantics](./Alignment.md#rotation-semantics) before using this on an aligned print.

```
projector/rotation <Projector|Group> <X> <Y> <Z> [--options]
```

**Options**

| Option | Values | Description |
|---|---|---|
| `add` | | Add the values to the current rotation. |
| `sub` | | Subtract the values from the current rotation. |

Turn the projection 180 degrees about the grid's Y axis:

```ms title="terminal"
projector/rotation "Bay 1 Projector" 0 2 0;
```

### `projector/keep-projection`

Set the projector's Keep Projection setting.

```
projector/keep-projection <Projector|Group> <true|false>
```

```ms title="terminal"
projector/keep-projection "Bay 1 Projector" true;
```

### `projector/show-only-buildable`

Set the projector's Show Only Buildable setting.

```
projector/show-only-buildable <Projector|Group> <true|false>
```

```ms title="terminal"
projector/show-only-buildable "Bay 1 Projector" true;
```

### `projector/mark-missing-blocks`

Set the projector's Mark Missing Blocks setting.

```
projector/mark-missing-blocks <Projector|Group> <true|false>
```

```ms title="terminal"
projector/mark-missing-blocks "Bay 1 Projector" false;
```

### `projector/mark-unfinished-blocks`

Set the projector's Mark Unfinished Blocks setting.

```
projector/mark-unfinished-blocks <Projector|Group> <true|false>
```

```ms title="terminal"
projector/mark-unfinished-blocks "Bay 1 Projector" false;
```

### `projector/settings`

Show the projector's default [Weld Settings](./Configuration.md#weld-settings), or update the ones given as options. Updates take effect at once and the four projector settings are applied to the projector; without `--save` they are lost on reload or `projector/reset`. A loaded blueprint's own keys keep precedence: only the settings it does not set follow the change.

```
projector/settings <Projector|Group> [--options]
```

**Options**

| Option | Values | Description |
|---|---|---|
| `maxWeldGap` | seconds | Pause in weld progress before `onWeldEnd` fires. Default 3. |
| `timeout` | seconds | Stall before `onTimedOut` fires. Must be larger than `maxWeldGap`. Default 15. |
| `keepProjection` | `true`, `false` | Keep Projection to apply when a blueprint is loaded. Default `true`. |
| `showOnlyBuildable` | `true`, `false` | Show Only Buildable to apply when a blueprint is loaded. Default `false`. |
| `markMissingBlocks` | `true`, `false` | Mark Missing Blocks to apply when a blueprint is loaded. Default `false`. |
| `markUnfinishedBlocks` | `true`, `false` | Mark Unfinished Blocks to apply when a blueprint is loaded. Default `false`. |
| `save` | | Write the settings into the projector's Custom Data `[projector]` section so they survive a reload. |

```ms title="terminal"
projector/settings "Bay 1 Projector";
```

```
Bay 1 Projector: maxWeldGap=3, timeout=15, keepProjection=True, showOnlyBuildable=False, markMissingBlocks=False, markUnfinishedBlocks=False
```

Give a slow printer a longer stall budget and keep it:

```ms title="terminal"
projector/settings "Bay 1 Projector" --timeout=45 --save;
```

### `projector/status`

Show the projector's tracker state: its printer and print-job phase, whether welding is in progress, the blocks remaining, whether the stall timeout has fired, the current and last print durations, and the longest pause seen between welds.

```
projector/status <Projector|Group>
```

```ms title="terminal"
projector/status "Bay 1 Projector";
```

```
Bay 1 Projector: job=printing, printer=bay-1, welding=True, blocks-remaining=212, timed-out=False, current-print-duration=84.5s, last-print-duration=0s, max-weld-gap=1.2s
```

The job phase is one of `starting`, `printing`, `clearing` or `finishing`; finishing means the `onClear` routine is running, and a paused job shows `(paused)` after its phase, as in `job=printing (paused)`. Without a job the line shows the configured printer name instead, so you can verify your grouping. See [Print Jobs](./PrintJobs.md).

### `projector/reset`

Clear the module's in-memory projector trackers: weld state and statistics, and any weld settings changed with `projector/settings` but not saved. Print jobs and the state stacks are not affected.

```
projector/reset
```

```ms title="terminal"
projector/reset;
```

### `projector/push-state`

Push a snapshot of the projector's settings onto its state stack: Enabled, Keep Projection, Show Only Buildable, Mark Missing Blocks, Mark Unfinished Blocks, projection offset and projection rotation. See [The State Stack](./Alignment.md#the-state-stack).

```
projector/push-state <Projector|Group>
```

```ms title="terminal"
projector/push-state "Bay 1 Projector";
```

### `projector/pop-state`

Restore and discard the most recent snapshot pushed with [`projector/push-state`](#projector-push-state).

```
projector/pop-state <Projector|Group>
```

```ms title="terminal"
projector/pop-state "Bay 1 Projector";
```

## Blueprint Commands

### `blueprint/hash`

Show the hash of the blueprint currently projected by a projector.

```
blueprint/hash <Projector|Group>
```

```ms title="terminal"
blueprint/hash "Bay 1 Projector";
```

### `blueprint/load`

Scan the projector, look up its `[blueprint:<hash>]` section, apply the blueprint's weld settings to the projector and run the `onLoad` hooks. A projector with no projection fires `onEmpty`; a projection whose hash has no section fires `onUnknown` with the hash, so you can save it. See [Scans](./Alignment.md#scans).

```
blueprint/load <Projector|Group> [--options]
```

**Options**

| Option | Values | Description |
|---|---|---|
| `p` | `1`, `2`, ... | Projectors scanned per cycle. Default 8. |
| `async` | | If the projection is partially built, search for an unbuilt offset so it can be hashed. The original offset is restored afterwards. |
| `noWake` | | Do not enable a disabled projector for the scan. |

```ms title="terminal"
blueprint/load "Bay 1 Projector";
```

Load every projector in a group two at a time without waking them:

```ms title="terminal"
blueprint/load "Bay Projectors" --p=2 --noWake;
```

### `blueprint/save`

Scan the projector and save the projection's current pose against an attachment into the blueprint's section, creating the section when it is new. Existing keys such as the name and hooks are kept, and the projector's current [Weld Settings](./Configuration.md#weld-settings) are written alongside the pose. For a merge block attachment the pose is the blueprint's merge block in blueprint coordinates; for any other block it is the projection's pose in that block's frame. The attachment becomes the loaded blueprint's attachment.

```
blueprint/save <Projector|Group> <Attachment|Block|Group> [--options]
```

**Options**

| Option | Values | Description |
|---|---|---|
| `compact` | | Leave out weld-setting keys that equal the projector's defaults. |
| `p` | `1`, `2`, ... | Projectors scanned per cycle. Default 8. |
| `async` | | If the projection is partially built, search for an unbuilt offset so it can be hashed. The original offset is restored afterwards. |
| `noWake` | | Do not enable a disabled projector for the scan. |

```ms title="terminal"
blueprint/save "Bay 1 Projector" "Bay 1 Merge" --compact;
```

### `blueprint/name`

Set the display name stored in the loaded blueprint's section. The rest of the command line is the name.

```
blueprint/name <Projector|Group> <Name>
```

```ms title="terminal"
blueprint/name "Bay 1 Projector" "My First Ship";
```

::: note
`blueprint/name`, `blueprint/transform` and the four `blueprint/on-*` commands find the section through the projection currently on the projector, so the projection must be present and unbuilt when they run. They write the section compactly.
:::

### `blueprint/transform`

Set the loaded blueprint's saved pose directly: an offset triple and a rotation triple in blueprint coordinates, each rotation in 90-degree steps. Normally `blueprint/save` writes these for you.

```
blueprint/transform <Projector|Group> <OffsetX> <OffsetY> <OffsetZ> <RotationX> <RotationY> <RotationZ>
```

```ms title="terminal"
blueprint/transform "Bay 1 Projector" 0 -3 12 0 2 0;
```

### `blueprint/on-load`

Set the routine the loaded blueprint runs when it is loaded. The rest of the command line is the routine; quote it when it contains semicolons.

```
blueprint/on-load <Projector|Group> <Routine>
```

```ms title="terminal"
blueprint/on-load "Bay 1 Projector" "print Loaded {{bp}} on {{projector}}";
```

### `blueprint/on-print`

Set the routine the loaded blueprint runs when a print job starts, before the job commits.

```
blueprint/on-print <Projector|Group> <Routine>
```

```ms title="terminal"
blueprint/on-print "Bay 1 Projector" "block/on \"Bay 1 Welders\"";
```

### `blueprint/on-clear`

Set the routine the loaded blueprint runs when the printer is clear, at the end of a successful print job.

```
blueprint/on-clear <Projector|Group> <Routine>
```

```ms title="terminal"
blueprint/on-clear "Bay 1 Projector" "block/off \"Bay 1 Welders\"";
```

### `blueprint/on-failed`

Set the routine the loaded blueprint runs when its print job is aborted.

```
blueprint/on-failed <Projector|Group> <Routine>
```

```ms title="terminal"
blueprint/on-failed "Bay 1 Projector" "block/off \"Bay 1 Welders\"";
```

### `blueprint/print`

Start a [print job](./PrintJobs.md) on the projector's printer: enable the projector, run the `onPrint` hooks, observe welding until the projection is complete, wait for the printer to be clear, then run the `onClear` hooks. The command accepts a single projector; a group or `#tag` must resolve to exactly one. It fails at once if the printer is busy, and the job is cancelled without hooks if the projector has no loaded blueprint.

```
blueprint/print <Projector>
```

```ms title="terminal"
blueprint/print "Bay 1 Projector";
```

::: tip
The stall clock starts when the `onPrint` chain finishes. If your prep takes longer than that, pause the job from the chain with `printer/pause` and resume it when the welders are ready. See [Pausing a Job](./PrintJobs.md#pausing-a-job).
:::

### `blueprint/align`

Align the projection to an attachment using the loaded blueprint's saved pose. For a merge block the printed merge block is placed face to face with it; for any other block or named attachment the saved pose is restored in that block's frame. The attachment is recorded for the print job. Requires a loaded blueprint. See [Attachments](./Alignment.md#attachments).

```
blueprint/align <Projector|Group> <Attachment|Block|Group>
```

```ms title="terminal"
blueprint/align "Bay 1 Projector" "Bay 1 Merge";
```

### `blueprint/rotate`

Rotate the projection by a rotation expressed in the attachment merge block's own frame, in 90-degree steps, and move the projection so that the printed merge block stays where it is. The rotation is added to the current one; `--sub` negates it. Requires a loaded blueprint that was saved against a merge attachment, and a merge block on the projector's grid. See [Rotation Semantics](./Alignment.md#rotation-semantics) for how this differs from `projector/rotation`.

```
blueprint/rotate <Projector|Group> <MergeBlock|Group> <X> <Y> <Z> [--options]
```

**Options**

| Option | Values | Description |
|---|---|---|
| `sub` | | Negate the rotation. |

Print the ship upside down, whatever the merge block's orientation:

```ms title="terminal"
blueprint/rotate "Bay 1 Projector" "Bay 1 Merge" 2 0 0;
```

### `blueprint/attachment/set`

Define a [named attachment](./Configuration.md#named-attachments): a fixed position and rotation in the projector grid's coordinates, stored as `[attachment:<name>]` on the programmable block. Use the name wherever a command takes an attachment.

```
blueprint/attachment/set <Name> <OffsetX> <OffsetY> <OffsetZ> <RotationX> <RotationY> <RotationZ>
```

```ms title="terminal"
blueprint/attachment/set bay-1-floor 0 -4 0 0 0 0;
```

### `blueprint/attachment/show`

Show one named attachment, or all of them when no name is given.

```
blueprint/attachment/show [Name]
```

```ms title="terminal"
blueprint/attachment/show;
```

### `blueprint/attachment/clear`

Remove a named attachment.

```
blueprint/attachment/clear <Name>
```

```ms title="terminal"
blueprint/attachment/clear bay-1-floor;
```

## Printer Commands

### `printer/pause`

Hold the printer's job: every print clock stands still until `printer/resume`. Accepted while the job is starting, printing or clearing; a finishing job is refused, and a job that is already paused says so. The welders are not switched off. See [Pausing a Job](./PrintJobs.md#pausing-a-job).

```
printer/pause <Printer|Projector|MergeBlock|Group>
```

Hold the job until the welders are ready:

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onPrint=printer/pause this; block/on "Bay 1 Welders"; wait 20; printer/resume this
```

### `printer/resume`

Release a paused job. The clocks continue from where they stood; nothing is re-armed. A starting job commits at once, paused or not, and a printing job whose projection completed while paused begins clearing. On an unpaused job past the starting phase it reports that the job is not paused and changes nothing.

```
printer/resume <Printer|Projector|MergeBlock|Group>
```

```ms title="terminal"
printer/resume bay-1;
```

### `printer/clear`

End the clearing phase of the printer's job. This is the signal a `clear=manual` printer waits for; it also works on a `clear=auto` printer. During any other phase it reports the phase and changes nothing. See [Knowing When the Printer Is Clear](./PrintJobs.md#knowing-when-the-printer-is-clear).

```
printer/clear <Printer|Projector|MergeBlock|Group>
```

```ms title="terminal"
printer/clear bay-1;
```

### `printer/abort`

Abort the printer's job in any phase. The `onFailed` hooks run instead of `onClear`, and the printer is idle at once. The half-printed grid stays in the bay. See [Stalls and Failures](./PrintJobs.md#stalls-and-failures).

```
printer/abort <Printer|Projector|MergeBlock|Group>
```

```ms title="terminal"
printer/abort "Bay 1 Projector";
```
