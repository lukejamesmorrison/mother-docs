# Examples

Let's look at some examples and how Mother simplifies them. See the [Command Cheatsheet](CommandCheatsheet.md) for a complete list of available commands.

1. [Drill Deployment](#drill-deployment)
2. [Welder Arm Actuation](#welder-arm-actuation)
3. [Multi-destination Flight Automation](#multi-destination-flight-automation)

## Drill Deployment

In our drill deployment we want to:

1. Open a hatch connected by a hinge (`DrillHinge`)
2. Rotate a rotor (`DrillRotor`) to 65 degrees
3. Begin extending piston (`DrillPiston`) to a specific distance, at a specific speed

Lets break this down into a routine:
```bash
# Open the hatch (move to zero degrees)
hinge/rotate DrillHinge 0;
# Rotate the rotor to 65 degrees
rotor/rotate DrillRotor 65;
# Extend the piston to 10 meters, at 0.2 m/s
piston/distance DrillPiston 10 --speed=0.2;
```

Putting these together, you can create a routine by adding the following to the `[Commands]` section of the grid's **CustomData**.


```bash
[Commands]
# We can take advantage of the multi-line syntax
deploy-drill=
| hinge/rotate DrillHinge 0;
| rotor/rotate DrillRotor 65;
| piston/distance DrillPiston 10 --speed=0.2;
```

Now we can run the Programmable Block with the argument `deploy-drill` and your system should begin to operate. This can easily be assigned to a button now.

> Don't forget to `Recompile` Mother when you update the **CustomData** in the Programmable Block.

## Welder Arm Actuation

As you begin building larger grids, it is likely that you will create a dedicated grid for welding.  One method to increase productivity is to mount forward-facing welders on hinges, to simplify welding up, down or forward. Though we can achieve this with the `Rotate to Angle` action released with the Signals update, the process to update these automations is still laborious via game menus.  Let's take a look at a simple implementation with Mother:

We want our welder arm to actuate to the following angles:

- 90 degrees (up)
- 45 degrees
- 0 degrees (fwd)
- -45 degrees
- -90 degrees (down)

Let's set these as custom commands within the Programmable Block's **CustomData**:
```bash
[Commands]
hinges90=hinge/rotate "WelderHinges" 90 --speed=3
hinges45=hinge/rotate "WelderHinges" 45 --speed=3
hinges0=hinge/rotate "WelderHinges" 0 --speed=3
hinges-45=hinge/rotate "WelderHinges" -45 --speed=3
hinges-90=hinge/rotate "WelderHinges" -90 --speed=3
```

Now, we can run the programmable block with the argument `hinges90` to actuate the welder arm to 90 degrees, `hinges45` to actuate to 45 degrees, etc.  This can easily be assigned to a button or toolbar action using the `Run` action.  Also note that we can customize the speed of rotation via a command option. See the [Hinge Module](Modules/Extension/HingeModule.md) for more information.

> Don't forget to `Recompile` Mother when you update the **CustomData** in the Programmable Block.


## Multi-destination Flight Automation

As resource demands rise, you will innevitibly mark locations with GPS points for future reference.  To fly to these points automatically, we must either create one AI Flight block per waypoint/route, or go into the AI block's menu, and manually update the preferred waypoint before enabing autopilot.  This is a cumbersome process, especially if you have many waypoints to visit. Mother allows you to create commands for each of these waypoints, and then simply trigger them with a button press, requiring only the Programmable Block running Mother, and a Remote Control block.

Our GPS waypoints:

1. `GPS:Iron#1:1023697:182968.67:1599556.3:#FF75C9F1:`
2. `GPS:Ice#1:1023697:182968.67:1599556.3:#FF75C9F1:`
3. `GPS:Silicon#1:1023763.18:183342.72:1600143.03:#FF75C9F1:`

**Note**: We are using the GPS waypoint string, which you can get by copying the waypoint to your clipboard via the `GPS` tab.

Let's create a routine to fly to each waypoints In the progammable block's **CustomData**. We can take advantage of the `fcs/start` command to enable autopilot:

```bash
[Commands]
fe1=
| nav/set-flight-plan "GPS:Iron#1:1023697:182968.67:1599556.3:#FF75C9F1:";
| fcs/start --speed=100;

ice1=
| nav/set-flight-plan "GPS:Ice#1:1023697:182968.67:1599556.3:#FF75C9F1:";
| fcs/start --speed=100;

si1=
| nav/set-flight-plan "GPS:Silicon1:1023763.18:183342.72:1600143.03:#FF75C9F1:";
| fcs/start --speed=100;
```

Now, we can run Mother with the argument `fe1` to automatically begin flying to our iron vein, `ice1` to begin flying towards ice, or `si1` to fly to silicon.  This is a much more intuitive way to control your ship than the base game's AI block. You can even create waypoints above your home base's docks to enable autopiloted return trips. Now we can easily tweak where the grid flies, how fast, etc. from a central location. 

> Don't forget to `Recompile` Mother when you update the **CustomData** in the Programmable Block.


<!-- ## Positioning a Satellite Network
TBD

## Docking Sequence
TBD

## Increase/Decrease Speed
TBD

## Automating a Cargo Route
TBD -->



