# Configuration

[[toc]]

`Configuration` reads the programmable block Custom Data into `MyIni`, loads runtime variables, registers config commands, and keeps those values hot-reloadable while Mother is running.

For block-level Custom Data, see [Block Catalogue](./BlockCatalogue.md).

## Reading Values

`Get()` uses `section.key` syntax and always returns a string, so parse booleans and numbers yourself.

```ms title="Programmable Block > Custom Data"
[general]
debug=true
name="Corvette Control"
```
<br>

```csharp title="TelemetryModule.cs"
Configuration config = GetModule<Configuration>();

bool debugMode = config.Get("general.debug").ToLower() == "true";
string systemName = config.Get("general.name");
```

## Accessing the Raw `MyIni`

Use `Raw` when you need the underlying `MyIni` API directly.

```csharp title="CommsModule.cs"
Configuration config = GetModule<Configuration>();
List<MyIniKey> keys = new List<MyIniKey>();

config.Raw.GetKeys("channels", keys);

foreach (var key in keys)
	Mother.Print($"Channel: {key.Name}");
```

## Variables

Variables are loaded from `[variables]` and can be referenced in config commands with `$NAME`.

```ms title="Programmable Block > Custom Data"
[variables]
DOCK_NAME="Port A"
CRUISE_SPEED=85
```

You can also update a variable at runtime.

```csharp title="FlightModule.cs"
GetModule<Configuration>().SetVariable("CRUISE_SPEED", "100", true);
```

When `save` is `true`, the new value is also written back to programmable block Custom Data.

## Config Commands with Parameters

Config commands are defined in `[commands]`. Mother stores them as raw templates, then resolves `{{param}}` or `{{param:default}}` placeholders from `--option=value` arguments when the command is executed.

```ms title="Programmable Block > Custom Data"
[commands]
approach=autopilot/goto {{target}} --speed={{speed:$CRUISE_SPEED}}
```

```ms title="Programmable Block Terminal"
approach --target="GPS:Home:123:456:789:" --speed=60
```

If `--speed` is omitted, the command falls back to `$CRUISE_SPEED`.

## Reacting to Live Config Changes

When the programmable block Custom Data changes during runtime, `BlockCatalogue` emits `SystemConfigChangedEvent`, and `Configuration` reloads itself automatically. Your own modules can subscribe too.

```csharp title="TelemetryModule.cs"
public override void Boot()
{
	Subscribe<SystemConfigChangedEvent>();
	ApplySettings();
}

public override void HandleEvent(IEvent e, object eventData)
{
	if (e is SystemConfigChangedEvent)
		ApplySettings();
}

void ApplySettings()
{
	bool debugMode = GetModule<Configuration>().Get("general.debug").ToLower() == "true";
	Mother.Print($"Debug mode: {debugMode}");
}
```

## Emitted Events

`Configuration` does not emit any built-in events.

