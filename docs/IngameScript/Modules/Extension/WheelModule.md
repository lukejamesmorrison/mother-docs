# Wheel Module
The Wheel Module allows the user to control wheel suspension blocks on the grid. Wheels (motor suspensions) are essential for ground vehicles, rovers, and other wheeled craft. This module provides commands for adjusting wheel height offset, allowing for fine-tuned control over vehicle ride height and suspension behavior.

[[toc]]

## Commands

### wheel/height
Set the height offset of a wheel or group of wheels. The height offset controls the suspension position, with negative values lowering the wheel and positive values raising it.

```
wheel/height <Wheel|Group> <Height> [--options]
```

Options
| Option  | Values          | Unit   | Description                                                         |
| ------- | --------------- | ------ | ------------------------------------------------------------------- |
| `add`   | `true`, `false` | `bool` | Indicates that the height should be *added* to the current height. Allows incremental changes to height. |
| `sub`   | `true`, `false` | `bool` | Indicates that the height should be *subtracted* from the current height. Allows decremental changes to height. |

**Example**

Set the front wheels to a height offset of -0.5m:
```ms title="Terminal"
wheel/height "Front Wheels" -0.5;
```

Raise the rear wheels by 0.2m:
```ms title="Terminal"
wheel/height "Rear Wheels" 0.2 --add;
```

Lower all wheels by 0.1m:
```ms title="Terminal"
wheel/height "All Wheels" 0.1 --sub;
```

### wheel/power
Set the power of a wheel or group of wheels as a percentage. Power controls how much force the wheel applies when driving.

```
wheel/power <Wheel|Group> <Power%>
```

**Example**

Set all wheels to 50% power:
```ms title="Terminal"
wheel/power "All Wheels" 50;
```

Set front wheels to full power:
```ms title="Terminal"
wheel/power "Front Wheels" 100;
```

### wheel/friction
Set the friction of a wheel or group of wheels as a percentage. Friction affects how much grip the wheel has on surfaces.

```
wheel/friction <Wheel|Group> <Friction%>
```

**Example**

Set all wheels to 75% friction:
```ms title="Terminal"
wheel/friction "All Wheels" 75;
```

Reduce front wheel friction for drifting:
```ms title="Terminal"
wheel/friction "Front Wheels" 25;
```

### wheel/strength
Set the strength of a wheel or group of wheels as a percentage. Strength controls the suspension stiffness.

```
wheel/strength <Wheel|Group> <Strength%>
```

**Example**

Set all wheels to maximum strength:
```ms title="Terminal"
wheel/strength "All Wheels" 100;
```

Soften rear suspension:
```ms title="Terminal"
wheel/strength "Rear Wheels" 40;
```

