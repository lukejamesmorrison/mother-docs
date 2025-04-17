# Intergrid Message Service


Mother uses a Request/Response pattern for intergrid communication. Every instance of Mother Core uses this system to share information and enable remote command execution.

[[toc]]

## Request

### The Request Object

```csharp
// show how to create a request object with custom body and headers.
```

### Sending a Request

### Open Broadcast

Open broadcasts go to all grids on the antenna network. This is most appropriate for public channels and 1-to-many interactions.

```csharp
// show how to send an open broadcast request and manage the response
```

```csharp title="IntergridMessageService.cs"
public void SendLifeSupportInformation()
{
    // get h2 levels
    // get o2 levels
    // get power levels

    // create request with custom body
    Dictionary<string, object> requestBody = new Dictionary<string, object>
    {
        { "h2", h2Level },
        { "o2", o2Level },
        { "power", powerLevel }
    };

    Request request = CreateRequest(requestBody);
    // SendOpenBroadcastRequest(request, OnLifeSupportResponse);
}
```


### Direct Broadcast

Direct broadcasts go to a specific grid on the antenna network. This is most appropriate for private channels and 1-to-1 interactions.

```csharp
// show how to send a direct broadcast request and manage the response
```

## Response

### The Response Object

#### Response Types

<!-- table of response codes , names, and description

| Code | Name | Description |
| ---- | ---- | ----------- |
| 200  | OK   | The request was successful |
| 400  | Bad Request | The request was malformed |
| 401  | Unauthorized | The request was not authorized | -->

### Handing A Response

## Routes


---
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

First we create the Request with the relevant payload - Body, and Header. Then we send it via open broadcast. Finally, we can set a callback to be run when a Response has been received to our outgoing message.

```csharp

void OnPingResponse(Response response)
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
### Sending a direct message
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
