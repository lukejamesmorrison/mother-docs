# Rotor Module
The rotor module allows the user to control rotors on the grid.  Rotors are particularly vulnerable to phantom forces and the Almighty Clang, so we leverage the Activity Monitor to ensure rotors are stopped and locked when not in use. Players can simply define an angle and speed of rotation without worrying about direction, upper/lower limits, or the grid ripping itself apart.

[[toc]]

## Commands

### rotor/rotate
Rotate a rotor or group of rotors to a specific angle between -360 and 360 degrees. 
```
rotor/rotate <Rotor|Group> <Angle> [--options]
```

Options
| Option  | Values     | Unit | Description                                                                             |
| ------- | ---------- | ---- | -------------------------------------------------------------------                     |
| `speed` | [-5.0, 5.0] | RPM  | Set the speed of the rotor. Negative values will reverse the hinge. Default is 1 RPM. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided angle should be *added* to the current angle. Allows incremental changes to angle. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided angle should be *subtracted* from the current angle. Allows decremental changes to angle. |

**Example**
Set the antenna rotor to 90 degrees with a speed of 2.5 RPM:
```bash title="Terminal"
rotor/rotate AntennaRotor 90 --speed=2.5;
```

Increase the angle of the antenna rotor by 45 degrees:
```bash title="Terminal"
hinge/rotate LandingGearHinge 45 --add;
```

### rotor/lock
Lock a rotor or group of rotors.
```
rotor/lock <Rotor|Group>
```

**Example**
```bash title="Terminal"
rotor/lock AntennaRotor;
```

### rotor/unlock
Unlock a rotor or group of rotors.
```
rotor/unlock <Rotor|Group>
```

**Example**
```bash title="Terminal"
rotor/unlock AntennaRotor;
```

### rotor/reset
Reset a rotor or group of rotors to their original position (0 degrees).
```
rotor/reset <Rotor|Group>
```

**Example**
```bash title="Terminal"
rotor/reset AntennaRotor;
```

### rotor/speed
Set the speed of a rotor or group of rotors in RPM.
```
rotor/speed <Rotor|Group> <Speed> <Options>
```

Options
| Option  | Values     | Unit | Description                                                         |
| ------- | ---------- | ---- | ------------------------------------------------------------------- |
| `free`  | `true`, `false` | `bool `    | Indicates whether the rotor should be free to rotate or not. Default is `false`. |
| `add` | `true`, `false` | `bool`  | Indicates that the provided speed should be *added* to the current speed. Allows incremental changes to speed. |
| `sub` | `true`, `false` | `bool`  | Indicates that the provided speed should be *subtracted* from the current speed. Allows decremental changes to speed. |

**Example**

Set speed to 2 RPM and allow rotor to rotate freely:

```bash title="Terminal"
rotor/speed AntennaRotor 2 --free;
```

Increase speed by 2.5 RPM:

```bash title="Terminal"
rotor/speed AntennaRotor 2.5 --add;
```

Decrease speed by 1 RPM:

```bash title="Terminal"
rotor/speed AntennaRotor 1 --sub;
```

