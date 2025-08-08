# Intergrid Message Service

Mother uses a Request/Response pattern for intergrid communication. Every instance of Mother Core uses this system to share information and enable remote command execution.

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
        'primaryColor': '#BB2528',
        'primaryTextColor': '#fff',
        'primaryBorderColor': '#7C0000',
        'mainBkg': 'white',
        'nodeBorder': 'red',
        'lineColor': 'black',
        'secondaryColor': '#F2F2F2',
        'secondaryBorderColor': 'black',
        'tertiaryColor': '#F2F2F2',
        'tertiaryBorderColor': 'black'
    }
  }
}%%

graph LR
    A[Grid A] e1@-->|&nbsp;Request&nbsp;| B[Grid B]
    linkStyle 0 stroke:#BB2528,stroke-width:2px
    e1@{animation: slow}

    B e2@-->|&nbsp;Response&nbsp;| A
    linkStyle 1 stroke:#2196F3,stroke-width:2px
    e2@{animation: slow}
```

[[toc]]


## Requests

### The Request Object

We can create a new request by providing a `path`, a `body` and optional `header`. By default, headers will be attached to the request related to the identity of both the sender and receiver, as well as the path of the request. The request body can contain serialized data. 

```csharp
Vector3D targetPosition = new Vector3D(1000, 2000, 3000);

Dictionary<string, object> requestBody = new Dictionary<string, object>
{
    { "target", $"{targetPosition}" },
};

Request request = CreateRequest("initiate-launch", requestBody);
```

### Sending a Request

### Open Broadcast

Open broadcasts go to all grids on the antenna network. This is most appropriate for public channels and 1-to-many interactions.

```csharp title="LifeSupportModule.cs"
public void SendLifeSupportInformation()
{
    IntergridMessageService intergridMessageService = Mother.GetModule<IntergridMessageService>();
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

    Request request = intergridMessageService.CreateRequest(requestBody);
    
    intergridMessageService.SendOpenBroadcastRequest(request, OnLifeSupportResponse);
}

public void OnLifeSupportResponse(Response response) {
    // do something when response is received
 }   
```


### Direct Broadcast

Direct broadcasts go to a specific grid on the antenna network. This is most appropriate for private channels and 1-to-1 interactions. Mother will look for the target in the [Almanac](../Almanac.md) and send the request to the grid with the matching EntityId or name.

```csharp
public void SendLifeSupportInformation()
{
    IntergridMessageService intergridMessageService = Mother.GetModule<IntergridMessageService>();

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

    Request request = intergridMessageService.CreateRequest(requestBody);

    // the name of the grid we are sending the request to
    string targetId = "RefuellingPlatform"

    intergridMessageService.SendUnicastRequest(targetId, request, OnLifeSupportResponse);
}

public void OnLifeSupportResponse(Response response) { }   
```

## Responses

### The Response Object

The `Response` object should be created from the originating [Request](#the-request-object) object. It contains the response body and header, as well as the status code of the response. It accepts a `Request`, a status code, and an optional body and header.

```csharp
Vector3D targetPosition = new Vector3D(1000, 2000, 3000);

 Dictionary<string, object> responseBody = new Dictionary<string, object>()
 {
     { "x", $"{targetPosition.X}" },
     { "y", $"{targetPosition.Y}" },
     { "z", $"{targetPosition.Z}" },
 };

 return CreateResponse(request, Response.ResponseStatusCodes.OK, responseBody);
```

### Response Types
The response object can be used to send back a variety of response types, including:

#### 200 - General Status Codes

<!-- table of response codes , names, and description -->
| Code | Name                  | Description                                  |
|------|-----------------------|----------------------------------------------|
| 200  | OK                    | The request was successful.                  |
| 201  | COMMAND_EXECUTED      | The command was executed successfully.       |

#### 400 - Authorization Status Codes
| Code | Name                  | Description                                  |
|------|-----------------------|----------------------------------------------|
| 401  | UNAUTHORIZED          | The request was unauthorized.                |
| 404  | NOT_FOUND             | The requested resource was not found.        |

#### 500 - Interal Error Codes
| Code | Name                  | Description                                  |
|------|-----------------------|----------------------------------------------|
| 500  | ERROR                 | An internal server error occurred.           |

#### 600 - Docking Status Codes
| Code | Name                  | Description                                  |
|------|-----------------------|----------------------------------------------|
| 600  | DOCKING_APPROVED      | The docking request was approved.
| 601  | DOCKING_DENIED        | The docking request was denied.              |
| 602  | DOCKING_COMPLETE      | The docking process was completed successfully. |
| 603  | DOCKING_CANCELLED     | The docking process was cancelled.           |
| 604  | CONNECTOR_NOT_FOUND   | The specified connector was not found. |

:::info
Many of these codes remain unused by act as placeholders for future functionality.
:::

### Handing A Response

Like we saw earlier, when registering send a request, we can define a callback for when a Response is received:

```csharp
// send request to a target, and define what happens when a response is received
intergridMessageService.SendUnicastRequest(targetId, request, OnLifeSupportResponse);

public void OnLifeSupportResponse(Response response) { 
    // do something when the response is received
}   
```

## Routes

If you would like your script to handle a request to a specific path, we can register this route in the module's `Boot()` method using the `AddRoute()` method.

```csharp title="MissileGuidanceModule.cs"
 public override void Boot()
 {
    // Register Routes
    AddRoute(
        "initiate-launch", 
        request => HandleInitiateLaunchRequest(request)
    );
 }
```

## Encrypting Messages
When playing in a PvP environment, it quickly becomes important to secure your communications so that other players cannot remotely command your grids running Mother.  To do this, we can use Mother's built in encryption. Let's take a look at how we are using this during message transmission:

To encrypt messages, we use the [Security](../Utilities/Security.md) utility.

## Channels

Mother can communicate on multiple channels simultaneously.  We do this by defining channels in the programmable block's custom data, and provide a passcode if we wish to encrypt communications on that channel.

```ini title="Mother > Custom Data"
[channels]
; Set public channel as available and unencrypted. 
*=

; The private channels are encrypted if a passcode is provided.
MyFaction=Sup3rSecr3tP@ssw0rd
OtherFaction=An0therP@ssw0rd
; No passcode means no encryption on this channel.
ThirdFaction=  
```

When sending broadcasts, Mother will chose a single channel to use for communication.  This ensures that Mother is not overloading grids with multiples of the same request from different channels. This is done by assigning channels to [Almanac Records](../CoreModules/Almanac.md).
