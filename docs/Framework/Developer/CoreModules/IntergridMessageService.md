# Intergrid Message Service

[[toc]]

Mother uses a Request/Response pattern for intergrid communication. Every grid running Mother automatically makes use of this when booting to ping other grids on the antenna network.

## Request

### Request Object

```csharp
// show how to create a request object with custom body and headers.
```

### Sending a Request

### Open Broadcast

Open broadcasts go to all grids on the antenna network channel. This is most appropriate for public channels.

```csharp
// show how to send an open broadcast request and manage the response
```

### Direct Broadcast

Direct broadcasts go to a specific grid on the antenna network channel. This is most appropriate for private channels and sending remote commands.

```csharp
// show how to send a direct broadcast request and manage the response
```

## Response

### Response Object

#### Response Types

table of response codes , names, and description

| Code | Name | Description |
| ---- | ---- | ----------- |
| 200  | OK   | The request was successful |
| 400  | Bad Request | The request was malformed |
| 401  | Unauthorized | The request was not authorized |

### Handing A Response

### Routes
