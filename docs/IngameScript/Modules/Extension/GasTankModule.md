# Gas Tank Module
The Tank Module allows the user to control `Oxygen` and `Hydrogen` tanks on their grid.

[[toc]]

## Commands

### tank/stockpile
Set the Tank `Stockpile` to `on`.
```
tank/stockpile <Tank|Group>
```

**Example**
```bash title="Terminal"
tank/stockpile HydrogenTank;
```

### tank/share
Set the Tank `Stockpile` to `off`. The tank is now sharing its contents with your grid.
```
tank/share <Tank|Group>
```

**Example**
```bash title="Terminal"
tank/share OxygenTank;
```

### tank/toggle
Toggle the Tank `Stockpile` between `on` and `off`.
```
tank/toggle <Tank|Group>
```

**Example**
```bash title="Terminal"
tank/toggle HydrogenTank;
```

<!-- <script setup>
const isDev = __VUEPRESS_DEV__ ? "L" : "J";
</script>

{{isDev}} -->

