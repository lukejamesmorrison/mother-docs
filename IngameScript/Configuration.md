# Configuration

[< Command Line Interface](CommandLineInterface.md)

Players can easily configure Mother using the Programmable Block's **CustomData**. Where a Module has configuration settings, they will be documented in the module's section of this documentation.

> [!IMPORTANT] 
> Don't forget to `Recompile` Mother when you update the CustomData in the Programmable Block.

## CustomData
```ini
[general]
debug=false 

[security]
encrypt_messages=false
passcodes=Sup3rSecr3tP@ssw0rd

[Commands]
; single line command
hinge0=hinge/rotate Hinge 0 --speed=2

; single line routine
hinge45=hinge/rotate Hinge 45 --speed=2; rotor/rotate Rotor 20 --speed=1;

; multi-line routine
goto-ts-base=
| nav/set-flightplan "GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:";
| fcs/start --speed=100;

[hooks]
; block hooks can be defined within Mother's customdata to trigger events on blocks.  This allows for localized automation of blocks.
AirlockOuterDoor.onOpen=
| light/blink "Airlock Light" fast; 
| vent/depressurize AirlockVent; 
| wait 10; 
| door/close OuterDoor;
```

### Hooks

Hooks can be defined within a block's CustomData or within Mother's CustomData to trigger events on blocks *when run via Mother*.  This allows players to tap into common events.

For example, when a door opens, a light may blink, a vent may depressurize, and the door may close.

**OuterDoor CustomData**

```
[hooks]
onOpen=
| light/blink "Airlock Light" fast; 
| vent/depressurize AirlockVent;
| wait 10; 
| door/close this;

onClose=
| vent/pressurize AirlockVent; 
| wait 2; 
| light/blink "Airlock Light" off;
```

**Mother CustomData**

```
[hooks]
OuterDoor.onOpen=
| light/blink "Airlock Light" fast; 
| vent/depressurize AirlockVent; 
| wait 10; 
| door/close OuterDoor;

"Inner Door".onClose=
| vent/pressurize AirlockVent; 
| wait 2; 
| light/blink "Airlock Light" off;
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