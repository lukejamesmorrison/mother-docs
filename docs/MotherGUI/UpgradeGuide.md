# Upgrade Guide

[[toc]]

## 0.2.0 -> 0.3.0
🕓 2 mins

This release lets menus make decisions with [conditional logic](../IngameScript/ConditionalLogic.md), and makes displays refresh more reliably on multiplayer servers and large grids. There is one breaking change to connector commands.

::: warning Breaking change: connector commands
`connector/lock`, `connector/unlock` and `connector/toggle` are no longer part of Mother Core, so Mother GUI no longer provides them. [Mother OS](../IngameScript/Modules/Extension/ConnectorModule.md) still does. A menu entry that runs one of them needs Mother OS on the same construct. Mother GUI finds the commands automatically through command sharing.
:::

::: warning Compatibility
Mother GUI 0.3 runs on Mother Core 1.2. Update Mother OS and MAPS at the same time so every script on the construct is running the same version of Mother Core and shares the same conditions.
:::

### New Features

- **Conditional logic in menus** - Use `if` / `elseif` / `else` / `end` steps in any menu entry, and `when` rules in a `[rules]` section. See [Conditional Menu Entries](./MenuView.md#conditional-menu-entries) and [Conditional Logic](../IngameScript/ConditionalLogic.md).

  ```ms title="Mother GUI > Custom Data"
  [menu:Lighting]
  Headlights=
  | if Headlights on;
  |   block/off Headlights;
  | else;
  |   block/on Headlights;
  | end;
  ```

- **Shared vocabulary** - Mother GUI does not define its own predicates. It uses every predicate from Mother Core, and from Mother OS and MAPS when they run on the same construct. A menu can test `low` for batteries from Mother OS, or `inspace` from MAPS, with nothing to configure.

### Other Changes To Expect

- **More reliable displays on multiplayer servers** - Mother GUI now refreshes displays slowly in the background to mitigate LCD rendering issues on multiplayer servers.
- **Large grids** - Mother GUI no longer discovers and draws every display in a single cycle. It scans 25 blocks per cycle and draws 10 displays per cycle, and stops early once 40% of the instruction limit is used. This fixes "script too complex" on grids with many displays. On a large grid, displays now appear and render over several cycles after boot, rather than all at once.

### Migration Checklist

- [ ] Update Mother OS and MAPS alongside Mother GUI
- [ ] Check that Mother OS runs on the construct if a menu entry runs `connector/lock`, `connector/unlock` or `connector/toggle`
- [ ] (Optional) Replace paired On and Off menu entries with a single entry that uses `if`
