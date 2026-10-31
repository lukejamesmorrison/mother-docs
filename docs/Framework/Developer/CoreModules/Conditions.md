# Conditions

[[toc]]

The `ConditionModule` evaluates conditions of the form `<target> <predicate>` or `<target> <property> <operator> <value>`. It is the engine behind [`when` rules and inline `if` steps](../../../IngameScript/ConditionalLogic.md) that players write in Custom Data.

Core only knows the vocabulary every block shares (`enabled`, `working`) and connector `status`. The properties, predicates and state words of every other block are registered by the extension module that owns the block, so Core stays small and a construct only knows what its scripts provide.

## How Conditions Are Used

One grammar serves two bindings:

| Binding | Where | Behaviour |
| - | - | - |
| `when` rule | `[rules]` in a programmable block's Custom Data, or a block's own Custom Data | Polled every `ruleInterval` seconds. Runs the steps when the condition becomes true, and the steps after `else;` when it becomes false. |
| `if` / `elseif` / `else` / `end` | Any routine: `[commands]`, `[menu:...]`, `[hooks]`, rule bodies | Evaluated once when the step is reached. Steps in a branch that does not run are skipped without resolving variables. |

`CommandBus` handles the `if` steps and calls `ConditionModule` to evaluate each condition. A failing condition, such as an unknown predicate, stops the routine and prints why.

## Registering Properties and Predicates

Register vocabulary from the `Boot()` method of an extension module. The easiest way is the `Block<T>()` helper on `BaseModule`, which groups the registrations for one block type so the type is written once. See [Building a Module](../BuildingAModule/BuildingAModule.md#registering-block-commands-and-conditions).

```csharp title="PerimeterDefenceModule.cs"
public override void Boot()
{
    Block<IMyBatteryBlock>("battery")
        .Command("discharge", DischargeBattery, BlockMessages.BlockDischarging)
        .Number("charge", b => b.CurrentStoredPower / b.MaxStoredPower)
        .Status("mode", b => b.ChargeMode);

    Block<IMySensorBlock>()
    .Flag("detected", b => b.IsActive, "detected", "clear");

    RegisterPredicate("low", "charge < 20%", "5%");
    RegisterPredicate("critical", "charge < 10%", "3%");
    RegisterPredicate("full", "charge > 98%");
}
```

### Properties

| `BlockSet<T>` method | Registers | Group of blocks |
| - | - | - |
| `Number(key, read)` | A numeric property, ie. `charge`. | Compared by average. |
| `Flag(key, read, yes, no)` | A yes or no property (`1` or `0`), with an optional predicate for each answer. | True when any block is. |
| `Status(key, read)` | An enum such as a door's status. Each value name becomes a state word and a predicate. | Matches when any block does. |

The underlying methods on `ConditionModule` are `RegisterProperty<T>()`, `RegisterFlag<T>()` and `RegisterStatus<T, E>()`.

Several modules can register the same property for the block types they own, and the first selector that answers for a block is used. A selector returns `double.NaN` for a block that is not of its type, and that block is skipped. Registering a property again for the same block type has no effect, so a module that several scripts share can register it again harmlessly.

```csharp title="SensorModule.cs"
Block<IMySensorBlock>()
    .Flag("detected", b => b.IsActive, "detected", "clear");
```

### Predicates

A predicate is a name for one or more `property operator value` rows, joined by `|`. A block in the target answers the first row it has a property for.

```csharp title="BatteryModule.cs"
// Register from an extension module with RegisterPredicate on BaseExtensionModule.
RegisterPredicate("low", "charge < 20%", "5%");
```

| Parameter | Description |
| - | - |
| `name` | Lower case predicate name, ie. `low`. |
| `rows` | `property operator value` rows joined by `\|`, ie. `charge < 20%`. |
| `band` | Optional default buffer for the predicate, ie. `5%`. |

Registering a name that already exists adds the rows to it. That is how `low` is a battery, gas tank and air vent row at the same time: each module contributes the row for the blocks it owns.

State words are also predicates. `RegisterStatus` on a door registers `open`, `opening`, `closed` and `closing`, so `if "Door" open;` works with nothing else registered.

### Operators and Values

| Operator | Meaning |
| - | - |
| `<` `>` `<=` `>=` | Numeric comparison. |
| `==` `!=` | Equal or not equal. |

A value is a number, a ratio such as `20%` (stored as `0.2`), or a state word such as `locked`.

### The Buffer

`<` and `>` conditions get a buffer so a value hovering around the limit does not flicker. Once a condition is true it only goes false again when the value moves past the limit by the buffer.

The buffer is the first of:

1. The `--buffer` option on the rule.
2. The default `band` of the predicate.
3. An implicit buffer of 2% for a ratio, or 1 unit for any other value.

## The `[predicates]` Section

Players can add a predicate or replace one in the `[predicates]` section of the programmable block's Custom Data. This replaces the registered rows until the next boot, and applies at once. Rules are rebuilt a few cycles later.

```ms title="Programmable Block > Custom Data"
[predicates]
low=charge < 30% | fill < 20%
low.band=8%
```

`name.band` sets the default buffer of the predicate.

## Sharing Vocabulary Across the Construct

Scripts advertise the names they define in the `sync` ping that [`IntergridMessageService`](./IntergridMessageService.md) already sends. They are kept in `IntergridMessageService.ConstructVocab`, and `ConstructVocabChangedEvent` is emitted when a set changes.

When a script evaluates a condition it uses its own vocabulary first. A name that is registered locally is always evaluated locally. Only a condition that no local block answers, and whose name another script defines, is sent to that script. The owner evaluates it and replies over a construct-only, read-only `cond` route.

This means Mother GUI can test MAPS's `inspace`, and MAPS can test Mother OS's `low`, with nothing registered in the script that uses them.

- **`when` rules** keep their state on the script that holds the rule. They use the last answer received, act on a reply as soon as it arrives, and go false when the owner stops answering. A rule on a name that no script defines yet is kept, and starts working when the owner appears.
- **`if` and `elseif`** pause the routine, not the script, until the owner answers. If it does not answer in time the step fails with `no answer from script <id> for <name>`. Set the wait with `condTimeout`.
- **Lowest id wins.** When several scripts answer a condition, the lowest script id that has a block that answers decides.
- Conditions are batched: one request per owner per cycle, up to 10 conditions per request.

## Configuration

| Key | Default | Description |
| - | - | - |
| `[general] ruleInterval` | `0.5` | Seconds between passes over the `when` rules. Applied at boot. |
| `[general] condTimeout` | `2` | Seconds an inline `if` waits for another script to answer. |

## Targets

| Target | Resolves to |
| - | - |
| `BlockName`, `"Group Name"`, `#blocks-tag` | Blocks by name, group or tag, like any command. |
| `grid` | The grid's controller, used by `speed`, `altitude` and other ship properties. |

An unquoted `grid` is the controller. A quoted `"grid"` is a block or group with that name. In a block's own Custom Data, `this` is that block.

## Rule Lifecycle

- Rules are rebuilt when configuration or the construct changes, one rule per cycle so a long list never runs a cycle out of instructions. The old rules keep running until the new ones replace them.
- A rule keeps its last result, so a rebuild never fires a rule again.
- A rule that fails is disabled and reported once. It never stops the others.

## Helpful Members

| Member | Use |
| - | - |
| `RegisterProperty<T>(key, read, any)` | Registers a property for a block type. |
| `RegisterPredicate(name, rows, band)` | Registers or extends a predicate. |
| `RegisterFlag<T>(key, read, yes, no)` | Registers a yes or no property and its predicates. |
| `RegisterStatus<T, E>(key, read)` | Registers an enum property and its state words. |
| `Evaluate(command, out error)` | Evaluates an inline condition once against this script's vocabulary. |
| `Begin(command, out error, out poll)` | Starts an `if` evaluation. Returns `1`, `0`, or `2` when it must wait for another script. |
| `Check(command, stateful, tripped, out error)` | Returns `1`, `0`, or `-1` when no block answers. |
| `Answer(condition, tripped)` | Answers a condition for another script. |
| `Ask(owner, condition, tripped, onResult)` | Queues a condition for another script. |
| `Flush()` | Sends the queued conditions. |
| `Names(preds)` | The names this script defines, shared with the construct. |

## Emitted Events

`ConditionModule` does not emit any events. It subscribes to `SystemBootedEvent`, `SystemConfigChangedEvent`, `BlockConfigChangedEvent`, `ConstructRefreshedEvent` and `ConstructVocabChangedEvent` to keep its rules current.
