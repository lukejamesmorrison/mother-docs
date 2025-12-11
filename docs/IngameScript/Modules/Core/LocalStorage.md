# Local Storage

Mother can save information across sessions and recompiles using LocalStorage.  This module is used to store information that needs to persist across cycles, even if an error occurs or a player hits `Recompile`.

[[toc]]

## Clearing Data

To clear all data stored in LocalStorage, players can use the [`purge`](../../Cheatsheet.md#purge) command with the `storage` module name.

```bash title="Terminal"
purge storage --force
```

## Commands

### get
Get a value stored in LocalStorage.
```bash
get <key>
```

### set
Set a value in LocalStorage.
```bash
set <key> <value>
```

::: note
The `set` command provides no practical use to players at this time.
:::