# Sorter Module
<!-- [< Modules](../Modules.md) -->

The sorter module allows the user to control conveyor sorters on the grid, including their drain state, mode and item filters.

[[toc]]

## Commands

All commands accept a block name, group, or tag as the sorter selector. Blocks that are not sorters are ignored.

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

### sorter/mode
Set the mode of the sorter or group of sorters to `whitelist` or `blacklist`. Existing filters are kept. Mode names are not case-sensitive.
```
sorter/mode <Sorter|Group> <whitelist|blacklist>
```

**Example**

```ms title="Terminal"
sorter/mode "Cargo Sorter" blacklist
```

### sorter/add
Add items to the filter list of the sorter or group of sorters.
```
sorter/add <Sorter|Group> <Item> [<Item>...] [--options]
```

Options
| Option  | Values                   | Description                                                                 |
| ------- | ------------------------ | --------------------------------------------------------------------------- |
| `fresh` | `true`, `false`          | Clear the existing filter list before adding the items.                     |
| `mode`  | `whitelist`, `blacklist` | Set the sorter mode in the same command. If omitted, the mode is unchanged. |

At least one item is required unless `--fresh` or `--mode` is given. All items and options are validated before anything is applied, so an invalid item or option leaves the sorter unchanged.

**Example**

```ms title="Terminal"
; Add specific items
sorter/add "Cargo Sorter" Ore/Iron Ore/Stone

; Add every item of a type
sorter/add "Cargo Sorter" Ore

; Replace the filters and switch to a blacklist
sorter/add "Cargo Sorter" Ore/Stone Ore/Ice --fresh --mode=blacklist

; Reset the sorter to an empty blacklist
sorter/add "Cargo Sorter" --fresh --mode=blacklist
```

### sorter/remove
Remove items from the filter list of the sorter or group of sorters.
```
sorter/remove <Sorter|Group> <Item> [<Item>...]
```

**Example**

```ms title="Terminal"
sorter/remove "Cargo Sorter" Ore/Stone
```

### sorter/clear
Remove all items from the filter list of the sorter or group of sorters. The mode is kept.
```
sorter/clear <Sorter|Group>
```

**Example**

```ms title="Terminal"
sorter/clear "Cargo Sorter"
```

## Items

Items are written as `Type/Subtype`, for example `Ore/Iron`, `Ingot/Iron` or `Component/SteelPlate`. You may also use only a type to match every item of that type, for example `Ore`.

Supported types: `Ore`, `Ingot`, `Component`, `AmmoMagazine`, `PhysicalGunObject`, `ConsumableItem`, `PhysicalObject`, `GasContainerObject`, `OxygenContainerObject`, `Datapad`.

:::tip
You can view a complete list of item types and subtypes [in the MDK2 docs](https://malforge.github.io/spaceengineers/pbapi/Type-Definition-Listing.html).
:::

