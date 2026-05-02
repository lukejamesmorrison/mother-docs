---
prev: /Framework/Developer/Console.md
next: /Framework/Developer/Utilities/Utilities.md
---

# Core Modules

Core modules are the runtime services that every Mother-based script builds on top of. They handle boot orchestration, timing, events, commands, storage, block discovery, and inter-grid communication so your extension modules can stay focused on ship logic.

Every page in this section now shows the real usage surface from Mother Core v1.1, along with the built-in events exposed by the framework.

| Name | Description |
| - | - |
| [Activity Monitor](ActivityMonitor.md) | Watches a block until it reaches a terminal state, then runs a callback once. |
| [Almanac](Almanac.md) | Stores records for this grid, nearby grids, and waypoints for navigation and messaging. |
| [Block Catalogue](BlockCatalogue.md) | Discovers blocks on the construct, loads block config, tracks tags, and runs hooks. |
| [Clock](Clock.md) | Schedules recurring work, delayed actions, and multi-cycle coroutines. |
| [Command Bus](CommandBus.md) | Registers and executes commands, routines, and construct-wide command handoff. |
| [Configuration](Configuration.md) | Reads programmable block Custom Data, variables, commands, and runtime config values. |
| [Event Bus](EventBus.md) | Publishes and subscribes to framework and custom events. |
| [Intergrid Message Service](IntergridMessageService.md) | Sends requests and responses across IGC channels and construct-local routes. |
| [Local Storage](LocalStorage.md) | Persists serialized data through recompiles using `Program.Storage`. |
| [Log](Log.md) | Stores recent diagnostic records for displays and debugging. |
| [Terminal](Terminal.md) | Renders console output, highlights, and status indicators in the programmable block terminal. |

## Built-in Events

These are the built-in events available to extension modules via `Subscribe<TEvent>()` or `Mother.GetModule<EventBus>().Subscribe<TEvent>(this)`.

| Event | Emitted by | `eventData` |
| - | - | - |
| `SystemBootedEvent` | `Mother` after all modules finish booting | `null` |
| `BlockConfigChangedEvent` | `BlockCatalogue` when any block Custom Data changes | `IMyTerminalBlock` |
| `SystemConfigChangedEvent` | `BlockCatalogue` when the programmable block Custom Data changes | `IMyTerminalBlock` |
| `RequestReceivedEvent` | `IntergridMessageService` when an incoming request is accepted | `null` |
| `RequestSentEvent` | `IntergridMessageService` when a request is dispatched successfully | `null` |
| `RequestFailedEvent` | `IntergridMessageService` when a unicast request fails on every channel | `null` |
| `ConnectorLockedEvent` | `ConnectorModule` | `IMyShipConnector` |
| `ConnectorUnlockedEvent` | `ConnectorModule` | `IMyShipConnector` |
| `ConnectorReadyToLockEvent` | `ConnectorModule` | `IMyShipConnector` |
| `MechanicalBlockAttachedEvent` | `MechanicalBlockModule` | `IMyMechanicalConnectionBlock` |
| `MechanicalBlockDetachedEvent` | `MechanicalBlockModule` | `IMyMechanicalConnectionBlock` |
| `MergeBlockLockedEvent` | `MergeBlockModule` | `IMyShipMergeBlock` |
| `MergeBlockOffEvent` | `MergeBlockModule` | `IMyShipMergeBlock` |

:::info
`ConnectorModule`, `MechanicalBlockModule`, and `MergeBlockModule` ship with Mother Core and emit useful construct-topology events even though they are not documented as primary framework modules in this folder.
:::
