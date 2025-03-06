# Hinge Module
[< Modules](../Modules.md)

The hinge module allows the user to control hinges on the grid.  Hinges are particularly vulnerable to phantom forces and the Almighty Clang, so we leverage the Activity Monitor to ensure hinges are stopped and locked when not in use. Players can simply define an angle and speed of rotation without worrying about direction, upper/lower limits, or their grid ripping itself apart.

## Commands

### rotate
Rotate a hinge or group of hinges to a specific angle between -90 degrees and 90 degrees.
```
hinge/rotate <Hinge|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `speed` | -5.0 - 5.0 | RPM  | Set the speed of the hinge. Negative values will reverse the hinge. Default is 1 RPM. |

### lock
Lock a hinge or group of hinges.
```
hinge/lock <Hinge|Group>
```
<!-- Options
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the hinge's velocity to 0 when locking. | -->

### unlock
Unlock a hinge or group of hinges.
```
hinge/unlock <Hinge|Group>
```

### reset
Reset a hinge or group of hinges to their original position (0 degrees).
```
hinge/reset <Hinge|Group>
```

<!--- 
OnOff, OnOff_On, OnOff_Off, ShowOnHUD, ShowOnHUD_On, ShowOnHUD_Off, IncreaseFontSize, DecreaseFontSize, IncreaseTextPaddingSlider, DecreaseTextPaddingSlider, IncreaseChangeIntervalSlider, DecreaseChangeIntervalSlider, PreserveAspectRatio, IncreaseWeld speed, DecreaseWeld speed, Force weld, IncreaseSafetyDetach, DecreaseSafetyDetach, ShareInertiaTensor, AddRotorTopPart, AddMediumRotorTopPart, AddSmallRotorTopPart, AddHingeTopPart, AddMediumHingeTopPart, AddSmallHingeTopPart, Reverse, Detach, Attach, RotorLock, RotorLock_On, RotorLock_Off, HingeLock, HingeLock_On, HingeLock_Off, IncreaseTorque, DecreaseTorque, IncreaseBrakingTorque, DecreaseBrakingTorque, IncreaseVelocity, DecreaseVelocity, ResetVelocity, RotateToAngle, SetVelocity, IncreaseLowerLimit, DecreaseLowerLimit, SetLowerLimit, IncreaseUpperLimit, DecreaseUpperLimit, SetUpperLimit, IncreaseDisplacement, DecreaseDisplacement


--->