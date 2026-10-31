# Examples

Let's look at some practical Printed by Mother setups. See [Configuration](./Configuration.md) for the Custom Data sections, [Commands](./Commands.md) for the commands and [Hooks](./Hooks.md) for when each routine runs.

The examples switch welders, pistons and lights with Mother OS commands such as `block/on`, `piston/distance` and `light/color`, which a Mother OS programmable block on the same construct provides.

[[toc]]

## A Drag Printer

A simple drag printer: a large-grid piston drags the projection through a wall of welders. Either the welders ride on the piston head and the projector and merge block stand still, or the projector and merge block ride on the head and the welders stand still; the Custom Data below is the same for both. The piston starts fully extended, with the merge block just in front of the welders, and retracts slowly. While the welders are busy the piston stands still; when they fall quiet the slice is done and the piston resumes its slow retraction.

```ms title="Bay 1 Projector > Custom Data"
[projector]
timeout=30

[hooks]
onLoad=blueprint/align this "Bay 1 Merge";
onPrint=
| printer/pause this;
| block/on "Bay 1 Merge";
| piston/distance "Bay 1 Piston" 10 --speed=1;
| wait 12;
| block/on "Bay 1 Welders";
| piston/distance "Bay 1 Piston" 0 --speed=0.2;
| printer/resume this;
onWeldStart=piston/stop "Bay 1 Piston";
onWeldEnd=piston/distance "Bay 1 Piston" 0 --speed=0.2;
onTimedOut=light/color "Bay 1 Lights" red;
onComplete=
| block/off "Bay 1 Welders";
| light/color "Bay 1 Lights" green;
onClear=light/color "Bay 1 Lights" white;
onFailed=
| piston/stop "Bay 1 Piston";
| block/off "Bay 1 Welders";
| light/color "Bay 1 Lights" red;
```
<br>

```ms title="Printed by Mother > Custom Data"
[commands]
PrintBay1=
| blueprint/load "Bay 1 Projector";
| blueprint/print "Bay 1 Projector";
```

`blueprint/align` keeps the printed merge block face to face with the bay's, whichever of the two is on the piston head. `onPrint` pauses the job while the piston returns to full extension, since the chain never waits for piston travel, then switches the welders on, starts the slow retraction towards 0 m and resumes the job. From then on the weld hooks drive the piston: `onWeldStart` stops it as soon as the welders bite, and `onWeldEnd`, which fires when the welders have made no progress for `maxWeldGap` seconds, sends it back towards 0 m at the slow speed. `piston/stop` discards the target, so `onWeldEnd` repeats the distance command.

`onWeldEnd` also fires after the last slice, alongside `onComplete`, so the piston simply finishes its retraction to 0 m with the finished ship while `onComplete` switches the welders off. The stall clock keeps running while the piston creeps between slices, so `timeout` has to cover `maxWeldGap`, the travel to the next slice and the welders getting started again; at 0.2 m/s a one-block gap takes about 12 seconds. `onTimedOut` only signals here: if the welders run dry, refill them and welding, and the drag, carry on.

The printer clears when the merge block unlocks (`clear=auto`, the default). Switch it off, by hand or with `block/off "Bay 1 Merge";`, to release the ship; the next print switches it back on and returns the piston. One large-grid piston gives 10 m of travel, so a longer ship needs more pistons.

::: tip
The `[blueprint:<hash>]` section with the blueprint's name and saved pose is created for you by `blueprint/save` once the blueprint is positioned by hand; see [Your first blueprint](./Alignment.md#your-first-blueprint).
:::

## Two Projectors Sharing a Bay

Two projectors print into one bay; a sensor at the bay mouth fires when the ship has flown out. Because the ship is not held by the aligned merge block, the bay uses `clear=manual` and the sensor supplies the clear signal. On **both** projectors (or on the bay's merge blocks):

```ms title="Bay 1 Projector A > Custom Data"
[printer]
name=bay-1
clear=manual
```
<br>

```ms title="Bay 1 Projector B > Custom Data"
[printer]
name=bay-1
clear=manual
```

Set the sensor's action to run the Printed by Mother programmable block with the argument:

```ms title="Bay 1 Sensor > Run"
printer/clear bay-1;
```

Naming either projector instead of `bay-1` works just as well: clear acts on the printer's job, not the block. While bay-1 is printing or clearing, `blueprint/print` on either projector errors, so the two projectors never weld into the same space. See [Knowing when the printer is clear](./PrintJobs.md#knowing-when-the-printer-is-clear).

## Upside-Down Print

A one-shot upside-down print with automatic restore. `projector/push-state` bookmarks the projector's settings, `blueprint/rotate` turns the print about the merge block's X axis without breaking the mating, and the job-ending hooks pop the bookmark.

```ms title="Printed by Mother > Custom Data"
[commands]
PrintFlipped=
| projector/push-state {{projector}};
| blueprint/rotate {{projector}} "Bay 1 Merge" 2 0 0;
| blueprint/print {{projector}};
```
<br>

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onClear=projector/pop-state this;
onFailed=projector/pop-state this;
```

The pop is paired in both job-ending hooks so that an aborted print does not leak the pushed state. See [Rotation semantics](./Alignment.md#rotation-semantics) and [The state stack](./Alignment.md#the-state-stack).

## Pause Until the Welders Are On

The stall clock starts when the `onPrint` chain finishes, and the chain does not wait for commands owned by another programmable block or for piston travel. Pause the job as the first step of the chain and resume it when prep is really done:

```ms title="Bay 1 Projector > Custom Data"
[hooks]
onPrint=
| printer/pause this;
| block/on "Bay 1 Welders";
| wait 20;
| printer/resume this;
```

The chain still commits the job when it finishes, but the paused job's clocks stand still, so the full `timeout` is available once welding can begin. The resume can also come from a sensor, timer or button that runs the programmable block with `printer/resume`:

```ms title="Bay 1 Welders Ready Timer > Run"
printer/resume bay-1;
```

See [Pausing a job](./PrintJobs.md#pausing-a-job).

## Abort on Stall

`onTimedOut` is a notification: the job keeps waiting and continues if welding resumes. To make a stall fatal, wire the hook to the abort, and use the `onFailed` hooks to switch the welders off and signal the failure:

```ms title="Bay 1 Projector > Custom Data"
[projector]
timeout=45

[hooks]
onTimedOut=printer/abort this;
onFailed=light/color "Bay 1 Lights" red;
```
<br>

```ms title="Printed by Mother > Custom Data"
[blueprint:35db1dca]
name=AMD Rover
onPrint=block/on "Bay 1 Welders";
onClear=block/off "Bay 1 Welders";
onFailed=
| block/off "Bay 1 Welders";
| print "{{bp}} aborted on {{projector}}";
```

`printer/abort` cancels the job in any phase: the projector's `onFailed` runs, then the blueprint's, `onClear` does not run, and the printer is idle at once. Whatever is half-printed stays in the bay. The `[projector]` section gives this slow bay a 45-second stall budget instead of the default 15. See [Stalls and failures](./PrintJobs.md#stalls-and-failures).
