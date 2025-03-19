# Core Modules
## Intergrid Communication Service

Sending messages between grids is a core capability of Mother, and this can be done in a variety of ways depending on your level of security.

### Sending Open Broadcast
The most common case is sending an open broadcast to other grids.  This is most appropriate for public channels.  An open broadcast will be sent to all grids on the antenna network channel.

Let's look at how we `ping` other grids:

```csharp
# IntergridMessageService.cs

public void Ping()
{
    Vector3D currentPosition = Mother.Grid.GetPosition();

    Dictionary<string, object> requestBody = new Dictionary<string, object>();
    Dictionary<string, object> requestHeader = new Dictionary<string, object>
    {
        { "OriginId", $"{Mother.Id}" },
        { "OriginName", Mother.Grid.CustomName },
        { "Path", "ping" },
        { "x", $"{currentPosition.X}" },
        { "y", $"{currentPosition.Y}" },
        { "z", $"{currentPosition.Z}" },
    };

    Request request = new Request(requestBody, requestHeader);

    SendOpenBroadcastRequest(request, OnPingResponse);
}
```

First we create the Request with the relevant payload - Body, and Header. Then we send it via open broadcast. Finally, we can set a callback to be run when a Response has been received to our message.

```csharp

void OnPingResponse(IntergridMessageObject response)
{
    // Update Record in Almanac
    AlmanacRecord almanacRecord = new AlmanacRecord(
        response.BString("Id"),
        "grid",
        new Vector3D(
            response.BDouble("x"),
            response.BDouble("y"),
            response.BDouble("z")
        )
    );

    almanacRecord.AddNickname(response.HString("OriginName"));

    Mother.Almanac.AddRecord(almanacRecord);
}
```
### Sending direct message
If you would like to send a direct message to another grid, this can be done via unicast. This is used when sending a remote command to another grid:

```csharp
# IntergridMessageService.cs
public void SendRequestFromRoutine(string target, TerminalRoutine routine)
{
    // get target grid from Almanac
    Grid grid = Mother.Almanac.GetGridByIdentifier(target);

    if (grid != null)
    {
        Request request = BuildCommandRequest(routine.UnpackedRoutineString);

        request.To(grid);

        SendUnicastRequest(grid.Id, request, null);
    }
}
```

### Sending Encrypted Messages
When playing in a PvP environment, it quickly becomes important to secure your communications so that other players cannot remotely command your grids running Mother.  To do this, we can use Mother's built in encryption. Let's take a look at how we are using this during message transmission:

```csharp
# IntergridMessageService.cs

public void SendUnicastRequest(long TargetId, IntergridMessageObject message, Action<IntergridMessageObject> onResponse)
{
    // Register the message callback
    activeRequests[$"{message.Header["Id"]}"] = onResponse;

    // encrypt the message if necessary
    string outgoingMessage = Encryption ?
        Mother.Security.Encrypt(message.Serialize()) :
        message.Serialize();

    // Send the message via unicast over the "default"
    bool success = Mother.IGC.SendUnicastMessage(TargetId, "default", outgoingMessage);

    if (!success)
    {
        Mother.EventBus.Emit(new RequestFailedEvent(), null);
    }
    else
    {
        Mother.EventBus.Emit(new RequestSentEvent(), null);
    }
}
```

### Using Channels

### Configuration
Mother manages both the Programmable Block's Custom Data, as well as the Custom Data on each block allowing players to localize their configurations while continuing to make use of Mother other capbilities.

#### Accessing Mother configuration
Mother is primarily customized via the Custom Data field on the Programmable Block. For example, we can easily get a configuration value from it's `section` (general) and `key` (debug):

```csharp
bool IsDebugMode = Mother.Configuration.Get("general.debug") == "true";
```

#### Accessing Block configuration
There are many instances where it is useful to access block-level configuration:

```csharp

// get block from Block Catalogue
void MapScreen = Mother.BlockCatalogue
    .GetBlocks<IMyTextPanel>(block => block.CustomName == "Map Display")
    .FirstOrDefault()

// get the block's configuration
MyIni blockConfig = Mother.BlockCatalogue.GetBlockConfiguration(MapScreen);

// get scale
string scale = blockConfig.Get("general", "scale");
```

#### Defining Hooks

Hooks allow an interface for developers to trigger actions when specific block actions occur via Mother.

```
# Door.CustomData

[hooks]
onOpen=wait 10; door/close this;
```

You can target a hook on a block using the `RunHook` method:

```csharp
# DoorModule

// get door
IMyDoor door = Mother.BlockCatalogue
    .GetBlocks<IMyDoor>()
    .FirstOrDefault()

// run hook for door (block)
Mother.BlockCatalogue.RunHook(door, "onOpen");
```


## Almanac
1. Creating a new record
2. Updating a record
3. IFF
4. Ping

## Block Catalogue
1. Register a Block with Block Catalogue
2. Getting a block from the block catalogue

## Local Storage

## Command Bus
1. Create a custom command
2. Register the command within a module
   
## Event Bus
1. Creating an Event
2. Firing An Event
3. Subscribing to an event

## Flight Planner