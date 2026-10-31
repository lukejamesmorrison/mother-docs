# Conditional Logic

Conditional logic lets your construct make decisions. A script can react to the state of your blocks (`"Batteries" low`, `grid altitude < 100`) with polled `when` rules, or branch inside any routine with `if` steps. Every Mother-powered script on the construct shares the same vocabulary, so a condition works in [Mother OS](./IngameScript.md), [Mother GUI](../MotherGUI/README.md) and [MAPS](../MotherAutopilotSystem/README.md).

[[toc]]

```ms title="Programmable Block > Custom Data"
; Change these values to match your block and group names.
[variables]
SCREEN="Cockpit:1"
BATTERIES=Batteries
CONNECTOR="Main Connector"

; When our batteries are low, we print to a cockpit screen.
[rules]
LowPower=
| when $BATTERIES low;
|   screen/print $SCREEN "Power is low";
| else;
|   screen/print $SCREEN "Power OK";

; Run docking procedure if connector ready to connect,
; or notify the user.
[commands]
Dock=
| if $CONNECTOR connectable;
|   connector/lock $CONNECTOR;
| else;
|   view/notify $SCREEN "Cannot lock. No connector detected." --level=error;
| end;
```

`$NAME` is replaced with the value from `[variables]`, so you only edit your block names in one place.

See [Examples](./Examples.md#conditional-logic) for recipes such as an airlock, landing lights and an automatic docking routine.

## Conditions

A condition is a **target** followed by one of two forms:

| Form | Example | True when |
| - | - | - |
| Predicate | `"Batteries" low` | The predicate is true for the target. |
| Property, operator, value | `"Batteries" charge < 25%` | The property compares true to the value. |

### Targets

| Target | Meaning |
| - | - |
| `BlockName`, `"Group Name"`, `#block-tag` | A block, group or tag, like any other command. Quotes are only needed when the name contains spaces. |
| `grid` | The grid's controller (a cockpit or remote control). Use it for ship properties such as `speed` and `altitude`. |
| `this` | In a block's own Custom Data, the block itself. |

An unquoted `grid` is the controller. A quoted `"grid"` is a block or group with that name.

When the target is a group, the blocks are combined. A numeric property is compared by its **average**, and a yes or no property or a state word is true when **any** block matches. In a group of mixed blocks, only blocks that define the property or predicate are tested.

### Operators and Values

| Operator | Meaning |
| - | - |
| `<` `>` `<=` `>=` | Numeric comparison. |
| `==` `!=` | Equal, or not equal. |

A value is a number (`100`), a ratio (`20%`, which is `0.2`) or a state word (`locked`).

```ms title="Examples"
"Batteries" charge < 25%
grid altitude < 100
"Landing Gear" status == locked
grid dampeners == 0
```

State words are the names of an enum state, such as a door's `open`, `opening`, `closed` and `closing`. Every state word also works as a predicate, so `"Door" open` and `"Door" status == open` mean the same.

`dampeners` and `handbrake` have no predicate. Compare them to `1` (on) or `0` (off), for example `when grid dampeners == 0;`.

## `when` Rules

A rule runs a routine when a condition changes. Rules go in the `[rules]` section of a programmable block's Custom Data. The first step must be `when`.

```ms title="Programmable Block > Custom Data"
[rules]
LandingLights=
| when grid altitude < 100;
|   block/on "Landing Lights";
| else;
|   block/off "Landing Lights";
```

The steps after `when` run when the condition goes from **false to true**. After an optional top level `else;` we can run commands when it goes back to **false**. A rule fires on the change only and does not repeat while the condition stays the same.

When a script boots, or the rules are rebuilt, a rule whose condition is already true fires on its first pass. A rule keeps its last result across a rebuild, so editing Custom Data does not fire every rule again. Rules can contain `if` steps. An `else;` inside an `if` belongs to the `if`.

Indent the steps under each `when` to make the nesting easy to read.

### Rules on a Block

A block's own Custom Data can also have a `[rules]` section. In it, `this` is that block.

```ms title="Airlock Door > Custom Data"
[rules]
KeepClosed=
| when this open --for=10;
|   door/close this;
```

### Rule Options

Options go at the end of the `when` step.

| Option | Description |
| - | - |
| `--at=<value>` | Changes the threshold of a predicate for this rule only, for example `when "Batteries" low --at=25%;` warns at 25% instead of 20%. Also works on `if`. |
| `--buffer=<value>` | Keeps a value that hovers around the limit from flickering. Once a `<` or `>` condition is true, it only goes false again when the value passes the limit by this much. For example, `when grid altitude < 100 --buffer=20;` switches off again above 120. |
| `--for=<seconds>` | The condition must stay true for this long before the rule fires. Going back to false is not delayed. |
| `--cooldown=<seconds>` | Holds the rule back from firing again, in either direction, until this long after it last fired. |
| `--every=<seconds>` | Checks this rule on its own interval, instead of the shared interval. |

`<` and `>` conditions already have a small built-in buffer of 2% for a ratio or 1 unit for any other value, and predicates can carry their own. `low` and `critical` use 5% and 3%, so they do not flicker around the limit.

These options keep state, so they only work on `when` rules. `--at` is the only option allowed on an `if`.

### Rule Interval

All rules are checked together every `0.5` seconds. Change this in `[general]`.

```ms title="Programmable Block > Custom Data"
[general]
ruleInterval=1
```

## `if` Steps

Use `if`, `elseif`, `else` and `end` in any routine: a `[commands]` entry, a menu entry, a [hook](./Configuration.md#hooks), or the steps of a rule.

```ms title="Programmable Block > Custom Data"
[commands]
Undock=
| if $DOCK connected;
|   connector/unlock $DOCK;
|   wait 1;
| end;
| block/on $THRUSTERS;

Alert=
| if "Batteries" critical;
|   light/color "Alarm" red;
| elseif "Batteries" low;
|   light/color "Alarm" yellow;
| else;
|   light/color "Alarm" green;
| end;
```

- Every `if` needs its own `end;`. Put `else;` and `end;` in the same column as the `if` they belong to.
- Steps in a branch that does not run are skipped without resolving variables.
- Blocks can nest.
- An `if` block still open at the end of a routine is closed for you.
- `else` or `end` without an `if`, or `elseif` after `else`, stops the routine and prints why.

### Comparing Text

Two values compared with `==` or `!=` are compared as text, ignoring case. This is handy with variables set earlier in a routine with `var/set`.

```ms title="Programmable Block > Custom Data"
[variables]
MODE=parked

[commands]
Launch=
| if $MODE == parked;
|   var/set MODE flying;
|   door/close "Hangar Door";
| end;
```

This form takes exactly two values and no options. A variable that is not defined stays as literal text and does not match. `when` rules do not support it.

## Predicates

Predicates are the names you can use after a target. Each script defines the predicates for the blocks it owns, and shares them with every other script on the construct. Some predicates mean the same idea on many blocks, so `"Batteries" low`, `"Hydrogen Tanks" low` and `"Airlock Vent" low` all read naturally.

### Mother Core

Available in every script, including Mother GUI.

| Block | Predicates | Properties | State words |
|---|---|---|---|
| Any functional block | `on`, `off` | `enabled` | |
| Any block | `working`, `broken` | `working` | |
| Connector | `connected`, `connectable`, `disconnected` | `status` | `unconnected`, `connectable`, `connected` |

### Mother OS

| Block | Predicates | Properties | State words |
|---|---|---|---|
| [Battery](./Modules/Extension/BatteryModule.md#properties) | `low` (under 20%), `critical` (under 10%), `empty` (under 2%), `full` (over 98%), `ready` (over 99%) | `charge`, `mode` | `auto`, `recharge`, `discharge` |
| [Jump drive](./Modules/Extension/JumpDriveModule.md#properties) | `low`, `critical`, `empty`, `full`, `ready` (same as batteries) | `charge`, `status` | `charging`, `jumping`, `ready` |
| [Gas tank](./Modules/Extension/GasTankModule.md#properties) | `low` (under 15%), `critical` (under 10%), `empty` (under 2%), `full` (over 98%), `stockpiling` | `fill`, `stockpile` | |
| [Air vent](./Modules/Extension/AirVentModule.md#properties) | `low` (oxygen under 50%) | `oxygen`, `status` | `pressurized`, `pressurizing`, `depressurized`, `depressurizing` |
| [Door](./Modules/Extension/DoorModule.md#properties) | | `status` | `open`, `opening`, `closed`, `closing` |
| [Landing gear](./Modules/Extension/LandingGearModule.md#properties) | `ready`, `locked`, `unlocked` | `status` | `readytolock`, `locked`, `unlocked` |
| [Piston](./Modules/Extension/PistonModule.md#properties) | | `position`, `status` | `extending`, `extended`, `retracting`, `retracted`, `stopped` |
| [Rotor](./Modules/Extension/RotorModule.md#properties) and [hinge](./Modules/Extension/HingeModule.md#properties) | `locked`, `unlocked` | `angle` (degrees), `locked` | |
| Rotor, hinge and piston | `attached`, `detached` | `attached` | |
| [Sensor](./Modules/Extension/SensorModule.md#properties) | `detected`, `clear` | `detected`, `distance` | |
| [Cockpit](./Modules/Extension/CockpitModule.md#properties) and other ship controllers | `occupied`, `empty` | `occupied`, `dampeners`, `handbrake` | |
| [Thruster](./Modules/Extension/ThrusterModule.md#properties) | `weak` (effectiveness under 30%) | `effectiveness` | |

### MAPS

| Block | Predicates | Properties | State words |
|---|---|---|---|
| Grid (cockpit or remote control) | `moving` (faster than 0.1 m/s), `stopped`, `inspace` (no gravity), `ingravity` | `speed`, `gravity`, `altitude` (above the planet surface) | |

Use `grid` as the target, for example `if grid altitude < 100;`. `altitude` has no value in space, so a condition on it is false there.

### Mother GUI

Mother GUI does not define its own predicates. It uses every predicate from Mother Core, and from Mother OS and MAPS when they run on the same construct, so a menu can react to the state of your ship.

```ms title="Mother GUI > Custom Data"
[variables]
SCREEN="Cockpit:1"
BATTERIES=Batteries

[rules]
Alert=
| when $BATTERIES critical;
|   view/notify $SCREEN "Batteries critical" --level=error;
```

## Shared Vocabulary

A script can use conditions that only another script defines. Mother GUI can test MAPS's `inspace`, and MAPS can test Mother OS's `low`, with nothing extra to configure. Update all of your scripts at the same time so they run the same version of Mother Core.

- A name that a script defines itself is always evaluated by that script.
- A `when` rule uses the last answer received. If the other script stops answering, the rule goes false. A rule on a name that no script defines yet is kept, and starts working when the script appears.
- An `if` step pauses the routine, not the script, until the other script answers. If it does not answer within `condTimeout` seconds (default `2`), the step fails with `no answer from script <id> for <name>`.

```ms title="Programmable Block > Custom Data"
[general]
condTimeout=3
```

## Defining Your Own Predicates

Add your own predicate, or change a built-in one, in the `[predicates]` section of the programmable block's Custom Data. A predicate is one or more `property operator value` rows, separated by `|`.

```ms title="Programmable Block > Custom Data"
[predicates]
; Change what low means for batteries and tanks.
low=charge < 30% | fill < 20%

; Set the default buffer for a predicate.
low.band=8%

; A brand new predicate.
overheated=effectiveness < 50%
```

- A block answers the first row that has a property it knows, so `low` above tests `charge` on batteries and `fill` on tanks.
- `name.band` sets the buffer of the predicate, the same as `--buffer`.
- Changes apply at once.

A predicate never names a block. The target comes from the condition that uses it, so one predicate works on any block or group that has the property.

```ms title="Mother > Custom Data"
[rules]
BatteriesLow=
| when "Main Batteries" low;
|   light/color "Power Light" red;

FuelLow=
| when "Hydrogen Tanks" low;
|   light/color "Fuel Light" red;

ThrusterStrain=
| when "Atmospheric Thrusters" overheated;
|   light/color "Thrust Light" yellow;
```

A predicate applies to every block you use it on. To give different blocks different limits, define one predicate for each and choose the target when you use it:

```ms title="Programmable Block > Custom Data"
[predicates]
reserve=charge < 50%
```

```ms title="Mother > Custom Data"
[rules]
ReserveLow=
| when "Reserve Batteries" reserve;
|   light/color "Reserve Light" yellow;
```

## Troubleshooting

A rule or step that cannot run prints a message in the programmable block's terminal and log. Each message is printed once.

| Message | What to check |
| - | - |
| `Rule <name> disabled: needs when` | The first step of a rule must be `when`. |
| `no target: <name>` | No block or group matches the name, or a `$VARIABLE` is not defined. |
| `unknown predicate: <name>` | No script on the construct defines the predicate. Check the spelling, or that the script that owns it is running. |
| `unknown property`, `unknown operator`, `bad value` | Check the property, operator and value of a predicate row, or the `[predicates]` section. |
| `bad syntax` | A condition is a target and a predicate, or a target, property, operator and value. Quote names that contain spaces. |
| `--<option> only works on a when rule` | Move `--buffer`, `--for`, `--cooldown` or `--every` to a `when` rule. |
| `no answer from script <id> for <name>` | The script that defines the name did not answer in time. Check it is running on the construct, or raise `condTimeout`. |

A condition that no block answers is false. For example, `altitude` has no value in space.

Explore: [Examples](./Examples.md#conditional-logic) | [Upgrade Guide](./UpgradeGuide.md) | [Cheatsheet](../Cheatsheet.md#conditions) | [Conditions (Mother Core)](../Framework/Developer/CoreModules/Conditions.md)
