# Merge Block Module

The Merge Block module allows the user to monitor merge blocks on the grid via hooks. When Mother merges and unmerges, she updates the Block Catalogue to reflect the new grid (construct) configuration.

[[toc]]

<!-- ## Commands

This module does not have any commands. -->

## Hooks

The following hooks can be defined in the block's Custom Data, and will be triggered when the corresponding state change occurs:

|Key                | Trigger                                       |
|-                  |-                                              |
| `onMerge`          | Run when a merge block locks (merges with another block).         |
| `onUnmerge`        | Run when a merge block unlocks (separates from another block, or turns off).        |

**Example**

Imagine our merge block controls a detachable module and we want to indicate its status:

```ms title="ModuleMergeBlock > Custom Data"
[hooks]
onMerge=light/color "Module Status Light" green;
onUnmerge=light/color "Module Status Light" red;
```
or

```ms title="Mother > Custom Data"
[hooks]
RampMergeBlock.onMerge=light/color "Ramp Light" green;
"Cargo Pod Merge".onUnmerge=sound/play "Separation Alarm";
```

:::note
Merge Block hooks are fired when the merge block state changes, regardless of whether the change was initiated by a player action or through game mechanics.
:::

