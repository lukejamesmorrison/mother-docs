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
```bash title="Terminal"
# Set the thruster's thruster override to 100%
thruster/thrust MainThruster 100;

# Set the thruster's thrust override to 10,000 Newtons
thruster/thrust MainThruster 10000N;
```

