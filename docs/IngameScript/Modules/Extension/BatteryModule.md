# Battery Module
<!-- [< Modules](../Modules.md) -->

The battery module allows the user to control batteries on the grid.  Batteries have multiple states that can he set individually, or toggled through.

[[toc]]

## Commands

### charge
Set the battery to `Recharge` mode. Use `--backup` to leave one battery in `Auto` mode while the rest recharge, so your grid never loses power. `--backup` keeps the first matched battery in `Auto`, and `--backup=<Battery>` targets a specific battery.

```
battery/charge <Battery|Group> [--backup[=Battery]]
```

**Example**
```ms title="Terminal"
battery/charge "Main Battery";

; keep the first battery in auto, charge the rest
battery/charge Batteries --backup;

; keep a specific battery in auto, charge the rest
battery/charge Batteries --backup=BackupBattery;
```

### discharge
Set the battery to `Discharge` mode.

```
battery/discharge <Battery|Group> [--options]
```

**Example**
```ms title="Terminal"
battery/discharge "Main Battery";
```

### auto
Set the battery to `Auto` mode.

```
battery/auto <Battery|Group> [--options]
```

**Example**
```ms title="Terminal"
battery/auto "Main Battery";
```

### toggle
Toggle the battery between `Auto`, `Recharge` and `Discharge` mode.

```
battery/toggle <Battery|Group> [--options]
```

**Example**
```ms title="Terminal"
battery/toggle "Main Battery";
```

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`charge < 25%`), while a predicate stands alone (`low`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

A group of batteries is compared by its average charge.

| Property | Description |
|-|-|
| `charge` | The stored charge as a ratio, from `0` to `1`. Compare with a percentage, ie. `charge < 25%`. |
| `mode` | `auto`, `recharge` or `discharge`. |

| Predicate | True when |
|-|-|
| `auto` | The battery is in auto mode. |
| `recharge` | The battery is in recharge mode. |
| `discharge` | The battery is in discharge mode. |
| `low` | Charge is under 20%. Has a 5% buffer. |
| `critical` | Charge is under 10%. Has a 3% buffer. |
| `empty` | Charge is under 2%. |
| `full` | Charge is over 98%. |
| `ready` | Charge is over 99%. |

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
PowerWarning=
| when Batteries charge < 25%;
|   light/color "Power Light" yellow;
```

**Use a predicate**

```ms title="Mother > Custom Data"
[rules]
LowPower=
| when Batteries low;
|   light/color "Power Light" red;
| else;
|   light/color "Power Light" green;
```

Jump drives share `charge` and these predicates. See the [Jump Drive Module](./JumpDriveModule.md).



