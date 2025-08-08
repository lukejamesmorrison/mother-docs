# Local Storage

Local Storage allows Mother to save data across program cycles, game sessions, and programmable block script recompilations.

[[toc]]

## Get A Value

To retrieve a value from the local storage, you can use the `Get()` method which takes a key as a parameter. The return value will be a serialized string.

```csharp
LocalStorage localStorage = Mother.GetModule<LocalStorage>();

string almanacData = localStorage.Get("almanac");
```

## Set A Value
To store a value in the local storage, you can use the `Set()` method which takes a key and a value as parameters.

```csharp
LocalStorage localStorage = Mother.GetModule<LocalStorage>();

localStorage.Set("minAltitute", "50");
```

## Clearing Local Storage

To complete refresh storage, you can use the `Clear()` method. This will remove all data stored in the local storage including that being used by other modules.

```csharp
Mother.GetModule<LocalStorage>().Clear();
```

:::note
The [purge](../../../IngameScript/CommandCheatsheet.md#purge) command can be used to clear the local storage.
:::