# Security

This utility can assist with encrypting and decrypting data using a provided `passcode`. For example, this is used heavily during intergrid communication to ensure communications are secured over channels using passcodes.

[[toc]]

## Encypting Data

To encrypt data, we use the `Encrypt()` method. It expects a string to be encypted, with the desired passcode to be used for encyption.

```csharp
string message = "The Empire must grow";
string passcode = "Z1ON0101"

string encyptedMessage = Security.Encrypt(message, passcode);
// => "##asjjgahas4$@fasjasd#..."
```

## Decypting Data

To decrypt data, we can use the `Decrypt()` method with a passcode:

```csharp
string enryptedMessage = "##asjjgahas4$@fasjasd#...";
string passcode = "Z1ON0101"

string decryptedMessage = Security.Decrypt(enryptedMessage, passcode);
// => "The Empire must grow"
```
