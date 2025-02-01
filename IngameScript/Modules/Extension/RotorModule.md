# Rotor Module

The rotor module allows the user to control rotors on the grid.  Rotors are particularly vulnerable to phantom forces and the Almighty Clang, so we leverage the Activity Monitor to ensure rotors are stopped and locked when not in use. Players can simply define an angle and speed of rotation without worrying about direction, upper/lower limits, or the grid ripping itself apart.

## Commands

### rotate
Rotate a rotor or group of rotors to a specific angle between -360 and 360 degrees. 
```
rotor/rotate <Rotor|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `speed` | -5.0 - 5.0 | RPM  | Set the speed of the rotor. Negative values will reverse the rotor. Default is 1 RPM. |

### lock
Lock a rotor or group of rotors.
```
rotor/lock <Rotor|Group>
```
<!-- Options
| Option | Values |Unit| Description |
| --- | --- | -- |-- |
| `stop` | **false**, true | bool | Set the rotor's velocity to 0 when locking. | -->

### unlock
Unlock a rotor or group of rotors.
```
rotor/unlock <Rotor|Group>
```

### reset
Reset a rotor or group of rotors to their original position (0 degrees).
```
rotor/reset <Rotor|Group>
```

### speed
Set the speed of a rotor or group of rotors in RPM.
```
rotor/speed <Rotor|Group> <Speed>
```
