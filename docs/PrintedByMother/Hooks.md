---
next: /PrintedByMother/Examples.md
---

# Hooks

Hooks are routines that Printed by Mother runs when something happens to a projector or a print. They live in two places: the projector's own Custom Data `[hooks]` section, and the blueprint's `[blueprint:<hash>]` section on the programmable block. The Mother programmable block itself has one hook, `onBoot`, provided by Mother Core.

[[toc]]

## Projector Hooks

Defined in the projector's Custom Data `[hooks]` section. `this` is a shorthand for the projector's name.

| Key | Trigger | Parameters |
|-|-|-|
| `onEmpty` | A `blueprint/load` scan found no projection on the projector. | `{{projector}}` |
| `onUnknown` | A `blueprint/load` scan found a projection whose hash has no `[blueprint:<hash>]` section. | `{{hash}}`, `{{projector}}` |
| `onLoad` | A `blueprint/load` scan loaded the projector's blueprint. | `{{bp}}`, `{{hash}}`, `{{projector}}` |
| `onPrint` | A print job started on the projector. The job commits when the chain finishes. | `{{bp}}`, `{{hash}}`, `{{projector}}` |
| `onClear` | The job's printer is clear. The job ends when the chain finishes. | `{{bp}}`, `{{hash}}`, `{{projector}}` |
| `onFailed` | The job was aborted with `printer/abort`. The printer is already idle. | `{{bp}}`, `{{hash}}`, `{{projector}}` (empty when no blueprint is loaded) |
| `onWeldStart` | Welding began on the projector's grid. | none |
| `onWeldEnd` | No weld progress for `maxWeldGap` seconds: welding has paused or finished. | none |
| `onTimedOut` | Welding stalled for `timeout` seconds, or did not start within `timeout` seconds of the job committing. A notification, not a failure: the job keeps waiting and continues if welding resumes. See [Stalls and failures](./PrintJobs.md#stalls-and-failures). | none |
| `onComplete` | The projection is complete. | none |

Weld hooks are pure notifications about welding on the projector's grid. They fire with or without a print job. Job hooks mark print-job transitions.

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

## Blueprint Hooks

Stored in the blueprint's `[blueprint:<hash>]` section, set with `blueprint/on-load`, `blueprint/on-print`, `blueprint/on-clear` and `blueprint/on-failed` or by editing the section.

| Key | Trigger | Parameters |
|-|-|-|
| `onLoad` | The blueprint was loaded, after any temporary projector offset is restored and after the projector's `onLoad` hook completed. | `{{bp}}`, `{{hash}}`, `{{projector}}` |
| `onPrint` | A print job started for this blueprint; the job commits when this routine finishes. | `{{bp}}`, `{{hash}}`, `{{projector}}` |
| `onClear` | The printer is clear and ready to accept another job; the job ends when this routine finishes. | `{{bp}}`, `{{hash}}`, `{{projector}}` |
| `onFailed` | The job was aborted with `printer/abort`. | `{{bp}}`, `{{hash}}`, `{{projector}}` |

Projector hooks and blueprint hooks of the same name are independent. The projector hook describes the bay (align to this merge block, switch these welders); the blueprint hook describes the ship (set this projector offset, print this message). Both fire when applicable, and the projector hook runs to completion before the blueprint hook begins.

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

## Firing Order

`blueprint/load <Projector>` chains:

1. Projector `onLoad` (from the projector's Custom Data `[hooks]`).
2. Blueprint `onLoad` (from `[blueprint:<hash>]`).
3. An internal sentinel that marks the chain finished; `blueprint/print` waits on it.

`blueprint/print <Projector>` chains:

1. The print job is created. It fails fast if the printer is busy.
2. Projector `onPrint`.
3. Blueprint `onPrint`.
4. An internal sentinel commits the job; the stall clock starts here, after prep. A job paused with `printer/pause` commits too, but its clocks stand still until `printer/resume`.
5. Welding proceeds: `onWeldStart`, possibly `onTimedOut` (recoverable), eventually `onComplete`.
6. Clearing, per the printer's `clear=` mode.
7. Projector `onClear`.
8. Blueprint `onClear`.
9. An internal sentinel ends the job; the printer is idle.

`printer/abort` at any point skips steps 7 to 9 and runs the projector `onFailed` and then the blueprint `onFailed` instead. The printer is already idle when they run.

In each chain the projector hook runs to completion before the blueprint hook begins: the two are concatenated into a single routine. This ordering guarantee applies to hooks defined on the projector itself. Fallback hooks defined on the programmable block are dispatched separately and are not ordered relative to the chain.

::: warning Internal sentinels
The sentinels appear in the terminal as `blueprint/finish-load`, `blueprint/finish-print` and `blueprint/finish-clear`. They are appended to hook chains by Mother and take an internal id that is not shown anywhere and not stable across reloads. Do not call them from routines.
:::

## Parameter Substitution

`{{projector}}`, `{{hash}}` and `{{bp}}` are substituted for the scan and job hooks (`onEmpty`, `onUnknown`, `onLoad`, `onPrint`, `onClear`, `onFailed`) when the hook is defined in the projector's own Custom Data `[hooks]` section, and always for blueprint hooks.

The same hook names defined as fallbacks on the Mother programmable block itself, for example `"Bay 1 Projector".onLoad=...` or `"Bay Projectors".onLoad=...` in the programmable block's `[hooks]` section, still fire, but `{{projector}}`, `{{hash}}` and `{{bp}}` pass through literally without substitution. This is a limitation of Mother Core's hook dispatch, not of this script. Define the hook on the projector itself if you need substitution.

```ms title="Printed by Mother > Custom Data"
[hooks]
"Bay 1 Projector".onComplete=light/color "Bay 1 Status" green;
```
