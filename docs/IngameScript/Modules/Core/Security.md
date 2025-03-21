# Security
<!-- [< Modules](../Modules.md) -->

Mother has security features to ensure that grids running Mother cannot interfere without permission.  This is especially important when using the intergrid communication system in a multiplayer environment.  

## Encrypting Messages

By default, Mother does not encrypt messages, but you can enable this feature by setting `encrypt_messages=true` in the `Custom Data` of the Programmable Block running Mother. When enabled, Mother will encrypt all outgoing messages, and attempt to decrypt incoming messages using `passcodes`.  To decrypt messages, the receiving grid must have the same `passcodes` set in its `Custom Data`.

```ini title="Mother > Custom Data"
[security]
encrypt_messages=true
passcodes=Sup3rSecr3tP@ssw0rd
```

::: caution
By default, all grids in Space Engineers can access Intergrid Communication (IGC), so ensuring that your faction's passcode is secure is important.  If you are in a public server, this is the only way to ensure other factions cannot intercept messages and execute remote commands on your grid. 
:::

Should your grid receive a unencrypted message, or with an incorrect passcode, Mother will log the message, but will not respond.

## Configuration

|Key| Value| Description|
|-|-|-|
|`encrypt_messages`| **false**, true | Should Mother encrypt outgoing messages using `passcodes`. If false, Mother will communicate unsecurely with every grid on the antenna network. This is fine for single player and PvE multiplayer.|
|`passcodes`| string | The passcode used to encrypt and decrypt messages.  Must be the same on all grids running Mother when `encrypt_messages` is `true`.|
