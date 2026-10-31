# Jump Drive Module

The Jump Drive module makes jump drives readable in [conditions](../../ConditionalLogic.md). Use it to react to how much charge a jump drive holds, or to what it is doing.

The module adds conditions only. It does not add any commands.

[[toc]]

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`charge < 25%`), while a predicate stands alone (`low`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

A group of jump drives is compared by its average charge.

| Property | Description |
|-|-|
| `charge` | The stored charge as a ratio, from `0` to `1`. Compare with a percentage, ie. `charge < 25%`. |
| `status` | `ready`, `charging` or `jumping`. |

| Predicate | True when |
|-|-|
| `charging` | The jump drive is charging. |
| `jumping` | The jump drive is jumping. |
| `low` | Charge is under 20%. Has a 5% buffer. |
| `critical` | Charge is under 10%. Has a 3% buffer. |
| `empty` | Charge is under 2%. |
| `full` | Charge is over 98%. |
| `ready` | Charge is over 99%. |

Jump drives share `charge` and the `low`, `critical`, `empty`, `full` and `ready` predicates with [batteries](./BatteryModule.md#properties). In a group of mixed blocks, each block is tested with the property it has.

:::note
`ready` is both a state word of `status` and a charge predicate. As a predicate on a jump drive, `ready` means the charge is over 99%.
:::

**Use a predicate**

Notify the pilot when the jump drive has charged and when it starts charging:

```ms title="Mother > Custom Data"
[variables]
SCREEN="Cockpit:1"
JUMP_DRIVE="Jump Drive"

[rules]
JumpCharged=
| when $JUMP_DRIVE full;
|   view/notify $SCREEN "Jump drive charged." --level=success;

JumpCharging=
| when $JUMP_DRIVE charging;
|   view/notify $SCREEN "Jump drive charging." --level=info;
```

**Compare a property**

Compare `status` to a state word to check what the jump drive is doing in a routine:

```ms title="Mother > Custom Data"
[commands]
CheckJump=
| if $JUMP_DRIVE status == ready;
|   light/color "Jump Light" green;
| else;
|   light/color "Jump Light" red;
| end;
```
