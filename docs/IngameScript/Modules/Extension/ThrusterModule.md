# Thruster Module

The thruster module allows the user to control thrusters on the grid. Set a thruster override in percent or newtons depending on the use case.

[[toc]]

## Commands

### thrust
Set the thrust of a thruster or group of thrusters.
```
thruster/thrust <Thruster|Group> <valuePercent|valueNetwons> [--options]
```

::: important
The command expects a value in **percent** by default.  To use Newtons, ensure you follow the value with an `N`. 
:::

**Example**
```ms title="Terminal"
; Set the thruster's thruster override to 100%
thruster/thrust MainThruster 100;

; Set the thruster's thrust override to 10,000 Newtons
thruster/thrust MainThruster 10000N;
```

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`effectiveness < 50%`), while a predicate stands alone (`weak`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

A group of thrusters is compared by its average.

| Property | Description |
|-|-|
| `effectiveness` | How much of its maximum thrust the thruster can currently produce, as a ratio from `0` to `1`. Atmospheric thrusters lose effectiveness as the air thins. |

| Predicate | True when |
|-|-|
| `weak` | Effectiveness is under 30%. |

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
ThrustFading=
| when "Atmospheric Thrusters" effectiveness < 50%;
|   light/color "Thrust Light" yellow;
```

**Use a predicate**

```ms title="Mother > Custom Data"
[rules]
AtmosphericWeak=
| when "Atmospheric Thrusters" weak --for=3;
|   block/on "Hydrogen Thrusters";
| else;
|   block/off "Hydrogen Thrusters";
```


