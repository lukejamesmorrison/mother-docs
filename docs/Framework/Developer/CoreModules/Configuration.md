# Configuration

Mother manages both the Programmable Block's Custom Data, as well as the Custom Data on each block. This allows players to localize their configurations while continuing to make use of Mother's other capabilities.

[[toc]]

For information how to access block configurations, see the [Block Configuration](./BlockCatalogue.md#block-configuration) documentation.

## Accessing Mother's Configuration
Mother is primarily customized via the **Custom Data** field on the Programmable Block. We went to access the `General > Debug` value of our configuration:

```ini title="Mother > Custom Data"
[general]
debug=true
```

We can easily get the value from it's `section` (general) and by its `key` (debug).

```csharp
bool IsDebugMode = Mother.GetModule<Configuration>().Get("general.debug");
```

:::info
The `Get` allows section->key access using a `.` separator. This is a convenience method for accessing the `MyIni` object directly.
:::

