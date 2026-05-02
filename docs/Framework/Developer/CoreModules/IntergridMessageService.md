# Intergrid Message Service

[[toc]]

`IntergridMessageService` is Mother Core's commnunication layer. It creates request and response envelopes, registers routes, manages channels, tracks active callbacks, and emits messaging events you can subscribe to.

## Configuring Channels

Channels are defined in programmable block Custom Data. A blank value means unencrypted, while any non-empty value becomes the passcode used for `Security.Encrypt()` and `Security.Decrypt()`.

```ms title="Programmable Block > Custom Data"
[channels]
; public channel
*=

; encrypted channel
MyFaction=Sup3rSecr3tP@ssw0rd

; custom channel (unencrypted)
TradeNet=
```

## Creating a Request

`CreateRequest()` builds a `Request` with the standard Mother headers already attached.

```csharp title="DockingModule.cs"
Request request = GetModule<IntergridMessageService>().CreateRequest(
    // route
    "docking/request",
    // body
    new Dictionary<string, object>
    {
        { "Connector", "Port A" },
        { "Mass", $"{Mother.GetShipMass()}" }
    },
    // custom headers
    new Dictionary<string, object>
    { 
        //
    }
);
```

## Sending a Unicast Request

`SendUnicastRequest()` expects the target IGC ID, not a display name. In practice you usually resolve that through `Almanac`.

```csharp title="DockingModule.cs"
public void RequestDocking(string targetName)
{
    AlmanacRecord record = GetModule<Almanac>().GetRecord(targetName);

    if (record == null)
    {
        Mother.Print($"Unknown target: {targetName}");
        return;
    }

    Request request = GetModule<IntergridMessageService>().CreateRequest(
        "docking/request",
        new Dictionary<string, object>
        {
            { "Connector", "Port A" }
        }
    );

    long targetId = record.UnicastId ?? record.GetLongId();

    GetModule<IntergridMessageService>().SendUnicastRequest(
        // target id
        targetId, 
        // request object
        request, 
        // callback action (run upon a response to the request)
        message =>
        {
            if (message is Response)
                Mother.Print("Docking response received.");
        }
    );
}
```

## Sending an Open Broadcast

Use `SendOpenBroadcastRequest()` when every reachable grid should hear the request.

```csharp title="BeaconModule.cs"
Request request = GetModule<IntergridMessageService>().CreateRequest(
    "telemetry/ping",
    new Dictionary<string, object>
    {
        { "Position", $"{Mother.GetPosition()}" }
    }
);

GetModule<IntergridMessageService>().SendOpenBroadcastRequest(request, message =>
{
    if (message is Response)
        Mother.Print("Received telemetry response.");
});
```

## Registering a Route

Modules can expose routes with the `AddRoute()` helper inherited from `BaseModule`.

```csharp title="CargoModule.cs"
public override void Boot()
{
    AddRoute("cargo/status", HandleCargoStatusRequest);
}

Response HandleCargoStatusRequest(Request request)
{
    int containerCount = GetModule<BlockCatalogue>().GetBlocks<IMyCargoContainer>().Count;

    return GetModule<IntergridMessageService>().CreateResponse(
        request,
        Response.ResponseStatusCodes.OK,
        new Dictionary<string, object>
        {
            { "Containers", $"{containerCount}" }
        }
    );
}
```

## Response Codes

You will reach for these status codes most often:

| Code | Name | Meaning |
| - | - | - |
| `200` | `OK` | General success |
| `201` | `COMMAND_EXECUTED` | A remote command ran successfully |
| `401` | `UNAUTHORIZED` | The request was rejected |
| `404` | `NOT_FOUND` | No matching route or target |
| `500` | `ERROR` | Generic failure |

## Emitted Events

| Event | When it fires | `eventData` |
| - | - | - |
| `RequestReceivedEvent` | An incoming request is deserialized and routed | `null` |
| `RequestSentEvent` | A unicast or broadcast request is sent successfully | `null` |
| `RequestFailedEvent` | A unicast request cannot be sent on any available channel | `null` |
