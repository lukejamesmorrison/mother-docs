# Gas Tank Module
The Tank Module allows the user to control `Oxygen` and `Hydrogen` tanks on their grid.

[[toc]]

## Commands

### stockpile
Set the Tank `Stockpile` to `on`.
```
tank/stockpile <Tank|Group>
```

**Example**
```ms title="Terminal"
tank/stockpile HydrogenTank;
```

### share
Set the Tank `Stockpile` to `off`. The tank is now sharing its contents with your grid.
```
tank/share <Tank|Group>
```

**Example**
```ms title="Terminal"
tank/share OxygenTank;
```

### toggle
Toggle the Tank `Stockpile` between `on` and `off`.
```
tank/toggle <Tank|Group>
```

**Example**
```ms title="Terminal"
tank/toggle HydrogenTank;
```

## Properties

:::tip
Properties and predicates are very useful in conditions. A property is compared with an operator and a value (`fill < 25%`), while a predicate stands alone (`low`). See [Conditional Logic](../../ConditionalLogic.md) to use them in `when` rules and `if` steps.
:::

A group of tanks is compared by its average fill.

| Property | Description |
|-|-|
| `fill` | How full the tank is as a ratio, from `0` to `1`. Compare with a percentage, ie. `fill < 25%`. |
| `stockpile` | `1` when the tank is stockpiling, `0` when it is sharing. |

| Predicate | True when |
|-|-|
| `low` | Fill is under 15%. Has a 5% buffer. |
| `critical` | Fill is under 10%. Has a 3% buffer. |
| `empty` | Fill is under 2%. |
| `full` | Fill is over 98%. |
| `stockpiling` | The tank is stockpiling. |

**Compare a property**

```ms title="Mother > Custom Data"
[rules]
HalfFuel=
| when "Hydrogen Tanks" fill < 50%;
|   light/color "Fuel Light" yellow;
```

**Use a predicate**

```ms title="Mother > Custom Data"
[rules]
LowFuel=
| when "Hydrogen Tanks" low;
|   light/color "Fuel Light" red;
| else;
|   light/color "Fuel Light" green;
```

<!-- <script setup>
const isDev = __VUEPRESS_DEV__ ? "L" : "J";
</script>

{{isDev}} -->


