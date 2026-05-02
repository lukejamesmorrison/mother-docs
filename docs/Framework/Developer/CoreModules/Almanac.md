# Almanac

[[toc]]

The `Almanac` stores records for grids and waypoints so modules can navigate, target remote systems, and resolve IGC destinations without keeping their own cache.

Mother updates its own grid record automatically every second and persists the full record list through `LocalStorage`. When multiple Mother Core scripts are running on your grid, they will share records to reduce compute.

## Getting Your Own Identity

Every Mother instance exposes a unique ID through `Mother.Id`.

```csharp title="Program.cs"
long systemId = Mother.Id;
string systemName = Mother.Name;
```

## Reading Records

Use `GetRecord()` when you know the grid ID or display name, and `GetRecordsByType()` when you want a filtered list.

```csharp title="DockingModule.cs"
public void PrintTargetInfo(string targetName)
{
    AlmanacRecord target = GetModule<Almanac>().GetRecord(targetName);

    if (target == null)
    {
        Mother.Print($"Unknown target: {targetName}");
        return;
    }

    Mother.Print($"Target: {target.DisplayName}");
    Mother.Print($"Type: {target.EntityType}");
    Mother.Print($"Position: {target.Position}");
}
```
<br>

```csharp title="NavigationModule.cs"
List<AlmanacRecord> waypoints = GetModule<Almanac>()
    .GetRecordsByType("waypoint");
```

## Creating or Updating a Record

`AddRecord()` inserts a new record or replaces an older one with fresher data.

```csharp title="NavigationModule.cs"
public void SaveWaypoint(string name, Vector3D position)
{
    AlmanacRecord waypoint = new AlmanacRecord(name, "waypoint", position, 0);
    GetModule<Almanac>().AddRecord(waypoint);
}
```

Remote grid records are normally created by `IntergridMessageService`, but you can still create them manually if your module has authoritative data.

## Removing Records

`Almanac` exposes its `Records` list directly. If you remove an entry yourself, call `AddRecord()` or `Clear()` when appropriate so the persisted data stays consistent.

```csharp title="NavigationModule.cs"
public void ForgetWaypoint(string name)
{
    Almanac almanac = GetModule<Almanac>();
    AlmanacRecord record = almanac.GetRecord(name);

    if (record != null)
    {
        almanac.Records.Remove(record);
        Mother.Print($"Removed {name} from Almanac.");
    }
}
```

## Record Types

| Type | Meaning |
| - | - |
| `grid` | A ship or station running Mother Core. |
| `waypoint` | A static navigation point. |

## Persistence Behavior

`Almanac` serializes its records into `LocalStorage` under the `almanac` key. That means your record list survives recompiles, game reloads, and most runtime faults.

## Emitted Events

`Almanac` does not emit any built-in events.