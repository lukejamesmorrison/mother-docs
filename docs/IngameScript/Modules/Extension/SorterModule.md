# Sorter Module
<!-- [< Modules](../Modules.md) -->

The sorter module allows the user to control conveyor sorters on the grid.

[[toc]]

## Commands

### sorter/drain
Set the drain all state of the sorter or group of sorters.
```
sorter/drain <Sorter|Group> true|false
```

**Example**

Turn on `DrainAll`
```ms title="Terminal"
sorter/drain "Gravel Exhaust" true
```

Turn off `DrainAll`
```ms title="Terminal"
sorter/drain VerticalFarmHarvester false
```

