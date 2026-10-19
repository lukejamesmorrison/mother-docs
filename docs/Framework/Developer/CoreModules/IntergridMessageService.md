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

## Sharing Views With Other Scripts

Scripts on the same construct share their views the same way they share commands. A script declares a view it draws, and other scripts can find the owner and ask it to show the view on a display. This is how [Mother GUI](../../../MotherGUI/README.md) can open the `MapView` from [MAPS](../../../MotherAutopilotSystem/Modules/MapModule.md) with `view/go`.

Mother Core only stores view names. It does not know how a view is drawn, so the owning script handles everything view-specific.

### Declaring an Owned View

Register the view in your module's `Boot()` method. The callback receives the display name (`BlockName:SurfaceIndex`) and whether the view is being shown (`true`) or released (`false`).

```csharp title="MapModule.cs"
public override void Boot()
{
    GetModule<IntergridMessageService>()
        .RegisterView("MapView", OnViewActivation);
}

void OnViewActivation(string displayName, bool show)
{
    // take the surface when show is true, stop drawing when it is false
}
```

Owned view names are included in the construct sync alongside command names, so other scripts learn about them automatically. After another script boots it can take up to 5 seconds for its views to be discovered.

### Finding an Owner and Activating a View

```csharp title="ViewModule.cs"
IntergridMessageService ims = GetModule<IntergridMessageService>();

long ownerId = ims.FindInstanceWithView("MapView");

if (ownerId != 0)
{
    // show the view on a display
    ims.SendViewActivation(ownerId, "MapView", "Cockpit:0", true);

    // later, release the display
    ims.SendViewActivation(ownerId, "MapView", "Cockpit:0", false);
}
```

| Member | Use |
| - | - |
| `RegisterView(viewName, onActivate)` | Declares a view owned by this script. |
| `ConstructViews` | View names discovered on other scripts, keyed by script ID. |
| `FindInstanceWithView(viewName)` | Returns the script ID that owns a view, or `0` if no script does. |
| `SendViewActivation(ownerId, viewName, displayName, active)` | Asks the owner to show (`true`) or release (`false`) a view on a display. |

::: info
`SendViewActivation()` does not wait for a reply. If the owner does not have the display, it does nothing and no error is returned.
:::

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
