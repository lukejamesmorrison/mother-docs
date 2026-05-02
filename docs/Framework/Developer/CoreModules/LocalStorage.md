# Local Storage

[[toc]]

`LocalStorage` is the lightweight persistence layer behind `Program.Storage`. Modules usually store serialized strings under stable keys and let Mother flush the data during `Save()`.

## Storing a Value

```csharp title="FlightModule.cs"
LocalStorage storage = GetModule<LocalStorage>();
storage.Set("minAltitude", "50");
```

## Reading a Value

```csharp title="FlightModule.cs"
LocalStorage storage = GetModule<LocalStorage>();
string minAltitude = storage.Get("minAltitude");
```

## Storing Structured Data

If you need more than a single string, serialize a dictionary and store that string as one value.

```csharp title="MissileModule.cs"
Dictionary<string, object> saveData = new Dictionary<string, object>
{
	{ "State", "Armed" },
	{ "Target", "GPS:Home:123:456:789:" }
};

GetModule<LocalStorage>().Set(
	"missile",
	Serializer.SerializeDictionary(saveData)
);
```

```csharp title="MissileModule.cs"
string raw = GetModule<LocalStorage>().Get("missile");
Dictionary<string, object> saveData = Serializer.DeserializeDictionary(raw);
```

## Clearing Storage

`Clear()` removes every stored key, including data used by Mother Core modules such as `Almanac`.

```csharp
GetModule<LocalStorage>().Clear();
```

:::note
The [purge](../../../Cheatsheet.md#purge) command can be used to clear local storage from the terminal.
:::

## Emitted Events

`LocalStorage` does not emit any built-in events.