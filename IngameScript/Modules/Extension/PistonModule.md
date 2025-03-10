# Piston Module
[< Modules](../Modules.md)

The piston module allows the user to control pistons on the grid.  Pistons are particularly vulnerable to phantom forces and the Almighty Clang, so we leverage the Activity Monitor to ensure pistons are stopped when not in use. Players can simply define a distance and speed without worrying about upper/lower limits.

## Commands

### distance
Extend or retract a piston to a specific distance between 0 and `Max` meters.
```
piston/distance <Piston|Group> <Distance> [--options]
```

> [!NOTE]
> Small grid pistons have a maximum distance of 2 meters, while large grid pistons have a maximum distance of 10 meters.

### stop
Stop a piston while in motion. Note that pistons do not lock like a Rotor or Hinge.
```
piston/stop <Piston|Group>
```

### reset
Reset a piston to its original position (0 meters).
```
piston/reset <Piston|Group>
```


<!--- 

PISTON ACTIONS


Add Top Part
DecreaseChangeIntervalSlider
DecreaseFontSize
DecreaseLowerLimit
DecreaseMaxImpulseAxis
DecreaseMaxImpulseNonAxis
DecreaseSafetyDetach
DecreaseTextPaddingSlider
DecreaseUpperLimit
DecreaseVelocity
DecreaseWeld speed
Extend
Force weld
IncreaseChangeIntervalSlider
IncreaseFontSize
IncreaseLowerLimit
IncreaseMaxImpulseAxis
IncreaseMaxImpulseNonAxis
IncreaseSafetyDetach
IncreaseTextPaddingSlider
IncreaseUpperLimit
IncreaseVelocity
IncreaseWeld speed
OnOff
OnOff_Off
OnOff_On
PreserveAspectRatio
ResetVelocity
Retract
Reverse
SetAndMove
SetVelocity
ShareInertiaTensor
ShowOnHUD
ShowOnHUD_Off
ShowOnHUD_On



--->

<!--- markdown table with columns for subsequent parameters and options --->

<!---
Labels are uneccesary but may be added as the last parameter.


| Action							| Param 1	| Param 2	| Param 3 | Param 4 | Param 5 |
|-----------						|---------	|---------	|---------|---------|---------|
| "Add Top Part"					|			|			|         |         |         |
| DecreaseChangeIntervalSlider		|			|			|         |         |         |
| DecreaseFontSize					|			|			|         |         |         |
| DecreaseLowerLimit				|			|			|         |         |         |
| DecreaseMaxImpulseAxis			|			|			|         |         |         |
| DecreaseMaxImpulseNonAxis			|			|			|         |         |         |
| DecreaseSafetyDetach				|			|			|         |         |         |
| DecreaseTextPaddingSlider			|			|			|         |         |         |
| DecreaseUpperLimit				|			|			|         |         |         |
| DecreaseVelocity					|			|			|         |         |         |
| DecreaseWeld speed				|			|			|         |         |         |
| Extend							|			|			|         |         |         |
| Force weld						|			|			|         |         |         |
| IncreaseChangeIntervalSlider		|			|			|         |         |         |
| IncreaseFontSize					|			|			|         |         |         |
| IncreaseLowerLimit				|			|			|         |         |         |
| IncreaseMaxImpulseAxis			|			|			|         |         |         |
| IncreaseMaxImpulseNonAxis			|			|			|         |         |         |
| IncreaseSafetyDetach				|			|			|         |         |         |
| IncreaseTextPaddingSlider			|			|			|         |         |         |
| IncreaseUpperLimit				|			|			|         |         |         |
| IncreaseVelocity					|			|			|         |         |         |
| IncreaseWeld speed				|			|			|         |         |         |
| OnOff								|			|			|         |         |         |
| OnOff_Off							|			|			|         |         |         |
| OnOff_On							|			|			|         |         |         |
| PreserveAspectRatio				|			|			|         |         |         |
| ResetVelocity						|			|			|         |         |         |
| Retract							|			|			|         |         |         |
| Reverse							|			|			|         |         |         |
| SetAndMove						| distance (1.2)		| velocity (2.5)		|  Label    |         |         |
| SetVelocity						| velocity (+/-2.5)			|			|         |         |         |
| ShareInertiaTensor				|			|			|         |         |         |
| ShowOnHUD							|			|			|         |         |         |
| ShowOnHUD_Off						|			|			|         |         |         |
| ShowOnHUD_On						|			|			|         |         |         |
--->