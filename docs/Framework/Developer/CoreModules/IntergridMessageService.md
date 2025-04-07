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
