# Configuration



Players can easily configure Mother using the Programmable Block's **Custom Data**. Where a Module has configuration settings, they will be documented in the module's section of this documentation.

[[toc]]

::: important
Don't forget to run the `boot` command when you update the Custom Data in the Programmable Block.
:::


## Mother OS Configuration
```ini title="Mother > Custom Data"
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
; block hooks can be defined within Mother's Custom Data to trigger events on blocks.  This allows for localized automation of blocks.
AirlockOuterDoor.onOpen=
| light/blink "Airlock Light" fast; 
| vent/depressurize AirlockVent; 
| wait 10; 
| door/close OuterDoor;
```

## Block Configuration
All Terminal Blocks have a `Custom Data` field.  This is where you can define the block's configuration, tags, and hooks.

```ini title="AirlockDoor > Custom Data"
[general]
tags=airlock,door

[hooks]
onOpen=
| light/blink "Airlock Light" fast;
| vent/depressurize AirlockVent;

onClose=
| vent/pressurize AirlockVent;
| wait 2;
| light/blink "Airlock Light" off;
```

## Hooks

Hooks are triggered when specific blocks change state. they can be defined within a block's Custom Data or within Mother's Custom Data.

:::tip
You can use `this` to refer to the block itself when targeting it from within its own custom data.
:::

::: note
Hooks are defined within Modules where available.  See the [Connector Module](Modules/Extension/ConnectorModule.md), and [Sensor Module](Modules/Extension/SensorModule.md) for some examples.
:::

For when the `OuterDoor` opens, a light will blink, a vent will depressurize, and the door will close.

```ini title="OuterDoor > Custom Data"
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
or, we can define the hook in Mother's Custom Data:

```ini title="OuterDoor > Custom Data"

```ini title="Mother > Custom Data"
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

::: note
The pipe character `|` is used to indicate a new line in the `Commands` section.  This is not required in the Programmable Block terminal but allows us to organize our commands and routines across multiple lines for readibility.
:::

<!-- ## General Configuration

| Key | Value | Description |
| --- | --- | --- |
| `debug` | **false**, true | Enable debug logging. | -->
 
 
<!-- [waypoints]
TopSecretBase="GPS:TopSecretBase:211.78:-52.93:59.19:#FF75C9F1:" -->

<!-- [Modules >](Modules/Modules.md) -->