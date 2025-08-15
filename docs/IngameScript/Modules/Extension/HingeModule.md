# Hinge Module
<!-- [< Modules](../Modules.md) -->

The hinge module allows the user to control hinges on the grid.  Hinges are particularly vulnerable to phantom forces and the *Almighty Clang*, so we leverage the [Activity Monitor](/IngameScript/Modules/Core/ActivityMonitor.md) to ensure hinges are stopped and locked when not in use. Players can simply define an angle and speed of rotation without worrying about direction, upper/lower limits, or their grid ripping itself apart.

[[toc]]

## Commands

### hinge/rotate
Rotate a hinge or group of hinges to a specific angle between -90 degrees and 90 degrees.
```
hinge/rotate <Hinge|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `speed` | [-5.0, 5.0] | RPM  | Set the speed of the hinge. Negative values will reverse the hinge. Default is 1 RPM. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided angle should be *added* to the current angle. Allows incremental changes to angle. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided angle should be *subtracted* from the current angle. Allows decremental changes to angle. |

**Example**
Rotate the landing gear hinge to 90 degrees.
```bash title="Terminal"
hinge/rotate LandingGearHinge 90;
```

Reduce the angle of the landing gear hinge by 10 degrees.
```bash title="Terminal"
hinge/rotate LandingGearHinge 10 --sub;
```

### hinge/lock
Lock a hinge or group of hinges.
```
hinge/lock <Hinge|Group>
```
<!-- Options
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the hinge's velocity to 0 when locking. | -->

**Example**
```bash title="Terminal"
hinge/lock LandingGearHinge;
```

### hinge/unlock
Unlock a hinge or group of hinges.
```
hinge/unlock <Hinge|Group>
```

**Example**
```bash title="Terminal"
hinge/unlock LandingGearHinge;
```

### hinge/reset
Reset a hinge or group of hinges to their original position (0 degrees).
```
hinge/reset <Hinge|Group>
```

**Example**
```bash title="Terminal"
hinge/reset LandingGearHinge;
```

### hinge/speed
Set the speed of a hinge or group of hinges in RPM.
```
hinge/speed <hinge|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `free`  | `true`, `false` | `bool `    | Indicates whether the hinge should be free to rotate or not. Default is `false`. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided speed should be *added* to the current speed. Allows incremental changes to speed. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental changes to speed. |

**Example**

Set speed to 2 RPM and allow hinge to rotate freely:
```bash title="Terminal"
hinge/speed LandingGearHinge 2 --free;
```

Increase speed by 2.5 RPM:
```bash title="Terminal"
hinge/speed LandingGearHinge 2.5 --add;
```

Decrease speed by 1 RPM:
```bash title="Terminal"
hinge/speed LandingGearHinge 1 --sub;
```

<!--- 
OnOff, OnOff_On, OnOff_Off, ShowOnHUD, ShowOnHUD_On, ShowOnHUD_Off, IncreaseFontSize, DecreaseFontSize, IncreaseTextPaddingSlider, DecreaseTextPaddingSlider, IncreaseChangeIntervalSlider, DecreaseChangeIntervalSlider, PreserveAspectRatio, IncreaseWeld speed, DecreaseWeld speed, Force weld, IncreaseSafetyDetach, DecreaseSafetyDetach, ShareInertiaTensor, AddRotorTopPart, AddMediumRotorTopPart, AddSmallRotorTopPart, AddHingeTopPart, AddMediumHingeTopPart, AddSmallHingeTopPart, Reverse, Detach, Attach, RotorLock, RotorLock_On, RotorLock_Off, HingeLock, HingeLock_On, HingeLock_Off, IncreaseTorque, DecreaseTorque, IncreaseBrakingTorque, DecreaseBrakingTorque, IncreaseVelocity, DecreaseVelocity, ResetVelocity, RotateToAngle, SetVelocity, IncreaseLowerLimit, DecreaseLowerLimit, SetLowerLimit, IncreaseUpperLimit, DecreaseUpperLimit, SetUpperLimit, IncreaseDisplacement, DecreaseDisplacement


--->