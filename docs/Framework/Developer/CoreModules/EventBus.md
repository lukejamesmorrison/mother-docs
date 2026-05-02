# Event Bus

[[toc]]

`EventBus` is the pub/sub layer for Mother Core. Modules subscribe to event types, and any module can emit those event types with optional `eventData`.

## Defining a Custom Event

Events are marker types that implement `IEvent`.

```csharp title="Events/DockingApprovedEvent.cs"
public class DockingApprovedEvent : IEvent { }
```

## Subscribing to an Event

Subscribe in `Boot()` either through the bus directly or through the `BaseModule` helper.

```csharp title="DockingModule.cs"
public override void Boot()
{
    Subscribe<DockingApprovedEvent>();
    Subscribe<RequestReceivedEvent>();
}
```

## Emitting an Event

Use `Emit<TEvent>()` for the common case.

```csharp title="DockingModule.cs"
public void ApproveDocking(IMyShipConnector connector)
{
    Emit<DockingApprovedEvent>(connector);
}
```

You can also emit through the bus directly if you already have an event instance.

```csharp title="DockingModule.cs"
GetModule<EventBus>().Emit(new DockingApprovedEvent(), connector);
```

## Handling an Event

Subscribed modules receive events through `HandleEvent()`.

```csharp title="DockingModule.cs"
public override void HandleEvent(IEvent e, object eventData)
{
    if (e is DockingApprovedEvent && eventData is IMyShipConnector connector)
        GetModule<BlockCatalogue>().RunHook(connector, "onApproved");
}
```

## Unsubscribing and Inspecting Subscriptions

```csharp title="DockingModule.cs"
EventBus eventBus = GetModule<EventBus>();

if (eventBus.IsSubscribed<DockingApprovedEvent>(this))
    eventBus.Unsubscribe<DockingApprovedEvent>(this);
```

## Built-in Events

These events are emitted by Mother Core and are immediately available to extension modules.

| Event | Emitted by | `eventData` |
| - | - | - |
| `SystemBootedEvent` | `Mother` after the full boot sequence completes | `null` |
| `BlockConfigChangedEvent` | `BlockCatalogue` when any block Custom Data changes | `IMyTerminalBlock` |
| `SystemConfigChangedEvent` | `BlockCatalogue` when the programmable block Custom Data changes | `IMyTerminalBlock` |
| `RequestReceivedEvent` | `IntergridMessageService` when a request is routed in | `null` |
| `RequestSentEvent` | `IntergridMessageService` when a request is sent successfully | `null` |
| `RequestFailedEvent` | `IntergridMessageService` when a unicast request cannot be sent | `null` |
| `ConnectorLockedEvent` | bundled `ConnectorModule` | `IMyShipConnector` |
| `ConnectorUnlockedEvent` | bundled `ConnectorModule` | `IMyShipConnector` |
| `ConnectorReadyToLockEvent` | bundled `ConnectorModule` | `IMyShipConnector` |
| `MechanicalBlockAttachedEvent` | bundled `MechanicalBlockModule` | `IMyMechanicalConnectionBlock` |
| `MechanicalBlockDetachedEvent` | bundled `MechanicalBlockModule` | `IMyMechanicalConnectionBlock` |
| `MergeBlockLockedEvent` | bundled `MergeBlockModule` | `IMyShipMergeBlock` |
| `MergeBlockOffEvent` | bundled `MergeBlockModule` | `IMyShipMergeBlock` |

:::info
`EventBus` does not create its own framework events. It only stores subscriptions and broadcasts events emitted elsewhere.
:::