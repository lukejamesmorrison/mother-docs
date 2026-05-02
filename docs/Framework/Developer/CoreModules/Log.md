# Log

[[toc]]

`Log` is Mother's in-memory diagnostic log. It stores recent records with timestamps and severity prefixes so modules can keep a compact audit trail without printing every detail into the terminal.

## Writing to the Log

Use `Info()` for expected activity and `Error()` for failures.

```csharp title="DockingModule.cs"
Log log = GetModule<Log>();

log.Info("Docking request sent.");
log.Error("Docking request timed out.");
```

## Reading Log Records

`Records` is a list of formatted strings, newest first.

```csharp title="DisplayModule.cs"
List<string> records = GetModule<Log>().Records;

foreach (string record in records.Take(5))
    Mother.Print(record, false);
```

## Viewing the Log

You can view the log of any Mother script with the `LogView`:

```ms title="Display Block > Custom Data"
[surfaces]
0=LogView "Mother OS"
```

## Retention

`Log` keeps the most recent 30 records and drops the oldest entries automatically.

## Emitted Events

`Log` does not emit any built-in events.