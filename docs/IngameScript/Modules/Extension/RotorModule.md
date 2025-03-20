# Rotor Module
The rotor module allows the user to control rotors on the grid.  Rotors are particularly vulnerable to phantom forces and the Almighty Clang, so we leverage the Activity Monitor to ensure rotors are stopped and locked when not in use. Players can simply define an angle and speed of rotation without worrying about direction, upper/lower limits, or the grid ripping itself apart.

[[toc]]

## Commands

### rotate
Rotate a rotor or group of rotors to a specific angle between -360 and 360 degrees. 
```
rotor/rotate <Rotor|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                                             |
| ------- | ---------- | ---- | -------------------------------------------------------------------                     |
| `speed` | -5.0 - 5.0 | RPM  | Set the speed of the rotor. Negative values will reverse the rotor. Default is 1 RPM.   |

**Example**
```bash title="Terminal"
rotor/rotate AntennaRotor 90 --speed=2.5;
```

### lock
Lock a rotor or group of rotors.
```
rotor/lock <Rotor|Group>
```

**Example**
```bash title="Terminal"
rotor/lock AntennaRotor;
```

### unlock
Unlock a rotor or group of rotors.
```
rotor/unlock <Rotor|Group>
```

**Example**
```bash title="Terminal"
rotor/unlock AntennaRotor;
```

### reset
Reset a rotor or group of rotors to their original position (0 degrees).
```
rotor/reset <Rotor|Group>
```

**Example**
```bash title="Terminal"
rotor/reset AntennaRotor;
```

### speed
Set the speed of a rotor or group of rotors in RPM.
```
rotor/speed <Rotor|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `add` |  |   | Indicates that the provided speed should be *added* to the current speed. Allows increment speed changes while in motion. |
| `sub` |  |   | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental speed changes while in motion. |

**Example**

Set speed to 2 RPM:

```bash title="Terminal"
rotor/speed AntennaRotor 2;
```

Increase speed by 2.5 RPM:

```bash title="Terminal"
rotor/speed AntennaRotor 2.5 --add;
```

Decrease speed by 1 RPM:

```bash title="Terminal"
rotor/speed AntennaRotor 1 --sub;
```

