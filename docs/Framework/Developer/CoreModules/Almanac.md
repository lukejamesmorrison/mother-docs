# Almanac

[[toc]]

The Almanac manages a list of records that represent entities in the game world. These records can be used to track the location of entities, communicate with them, and display them on map displays. Since each instance of Mother is unique to its Programmable Block, we use the block's `EntityId` as the unique identifier.

```csharp
// via the Program instance
long myId = Program.Me.EntityId;

// or via Mother (recommended)
long myId = Mother.Id;
```

The almanac currently supports the following Entity types:
- `Grid`
- `Waypoint`

## Records

```csharp title="DockingModule.cs"
// Get a record by name
AlmanacRecord record = Almanac.GetRecord("Mothership"); 

// Get a record by ID (the EntityId of the programmable block)
AlmanacRecord record = Almanac.GetRecord(12345678901234567890);
```

### Creating a Record

```csharp title="DockingModule.cs"
// Create record
TopSecretBase record = new AlmanacRecord(
    "TopSecretBase",                            // name
    "Grid",                                     // entity type
    new Vector3D(1234.23, 5678.72, 24155.22),   // position
    0                                           // speed (optional)
);

// Add to the almanac
Mother.Almanac.AddRecord(record);
```

When records are added to the Almanac, they will automatically appear on map displays and be accessible for remote communication. Mother add and updates records frequently via a `Ping`.

### Removing a Record

To remove a record, you can simply access the `Records` list and remove the record you want to delete.

```csharp title="DockingModule.cs"
// Get the record
AlmanacRecord record = Almanac.GetRecord("Mothership");

// Remove the record from the almanac
Mother.Almanac.Records.Remove(record);
```

<!-- ### Transponder Statuses

| Code | Description |
|------|-------------|
| **Local**     | Assigned to records representing other instances of Mother on the same grid.         |
| **Friendly**  | Assigned to records representing entities that are communicating on friendly channels.        |
| **Neutral**   | Assigned to records representing entities that are communicating on the public channel.        |

```csharp title="DockingModule.cs"
 // Get the record for a grid
AlmanacRecord record = Almanac.GetRecord("Mothership");

// Set the transponder status
record.TransponderStatus = TransponderStatus.Friendly;
``` -->

## Storage Records across Recompiles

When a programmable block recompiles, scripts are reloaded and all state lost by default. To prevent this, the Almanac stores records in [Local Storage]() to make it accessible after recompile, error or a game reboot.

```csharp title="Almanac.cs"
public void Save()
{
    // convert List to Dict and use ID as key
    Dictionary<string, object> recordDict = new Dictionary<string, object>();
    foreach (var record in Records) {
        recordDict.Add(record.Id, record);
    }

    // serialize into a string
    string serializedAlmanac = Serializer.SerializeDictionary(recordDict);

    // save the string to the storage
    Mother.LocalStorage.Set("almanac", serializedAlmanac);
}
```

We use the [Serializer](../Utilities/Serializer.md) utility class to convert our records in strings for use with the `Program.Save()` method.

To retreive the Almanac from storage on the next cycle, we use the `LoadFromLocalStorage()` method which will retreive the `almanac` item from [Local Storage](./LocalStorage.md) and automatically populate the Almanac with the records.

```csharp title="Mother.cs"
public void Boot()
{
    Almanac.LoadFromLocalStorage();

    // Other boot tasks...
}
```
