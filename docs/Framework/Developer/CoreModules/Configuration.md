# Configuration

Mother manages both the Programmable Block's Custom Data, as well as the Custom Data on each block allowing players to localize their configurations while continuing to make use of Mother other capbilities.

## Accessing Mother configuration
Mother is primarily customized via the Custom Data field on the Programmable Block. For example, we can easily get a configuration value from it's `section` (general) and `key` (debug):

```csharp
bool IsDebugMode = Mother.GetModule<Configuration>().Get("general.debug") == "true";
```

## Accessing Block configuration
There are many instances where it is useful to access block-level configuration:

```csharp

// get block from Block Catalogue
void MapScreen = Mother.GetModule<BlockCatalogue>()
    .GetBlocks<IMyTextPanel>(block => block.CustomName == "Map Display")
    .FirstOrDefault()

// get the block's configuration
MyIni blockConfig = Mother.GetModule<BlockCatalogue>().GetBlockConfiguration(MapScreen);

// get scale
string scale = blockConfig.Get("general", "scale");
```

## Defining Hooks

Hooks allow an interface for developers to trigger actions when specific block actions occur via Mother.

```text title="AirlockDoor > Custom Data"
[hooks]
onOpen=wait 10; door/close this;
```

You can target a hook on a block using the `RunHook` method:

```csharp title="AirlockModule.cs"
// run hook for door (block)
Mother.GetModule<BlockCatalogue>().RunHook(airlockDoor, "onOpen");
```
