# Battery Module
<!-- [< Modules](../Modules.md) -->

The battery module allows the user to control batteries on the grid.  Batteries have multiple states that can he set individually, or toggled through.

[[toc]]

## Commands

### charge
Set the battery to `Recharge` mode.

```
battery/charge <Battery|Group>
```

**Example**
```bash title="Terminal"
battery/charge "Main Battery";
```

### discharge
Set the battery to `Discharge` mode.

```
battery/discharge <Battery|Group> [--options]
```

**Example**
```bash title="Terminal"
battery/discharge "Main Battery";
```

### auto
Set the battery to `Auto` mode.

```
battery/auto <Battery|Group> [--options]
```

**Example**
```bash title="Terminal"
battery/auto "Main Battery";
```

### toggle
Toggle the battery between `Auto`, `Recharge` and `Discharge` mode.

```
battery/toggle <Battery|Group> [--options]
```

**Example**
```bash title="Terminal"
battery/toggle "Main Battery";
```


