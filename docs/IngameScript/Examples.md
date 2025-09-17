# Examples

<!-- [< Modules](Modules/Modules.md) -->

Let's look at some examples and how Mother simplifies them. See the [Command Cheatsheet](CommandCheatsheet.md) for a complete list of available commands.

1. [Autoclosing Door](#autoclosing-door)
2. [Drill Deployment](#drill-deployment)
3. [Welder Arm Actuation](#welder-arm-actuation)
4. [Multi-destination Flight Automation](#multi-destination-flight-automation)
5. [Dispatch Ship to a Landing Site via a Flight Plan](#dispatch-ship-to-a-landing-site-via-a-flight-plan)
6. [Building a Landing Pad](#building-a-landing-pad)

## Autoclosing Door

I always try to ensure my doors close themselves.  This preserves atmosphere in my spacecraft and stations.  You *could* download another script or mod focused on this, or you could use this simple [hook](../IngameScript/Modules/Extension/DoorModule.md#hooks) on your door to easily customize how long it should wait before closing.  This also allows you to do follow-on actions like change a light color:

```ini title="Airlock Door > Custom Data"
[hooks]
onClose=
| wait 5; 
| door/close this;
| light/color AirlockLight green;
```

:::tip
You can use the `this` keyword to target the current block, rather than using its name.
:::

## Drill Deployment

In our drill deployment we want to:

1. Open a hatch connected by a hinge (`DrillHinge`)
2. Rotate a rotor (`DrillRotor`) to 65 degrees
3. Begin extending piston (`DrillPiston`) to a specific distance, at a specific speed

Lets break this down into a routine:
```bash title="Mother > Custom Data"
# Open the hatch (move to zero degrees)
hinge/rotate DrillHinge 0;
# Rotate the rotor to 65 degrees
rotor/rotate DrillRotor 65;
# Extend the piston to 10 meters, at 0.2 m/s
piston/distance DrillPiston 10 --speed=0.2;
```

Putting these together, you can create a routine by adding the following to the `[Commands]` section of the grid's **Custom Data**.


```ini title="Mother > Custom Data"
[Commands]

; We can take advantage of the multi-line syntax
DeployDrill=
| hinge/rotate DrillHinge 0;
| rotor/rotate DrillRotor 65;
| piston/distance DrillPiston 10 --speed=0.2;
```

Now we can run the Programmable Block with the argument `DeployDrill` and your system should begin to operate. This can easily be assigned to a button now.

::: important
Don't forget to run the`boot` command when you update the Custom Data in the Programmable Block.
:::

## Welder Arm Actuation

As you begin building larger grids, it is likely that you will create a dedicated grid for welding.  One method to increase productivity is to mount forward-facing welders on hinges, to simplify welding up, down or forward. Though we can achieve this with the `Rotate to Angle` action released with the Signals update, the process to update these automations is still laborious via game menus.  Let's take a look at a simple implementation with Mother:

We want our welder arm to actuate to the following angles:

- 90 degrees (up)
- 45 degrees
- 0 degrees (fwd)
- -45 degrees
- -90 degrees (down)

Let's set these as custom commands within the Programmable Block's **Custom Data**:

```ini title="Mother > Custom Data"
[Commands]

hinges90=hinge/rotate "WelderHinges" 90 --speed=3;
hinges45=hinge/rotate "WelderHinges" 45 --speed=3;
hinges0=hinge/rotate "WelderHinges" 0 --speed=3;
hinges-45=hinge/rotate "WelderHinges" -45 --speed=3;
hinges-90=hinge/rotate "WelderHinges" -90 --speed=3;
```

Now, we can run the programmable block with the argument `hinges90` to actuate the welder arm to 90 degrees, `hinges45` to actuate to 45 degrees, etc.  This can easily be assigned to a button or toolbar action using the `Run` action.  Also note that we can customize the speed of rotation via a command option. See the [Hinge Module](Modules/Extension/HingeModule.md) for more information.

::: important
Don't forget to run the`boot` command when you update the Custom Data in the Programmable Block.
:::

## Automatically Flying to a Resource Node

As resource demands rise, you will innevitibly mark locations with GPS points for future reference.  To fly to these points automatically, we must either create one AI Flight block per waypoint/route, or go into the AI block's menu, and manually update the preferred waypoint before enabing autopilot.  This is a cumbersome process, especially if you have many waypoints to visit. Mother allows you to create commands for each of these waypoints, and then simply trigger them with a button press, requiring only the Programmable Block running Mother, and a Remote Control block.

Our GPS waypoints:

1. `GPS:Iron#1:1023697:182968.67:1599556.3:#FF75C9F1:`
2. `GPS:Ice#1:1023697:182968.67:1599556.3:#FF75C9F1:`
3. `GPS:Silicon#1:1023763.18:183342.72:1600143.03:#FF75C9F1:`

::: note
We are using the GPS waypoint string, which you can get by copying the waypoint to your clipboard via the `GPS` tab.
:::

Let's create a routine to fly to each waypoints In the progammable block's **Custom Data**. We can take advantage of the `fcs/start` command to enable autopilot:

```ini title="Mother > Custom Data"
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

::: important
Don't forget to run the`boot` command when you update the Custom Data in the Programmable Block.
:::


## Dispatch Ship to a Landing Site via a Flight Plan

Mother allows players to queue commands for execution from within the flight plan string.  This allows players to change aircraft configuration and behavior at each waypoint.  Let's look at an example where we dispatch a ship to a landing site, and change the ship's configuration at each waypoint using the familiar `routine` sytnax.

Our routine:
```ini title="Mother > Custom Data"
FlyToLandingSite=
| nav/set-flight-plan
| "
|     { door/close MainDoor; light/blink SignalLights med; }
|
|     GPS:MothershipExit:226963.8:226982.08:227068.34:#FF75C9F1: 
|     { ExtendWings; light/blink SignalLights off; block/off BoosterThrusters; }
|
|     GPS:HyperionOutpost:227001.34:227004.02:227021.9:#FF75C9F1: 
|
|     GPS:LandingSite:227081.47:226948.41:227068.73:#FF75C9F1:
|     { fcs/start --speed=10; RectractWings; light/blink SignalLights med; }
| ";
| fcs/start --speed=5;
```

We can see 4 distinct steps in the flight plan. We will omit the pipe `|` character for ease of readibility in this example. Terms must always we separated by a space ` `.

```bash title="Mother > Custom Data"
# preflight
{ door/close MainDoor; light/blink SignalLights med; }

## first wayoint
GPS:MothershipExit:226963.8:226982.08:227068.34:#FF75C9F1:
 { ExtendWings; light/blink SignalLights off; block/off BoosterThrusters; }

## second waypoint
GPS:HyperionOutpost:227001.34:227004.02:227021.9:#FF75C9F1:

## final waypoint
GPS:LandingSite:227081.47:226948.41:227068.73:#FF75C9F1:
 { fcs/start --speed=10; RectractWings; light/blink SignalLights med; }
```

### Preflight

The preflight is run as soon as the `nav/set-flight-plan` command is executed. We can see that we are closing our `MainDoor` door block, and blinking our `SignalLights` - safety first.

```bash title="Mother > Custom Data"
{ door/close MainDoor; light/blink SignalLights med; }
```

### Waypoints

At the `MothershipExit` GPS waypoint we want to extend our wings with our custom command `ExtendWings`, and also turn off our `BoosterThrusters` group.

```bash title="Mother > Custom Data"
GPS:MothershipExit:226963.8:226982.08:227068.34:#FF75C9F1: 
 { ExtendWings; light/blink SignalLights off; block/off BoosterThrusters; }
```

There is no routine defined at the `HyperionOutpost` waypoint so we simply fly to it before proceeding to the `LandingSite`.

As we approach the `LandingSite`, we will slow down, and retract our wings. We can do this by setting the speed to 10 m/s, and calling our `RetractWings` command.

```bash title="Mother > Custom Data"
GPS:LandingSite:227081.47:226948.41:227068.73:#FF75C9F1:
 { fcs/start --speed=10; RectractWings; light/blink SignalLights med; }
```

## Building a Landing Pad

<iframe width="560" height="315" src="https://www.youtube.com/embed/CgA6k1xQfVE?si=6oLQbFLQXZbGIj8i" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



<!-- ## Positioning a Satellite Network
TBD

## Docking Sequence
TBD

## Increase/Decrease Speed
TBD

## Automating a Cargo Route
TBD -->



