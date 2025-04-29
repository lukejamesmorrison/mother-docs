# Programmable Block Module
<!-- [< Modules](../Modules.md) -->

The Programmable Block modules allows players to interact with programmable blocks on a grid.  This is useful when running programmable blocks with custom arguments, whether they are running Mother or not.

[[toc]]

## Commands

### run
Run a programmable block with an optional argument.

```
pb/run <ProgrammableBlock|Group> <argument> [--options]
```

::: important
Some scripts may be uncompatible with Mother OS due to the way they designed to accept arguments.  See [Script Compatibility](../../Compatibility.md) for more information.
:::

**Example**

We have [Whip's Subgrid Thruster Manager](https://steamcommunity.com/sharedfiles/filedetails/?id=757123653) installed on another Programmable block named `PB.ThrusterManager`. It is particularly helpful when using thrusters on subgrids.
```ini title="Terminal"
pb/run "PB.ThrusterManager" dampeners_on;
```
<!-- [Whip's Subgrid Thruster Manager](https://steamcommunity.com/sharedfiles/filedetails/?id=757123653) is a great script to help manage thrusters on subgrids. -->

