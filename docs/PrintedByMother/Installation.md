---
next: /PrintedByMother/Configuration.md
---

# Installation

[[toc]]

## Prerequisites

Printed by Mother is a script for Programmable Blocks in Space Engineers. It is built on [Mother Core](../Framework/README.md) and shares its command line, routines, variables and hooks with other Mother Core scripts such as [Mother OS](../IngameScript/IngameScript.md).

To run Printed by Mother, your grid must have:

1. A programmable block with the Printed by Mother script loaded.
2. At least one projector.
3. Welders that reach the projection, for example a wall of ship welders around the bay.

A merge block that the printed ship mates to is optional but recommended. It is what `blueprint/align` aligns to, and it is how a print job knows the bay is clear.

If you are new to Mother commands, read the [Command Line Interface](../IngameScript/CommandLineInterface.md) page first. Routines separate commands with semicolons and pause with `wait <seconds>`. Custom routines live in `[commands]`, variables live in `[variables]` and are referenced as `$NAME`, and runtime parameters use `{{name}}` or `{{name:default}}`.

::: note
The examples on these pages switch welders and lights with Mother OS commands such as `block/on` and `light/color`. Those come from a Mother OS programmable block on the same construct: Mother Core hands a command it does not own to the Mother programmable block that does.
:::

## Setup

### 1. Load Printed by Mother into a Programmable Block

Open the programmable block in the terminal, press `Edit`, load the Printed by Mother script and press `Ok`. The description at the top of the code editor confirms the script is loaded.

### 2. Rename the Programmable Block

Give the block a clear name such as `Printed by Mother`, so routines on other blocks can address it. Optionally, set a tag in its custom data for the same purpose.

### 3. Boot

Printed by Mother boots when the script is loaded. If it does not, run the `boot` command or press `Recompile`.

### 4. Give the Projector a Hook

Open the Custom Data of the projector you will print from and add a `[hooks]` section. The `onUnknown` hook fires when a scan finds a blueprint that has no configuration yet, and it receives the blueprint's hash.

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onUnknown=print "No blueprint section for {{hash}} on {{projector}}";
```

The other sections a printer uses, `[printer]` on the projector or merge block and `[blueprint:<hash>]` on the programmable block, are described in [Configuration](./Configuration.md).

## First Check

Paste a blueprint into the projector. Nothing may be welded yet. Then run, in the programmable block's terminal:

```ms title="terminal"
blueprint/load "Bay 1 Projector";
projector/status "Bay 1 Projector";
```

Confirm that:

1. `blueprint/load` answers at once with a `Queued load` message, and a few updates later prints a summary such as `Load: 0/1 loaded, 1 unknown` that names the missing section `blueprint:<hash>`.
2. The projector's `onUnknown` hook ran and printed the same hash. That hash is the blueprint's identity on every projector; the next page shows the section it belongs in, and [Alignment](./Alignment.md#your-first-blueprint) saves it for you with `blueprint/save`.
3. `projector/status` lists the projector with its printer and weld state and no job.

If the summary says `empty`, the projector has no projection. If it says `invalid`, the projection overlaps with existing blocks; move the projection until it is clear of any overlapping blocks and rerun the above procedure.

The next step is learning which Custom Data sections Printed by Mother reads and what goes in each.