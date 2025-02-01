# Configuration

[< Command Line Interface](CommandLineInterface.md)

Players can easily configure Mother using the Programmable Block's **CustomData**. Where a Module has configuration settings, they will be documented in the module's section of this documentation.

> [!IMPORTANT] 
> Don't forget to `Recompile` Mother when you update the CustomData in the Programmable Block.

```
[general]
debug=false 

[security]
encrypt_messages=false
passcodes=Sup3rSecr3tP@ssw0rd

[Commands]
# single line command
hinge0=hinge/rotate Hinge 0 --speed=2

# single line routine
hinge45=hinge/rotate Hinge 45 --speed=2; rotor/rotate Rotor 20 --speed=1;

# multi-line routine
goto-ts-base=
| nav/set-flightplan "GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:";
| fcs/start --speed=100;
```

> [!NOTE] 
> The pipe character `|` is used to indicate a new line in the `Commands` section.  This is not required in the Programmable Block terminal but allows us to organize our commands and routines across multiple lines for readibility.

<!-- ## General Configuration

| Key | Value | Description |
| --- | --- | --- |
| `debug` | **false**, true | Enable debug logging. | -->
 
 
<!-- [waypoints]
TopSecretBase="GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:" -->

[Modules >](Modules/Modules.md)