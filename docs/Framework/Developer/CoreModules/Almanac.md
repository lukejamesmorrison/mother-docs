# Almanac

[[toc]]

The Almanac manages a list of records that represent entities in the game world. These records can be used to track the location of entities, communicate with them, and display them on map displays. 


## The Unique Identifier
Since each instance of Mother is unique to its Programmable Block, we use the programmable block's `EntityId` as the unique identifier.

```csharp
// via Mother (recommended)
long myId = Mother.Id;

// or via the Program instance
long myId = Program.Me.EntityId;
```



## Records

```csharp title="DockingModule.cs"
// Get a record by a name/nickname
AlmanacRecord record = Almanac.GetRecord("Mothership"); 

// Get a record by ID (the EntityId of the programmable block)
AlmanacRecord record = Almanac.GetRecord(12345678901234567890);
```

:::info
Mother passes the current grids name with every request and this is used as the default **nickname** of the record.
:::

### Record Types
The almanac currently supports the following Entity types:

| Type          | Description                                                           |
|------         |-------------                                                          |
| **grid**      | Represents a grid in the game world, such as a ship or station.       |
| **waypoint**  | Represents a GPS waypoint in the game world.                          |  
| **local**     | Represents another instance of Mother running on the same grid.       |

### Creating a Record

```csharp title="DockingModule.cs"
// Create record
TopSecretBase record = new AlmanacRecord(
    "TopSecretBase",                            // name
    "grid",                                     // entity type
    new Vector3D(1234.23, 5678.72, 24155.22),   // position
    0                                           // speed (optional)
);

// Add to the almanac
Mother.GetModule<Almanac>().AddRecord(record);
```

When records are added to the Almanac, they will automatically appear on map displays and be accessible for remote communication. Mother adds and updates records frequently via communications.

### Removing a Record

To remove a record, you can simply access the `Records` list and remove the record you want to delete.

```csharp title="DockingModule.cs"
// Get the record
AlmanacRecord record = Almanac.GetRecord("Mothership");

// Remove the record from the almanac
Almanac.Records.Remove(record);
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

### Storing Records across Recompiles

When a programmable block recompiles, scripts are reloaded and all state is lost by default. To prevent this, the Almanac stores records in [Local Storage](./LocalStorage.md) to make it accessible after recompile or a reboot.