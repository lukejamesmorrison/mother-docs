---
next: /PrintedByMother/Commands.md
---

# Configuration

Printed by Mother is configured entirely through `Custom Data`. It reads the Custom Data of three kinds of block:

- The Printed by Mother programmable block for the blueprint sections, named attachments and your own routines
- Each projector for its hooks, its printer membership and its default weld settings
- The merge block a print is attached to, for printer membership

[[toc]]

## Programmable Block

### Blueprint Sections

Each known blueprint has one `[blueprint:<hash>]` section, where `<hash>` is the blueprint's [hash](./Alignment.md#blueprint-hashes). The section is created by `blueprint/save` and edited by `blueprint/name`, `blueprint/transform` and the four `blueprint/on-*` commands, or by hand.

```ms title="Printed by Mother > Custom Data"
[blueprint:deadbeef]
name=My Test Ship
offset=0,-3,12
rotation=0,2,0
timeout=30
onLoad=screen/print "Bay 1 Status" "Loaded {{bp}} on {{projector}}";
onPrint=
| block/on "Bay 1 Welders";
| piston/distance "Bay 1 Welder Piston" 0;
onClear=
| block/off "Bay 1 Welders";
| piston/distance "Bay 1 Welder Piston" 10;
| screen/print "Bay 1 Status" "{{bp}} has printed, clear for another job";
onFailed=
| block/off "Bay 1 Welders";
| screen/print "Bay 1 Status" "{{bp}} failed to print";
```

| Key | Set by | Description |
|---|---|---|
| `name` | `blueprint/name` | Display name, passed to hooks as `{{bp}}`. |
| `offset`, `rotation` | `blueprint/save`, `blueprint/transform` | The saved pose, two comma-separated triples. For a merge block attachment they describe the blueprint's merge block in blueprint coordinates (its position and intrinsic rotation), so the same section works on any printer. For any other attachment they describe the projection's pose in the attachment's frame. Which interpretation applies is decided at align time from the attachment, not from the section. See [The Saved Pose](./Alignment.md#the-saved-pose). |
| `maxWeldGap`, `timeout`, `keepProjection`, `showOnlyBuildable`, `markMissingBlocks`, `markUnfinishedBlocks` | `blueprint/save` | Per-blueprint overrides of the projector's [Weld Settings](#weld-settings). Keys that are absent fall back to the projector's defaults. |
| `onLoad`, `onPrint`, `onClear`, `onFailed` | `blueprint/on-load`, `blueprint/on-print`, `blueprint/on-clear`, `blueprint/on-failed` | Routines run for this blueprint; see [Hooks](./Hooks.md#blueprint-hooks). |
| `subgrids` | | Parsed and written back but not consumed yet; reserved for multigrid projector support. |

`blueprint/load` restores any temporary projector offset first, then runs the projector's `onLoad` hook to completion, then the blueprint's `onLoad` routine.

::: note
`blueprint/name`, `blueprint/transform` and the four `blueprint/on-*` commands find the section through the projection currently on the projector, so the projection must be present and no blocks can count as built when they run. They write the section compactly.
:::

### Named Attachments

A named attachment is a fixed position and rotation in the projector grid's coordinates, for printers without a terminal block to align against. It is stored as `[attachment:<name>]` and written by [`blueprint/attachment/set`](./Commands.md#blueprint-attachment-set); use the name wherever a command takes an attachment. Named attachments are checked before block names.

```ms title="Printed by Mother > Custom Data"
[attachment:bay-1-floor]
offset=0,-4,0
rotation=0,0,0
```

| Key | Description |
|---|---|
| `offset` | Position in the projector grid's coordinates, in blocks. |
| `rotation` | Rotation in the projector grid's frame, in 90-degree steps. |

### Routines, Variables and Fallback Hooks

The programmable block also carries Mother Core's own sections: custom routines in `[commands]`, variables in `[variables]`, and fallback hooks in `[hooks]` written as `"<block>".onLoad=...`.

```ms title="Printed by Mother > Custom Data"
[variables]
BAY1="Bay 1 Projector"

[commands]
PrintBay1=
| blueprint/load "$BAY1";
| blueprint/print "$BAY1";

[hooks]
"Bay 1 Projector".onComplete=light/color "Bay 1 Light" green;
```

| Section | Contents |
|---|---|
| `[commands]` | Your routines, run by name from the terminal, a button, a sensor or a timer. |
| `[variables]` | Values referenced as `$NAME` in routines. |
| `[hooks]` | Fallback hooks for a projector or group, in Mother Core's `"<block>".hook=` form. They fire, but `{{projector}}`, `{{hash}}` and `{{bp}}` are not substituted in them; see [Parameter Substitution](./Hooks.md#parameter-substitution). |

## Projector

### Hooks

The projector's `[hooks]` section carries its scan, job and weld hooks. `this` stands for the projector. All of them, with their parameters and firing order, are on the [Hooks](./Hooks.md#projector-hooks) page.

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onUnknown=screen/print "Bay 1 Status" "No blueprint section for {{hash}} on {{projector}}";
onLoad=blueprint/align this "Bay 1 Merge";
onWeldStart=light/color "Bay 1 Lights" yellow;
onWeldEnd=light/color "Bay 1 Lights" white;
onTimedOut=printer/abort this;
onComplete=light/color "Bay 1 Lights" green;
onFailed=light/color "Bay 1 Lights" red;
```

| Key | Trigger |
|---|---|
| `onEmpty`, `onUnknown`, `onLoad` | Results of a `blueprint/load` scan: no projection, a projection with no section, or a loaded blueprint. |
| `onPrint`, `onClear`, `onFailed` | Print job transitions: the job started, the printer is clear, the job was aborted. |
| `onWeldStart`, `onWeldEnd`, `onTimedOut`, `onComplete` | Weld observation: welding began, paused for `maxWeldGap` seconds, stalled for `timeout` seconds, or the projection is complete. |

### Printer

By default every projector is its own printer. A `[printer]` section groups projectors that weld into the same space and picks how a job's clearing phase ends. See [Printers](./PrintJobs.md#printers).

```ms title="Bay 1 Projector > Custom Data"
[printer]
name=bay-1
clear=auto
```

| Key | Values | Description |
|---|---|---|
| `name` | text | The printer this block belongs to. Blocks with the same name form one printer. Names are matched exactly; a misspelled name silently creates a separate printer. |
| `clear` | `auto` (default), `manual` | How a job's clearing phase ends: when the attachment merge block unlocks or disappears, or only when `printer/clear` runs. See [Knowing When the Printer Is Clear](./PrintJobs.md#knowing-when-the-printer-is-clear). |

### Weld Settings

Each projector has a set of weld settings. Their defaults come from the projector's own `[projector]` section, and a loaded blueprint may override them with the same keys in its `[blueprint:<hash>]` section. Read and change them with [`projector/settings`](./Commands.md#projector-settings); `projector/settings --save` writes this section. See [Weld Observation](./Alignment.md#weld-observation) for what the settings govern.

```ms title="Bay 1 Projector > Custom Data"
[projector]
maxWeldGap=4
timeout=20
```

| Key | Default | Description |
|---|---|---|
| `maxWeldGap` | `3` | Seconds without weld progress before welding counts as paused and `onWeldEnd` fires. |
| `timeout` | `15` | Seconds of stall before `onTimedOut` fires. Must be larger than `maxWeldGap`. |
| `keepProjection` | `true` | Keep Projection to apply to the projector when a blueprint is loaded. |
| `showOnlyBuildable` | `false` | Show Only Buildable to apply when a blueprint is loaded. |
| `markMissingBlocks` | `false` | Mark Missing Blocks to apply when a blueprint is loaded. |
| `markUnfinishedBlocks` | `false` | Mark Unfinished Blocks to apply when a blueprint is loaded. |

## Merge Block

The merge block a print is attached to may carry a `[printer]` section with the same keys as the projector's. Values on the attachment beat values on the projector. Name the merge block itself when several projectors must share one bay.

```ms title="Bay 1 Merge > Custom Data"
[printer]
name=bay-1
clear=manual
```

| Key | Values | Description |
|---|---|---|
| `name` | text | The printer this merge block belongs to. Beats the projector's `name`. |
| `clear` | `auto` (default), `manual` | How a job's clearing phase ends. Beats the projector's `clear`; pinned when the job starts. |
