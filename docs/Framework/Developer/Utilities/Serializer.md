# Serializer

On several occasions, it is most practical to convert our objects into strings. This is necessary when commiting data to [Local Storage](../CoreModules/LocalStorage.md) or when communicating with another grid via the Intergrid Messaging Service. 

The `Serializer` utility class provides a set of static methods to serialize and deserialize objects.

## Serialize an Object

When sending a message to another grid, we need to convert our message into a string. This is done by calling the `Serializer.SerializeDictionary()` method to serialize or message `header` and `body`.

```csharp title="IntergridMessagingObject.cs"

public virtual string Serialize()
{
    // Create a dictionary to store the message
    Dictionary<string, object> body;
    Dictionary<string, object> header;

    string headerSerialized = Serializer.SerializeDictionary(header);
    string bodySerialized = Serializer.SerializeDictionary(body);

    // Serialize the dictionary
    return  $"<header>{headerSerialized}</header>" +
            $"{bodySerialized}";
}
```

See the [Intergrid Messaging Service]() for more information on how to send messages to other grids.

## Deserialize an Object
