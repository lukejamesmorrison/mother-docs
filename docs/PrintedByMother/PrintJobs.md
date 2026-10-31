---
next: /PrintedByMother/Alignment.md
---

# Print Jobs

A print is run as a **print job**: `blueprint/print` creates it, the projector module carries it through its phases, and the [`printer/*` commands](./Commands.md#printer-commands) let you intervene. This page explains what a printer is, how a job lives and ends, and how to pause, clear and abort it.

[[toc]]

## Printers

A **printer** is the set of projectors and attachment points that weld into the same space. Two prints that share space would weld into each other, so Mother runs **one print job per printer at a time**. A job also occupies its target projector: one projector never runs two jobs, whatever its printer.

By default every projector (or attachment) is its own printer. If several can print into the same volume, give them the same printer name in a `[printer]` section of their Custom Data:

```ms title="Bay 1 Projector > Custom Data"
[printer]
name=bay-1
clear=manual
```

The section may sit on the projector, on the attachment merge block, or both. Mother uses the most specific thing it knows, in order: the attachment's `name`, the projector's `name`, the attachment block itself, the projector itself. Explicit names always beat implicit identities, so two blueprints aligned to the same unnamed merge block share a printer *unless* their projectors carry different `name=` values. To make a shared merge block an ironclad guarantee, name the merge block itself. Names are matched exactly; a misspelled name silently creates a separate printer.

| Key | Values | Description |
|---|---|---|
| `name` | text | The printer this block belongs to. Blocks with the same name form one printer. |
| `clear` | `auto` (default), `manual` | How a job's clearing phase ends. See [Knowing When the Printer Is Clear](#knowing-when-the-printer-is-clear). |

Run `projector/status` to check a projector's printer and job phase, shown as `starting`, `printing`, `clearing` or `finishing` (finishing means the `onClear` routine is running). A [paused](#pausing-a-job) job shows `(paused)` after its phase, as in `job=printing (paused)`.

The attachment is whatever merge block the loaded blueprint was last aligned against (`blueprint/align`) or saved against (`blueprint/save`); both assert the association with equal confidence. Hand-moving the projection afterwards does not update it; `blueprint/rotate` preserves it.

Every `printer/*` command names the printer by anything that belongs to it: the printer name from its `[printer]` section, one of its projectors, or its attachment merge block. Groups and `#tag`s work too.

## The Life of a Print Job

`blueprint/print <Projector>` starts a job on that projector's printer. A printer with a job in any phase is **busy**: `blueprint/print` into it fails immediately with an error. There is no queue; that is deliberate.

1. **starting** - the job waits for any pending `blueprint/load` on the projector, enables the projector and runs the `onPrint` hooks. Once the chain finishes the job **commits** and moves on. If prep takes longer than the chain, pause the job from the chain itself; see [Pausing a Job](#pausing-a-job).
2. **printing** - Mother watches the weld progress until the projection is complete and `onComplete` has fired.
3. **clearing** - the projection is complete, but the printed ship may still be attached. The job waits for the printer to be clear; see [Knowing When the Printer Is Clear](#knowing-when-the-printer-is-clear).
4. **finishing** - the `onClear` hooks are running. When the sequential part of the routine completes, the job is over and the printer is idle again. "Idle" truthfully means the sequential part of your `onClear` routine completed; parallel branches are not waited on.

A job ends in exactly one of two ways: **cleared** (success, `onClear` runs) or **aborted** (`printer/abort`, `onFailed` runs instead). A job never gives up on its own.

## Stalls and Failures

If welding stalls longer than `timeout` seconds (set with `projector/settings --timeout=`), or never starts within `timeout` seconds of the commit, `onTimedOut` fires. Progress on a block counts as welding: while the block Mother is watching keeps gaining build integrity the stall clock is reset, so one block that takes longer than `timeout` to weld up does not stall.

::: tip A notification, not a failure
`onTimedOut` does not end the job. The job keeps waiting, and if welding resumes (you cleared the jam, refilled the welders) the print continues normally. That holds even when every block was already placed and the recovery only raises block integrity, a state the projector's own counters never report: the job polls for completion itself, so `onComplete` still fires and clearing still starts.
:::

To make stalls fatal, wire the hook to the abort:

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onTimedOut=printer/abort this;
```

`printer/abort` cancels the job in any phase: `onFailed` runs for cleanup, `onClear` does not, and the printer goes idle immediately. A wedged `onFailed` routine can never hold the printer busy. Whatever is half-printed stays in the bay: abort frees the printer, it does not clean the bay.

Mother does not own the hardware. Disabling the projector by hand mid-print suspends weld observation entirely, with no stall notification while the projector is off. Re-enable it to continue, or abort the job.

A [paused](#pausing-a-job) job stops every print clock: the stall clock, the weld-gap dwell and the duration statistics stand still, so `onTimedOut` cannot fire while the job is paused and the recorded print durations exclude paused time. Pausing stops the clocks only. Routines keep running (a `wait` in a routine keeps counting) and the welders themselves are not switched off; do that yourself if the hold needs it. A paused job whose projector disappears is still dropped, exactly like an unpaused one.

A block is *partial* while its construction is incomplete: build integrity below maximum. Damage does not count; a dented but fully built block never holds a weld open or blocks completion. Mother finds partial blocks by walking the projector grid's bounding box a bounded number of cells per run, so on a large grid the hold engages, and completion is confirmed, a few runs after the fact rather than in the same run. See [Weld Observation](./Alignment.md#weld-observation).

## Pausing a Job

By default the job commits, and the stall clock begins, as soon as the `onPrint` chain finishes. The chain only waits for routines defined on the Mother programmable block that runs Printed by Mother. A command owned by another Mother programmable block on the construct is handed over and not waited on, and piston or rotor travel is never waited on, so prep of that kind eats the stall budget and a long warm-up fires `onTimedOut` before welding can start.

`printer/pause` holds the job. Pause it pre-emptively as the first step of the `onPrint` chain, and resume it with `printer/resume this` from the step that really knows prep is done, for example right after the welders switch on or at the end of a piston climb. The resume can also come from a sensor, timer or button that runs the programmable block with `printer/resume <printer>`.

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onPrint=printer/pause this; block/on "Bay 1 Welders"; wait 20; printer/resume this;
```

The chain still commits the job when it finishes, but a paused job's clocks stand still: the stall budget only starts counting when `printer/resume` runs, so the full `timeout` is available once welding really can begin. The same hold works mid-print, for example while you refill the welders.

A job can be paused in the starting, printing and clearing phases. A finishing job is refused, since its only clock is the `onClear` routine. While a job is paused:

- the stall clock, the weld-gap dwell, the clear grace window, the completion poll and the duration statistics do not advance, so `onTimedOut` cannot fire, `onWeldEnd` and `onComplete` wait for the resume, and a paused job never starts clearing;
- weld observation keeps running: a block gaining integrity still counts as welding, fires `onWeldStart` and resets the stall clock, because those are events, not time;
- routines keep running and the welders are not switched off: pause stops the job's clocks, not the hardware;
- a paused job whose projector disappears is still dropped after a few runs, exactly like an unpaused one.

`printer/resume` releases the hold. Nothing is reset or re-armed: the stall clock, a timed-out flag and every other counter continue from their pre-pause values. A job paused 5 seconds into a stall has 10 seconds of a 15-second `timeout` left after the resume, not a fresh 15, and a job that had already timed out stays timed out until welding progresses. A starting job that is resumed commits at once, even if its `onPrint` chain has not finished; this also works on a starting job that was never paused, if you want to commit early. A printing job whose projection completed while it was paused begins clearing on resume.

A paused printer is still busy: `blueprint/print` into it fails, while `printer/clear` and `printer/abort` still act on it at once. A paused job that never gets its resume holds the printer until `printer/abort` frees it. Pausing a paused job reports `already paused`, resuming a job that is past starting and not paused reports `not paused`, and pausing a finishing job reports `job is finishing; nothing to pause`.

::: note
Do not confuse the pause with `maxWeldGap`, the weld-gap dwell. That setting is how long a welding pass stays open after its last progress, and it is one of the clocks a pause stops.
:::

## Knowing When the Printer Is Clear

`clear=` (pinned when the job starts; the attachment's value beats the projector's) picks how the clearing phase ends:

- `clear=auto` (default): the **bridge** is the merge block your print is attached to. Clearing ends when the bridge unlocks or is removed. If the print has no merge attachment, there is nothing to watch and clearing ends as soon as the projection completes.
- `clear=manual`: clearing ends only when you run `printer/clear`. Wire a sensor, timer or button to it.

Auto only understands the print's own merge attachment. If your ship is held by a connector, landing gear, or a merge block on a piston or rotor subgrid, anything that is not the aligned merge block, use `clear=manual` and wire your own signal.

`printer/clear` ends the clearing phase in either mode. Any member of the printer works, and it acts on the job, not the projection. During any other phase it reports the phase and changes nothing. A worked setup with two projectors and a sensor is in [Examples](./Examples.md#two-projectors-sharing-a-bay).

## Scans While a Printer Is Busy

- **The target projector**: a `blueprint/load` it was already waiting on finishes first, so the print uses fresh blueprint state. After the job commits, its scans defer.
- **Other projectors of a busy printer**: scans defer for the whole job. With always-on welders, waking one would let the welders latch onto its projection before the intended target.
- **Projectors of idle printers**: scan normally.

Deferred scans still count as finished for anything waiting on them, so nothing waits forever, and they are noted in the load or save summary. Re-run `blueprint/load` after the print to refresh deferred projectors.

## Reloads and Recompiles

Jobs survive script recompiles and world reloads: recompiling does not cancel a print, `printer/abort` does. After a reload the job resumes where it was. A printing job keeps re-checking completion (a weld that finished while the script was off, or that finishes afterwards without any block count changing, is still detected) and re-arms its stall clock. A clearing job re-checks its bridge; a bridge that vanished or unlocked while the script was off counts as clear.

A job that had not yet committed (still starting) is dropped on reload; re-run `blueprint/print`. A paused job comes back paused. If the reload interrupted your `onClear` routine, run `printer/clear` (or abort) to finish the job. A job whose target projector no longer exists is dropped with a printed note.

## Limitations

- Weld observation is grid-scoped: two printers whose projectors share one cube grid (or are merged into one construct mid-print) will observe each other's welding, which can delay completion detection. Give concurrent printers separate grids where possible.
- Printer names are global to one Mother programmable block; coordination across multiple Mother programmable blocks is out of scope.
- Anonymous printers are identified by entity id in messages. Name your printer for readable output.
