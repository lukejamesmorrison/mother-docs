# Docking Module

The Docking Module handles docking procedures for the grid.

::: caution
Docking is only recommended in space at this time.  Undocking is not supported, but is coming soon. If undocking is just thrusting away from the connector, consider leveraging the [`thrust`](./ThrusterModule.md#thrust) command with the [`wait`](../../CommandLineInterface.md#delaying-command-execution) command. 
:::

[[toc]]

## Commands

### dock
Dock with a grid and specify optional connectors.  If you do not provide a connector, the grids will automatically select the connectors to use. This is most useful when you are building drones, and utility vehicles with only one connector. Mother will only use connectors that are `On` and in a `Unconnected` state to reduce the changes of a collision or unsafe docking procedure. 

```
dock <Grid Name> [--options]
```

Options
| Option  | Values  | Unit | Description                        |
| ------- | ------- | ---- | ---------------------------------- |
| `local` | string |   | The name of the connector you wish to use on the local grid. |
| `remote` | string |   | The name of the connector you wish to use on the remote grid. |

**Example**

We want to dock with a grid named `Mothership` using the local grid's connector named `MainConnector`, and the remote grid's connector named `Connector - MS.P1`.

```bash title="Terminal"
# Specify both connectors by name
dock Mothership --local=MainConnector --remote="Connector - MS.P1";

# If there is one connector on our grid, we only specify the remote connector
dock Mothership --remote="Connector - MS.P1";

# Or we let the grids decide which connectors to use
dock Mothership;
```

## Configuration

|Key| Value| Description|
|-|-|-|
|`appDistance`| meters | The distance the approaching grid should approach from. Default is **30m**. This is set on the connector to be used for docking. |

**Example**

```ini title="DockConnector > Custom Data"
[general]
; Set the approach distance to 50 meters from the connector face
appDistance=50
```


