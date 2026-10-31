# Examples

<!-- [< Modules](Modules/Modules.md) -->

Let's look at some examples and how Mother simplifies them. See the [Cheatsheet](../Cheatsheet.md) for a complete list of available commands.

- [Examples](#examples)
  - [Sending a Simple Remote Command](#sending-a-simple-remote-command)
  - [Autoclosing Door](#autoclosing-door)
  - [Drill Deployment](#drill-deployment)
  - [Welder Arm Actuation](#welder-arm-actuation)
  - [Automatically Flying to a Resource Node](#automatically-flying-to-a-resource-node)
  - [Dispatch Ship to a Landing Site via a Flight Plan](#dispatch-ship-to-a-landing-site-via-a-flight-plan)
    - [Preflight](#preflight)
    - [Waypoints](#waypoints)
  - [Conditional Logic](#conditional-logic)
    - [Airlock](#airlock)
    - [Landing Lights](#landing-lights)
    - [Parking](#parking)
    - [Space Transition](#space-transition)
    - [Docking](#docking)
    - [Low Power](#low-power)
    - [Menu Toggle](#menu-toggle)
    - [Confirm Menu](#confirm-menu)
  - [Building a Landing Pad](#building-a-landing-pad)

## Sending a Simple Remote Command

Remote commands are really straight forward! Let's change some lights - we are `Marco`:

```ms title="Marco > Terminal"
; Set the remote grid's lights to red (common Mother command)
@Polo light/color Lights red;

; Run a command defined on this grid (Marco has command defined)
@Polo ShutdownLights;

; Run a command defined on the remote grid using the underscore 
; _ prefix (Polo has the command defined)
@Polo _ShutdownLights;
```

## Autoclosing Door

I always try to ensure my doors close themselves.  This preserves atmosphere in my spacecraft and stations.  You *could* download another script or mod focused on this, or you could use this simple [hook](../IngameScript/Modules/Extension/DoorModule.md#hooks) on your door to easily customize how long it should wait before closing.  This also allows you to do follow-on actions like change a light color:

```ms title="Airlock Door > Custom Data"
[hooks]
onClose=
| wait 5; 
| door/close this;
| light/color AirlockLight green;
```

:::tip This keyword
You can use the `this` keyword to target the current block, rather than using its name.
:::

## Drill Deployment

In our drill deployment we want to:

1. Open a hatch connected by a hinge (`DrillHinge`)
2. Rotate a rotor (`DrillRotor`) to 65 degrees
3. Begin extending piston (`DrillPiston`) to a specific distance, at a specific speed

Lets break this down into a routine:
```ms title="Mother > Custom Data"
; Open the hatch (move to zero degrees)
hinge/rotate DrillHinge 0;
; Rotate the rotor to 65 degrees
rotor/rotate DrillRotor 65;
; Extend the piston to 10 meters, at 0.2 m/s
piston/distance DrillPiston 10 --speed=0.2;
```

Putting these together, you can create a routine by adding the following to the `[Commands]` section of the grid's **Custom Data**.


```ms title="Mother > Custom Data"
[commands]

; We can take advantage of the multi-line syntax
DeployDrill=
| hinge/rotate DrillHinge 0;
| rotor/rotate DrillRotor 65;
| piston/distance DrillPiston 10 --speed=0.2;
```

Now we can run the Programmable Block with the argument `DeployDrill` and your system should begin to operate. This can easily be assigned to a button now.

## Welder Arm Actuation

As you begin building larger grids, it is likely that you will create a dedicated grid for welding.  One method to increase productivity is to mount forward-facing welders on hinges, to simplify welding up, down or forward. Though we can achieve this with the `Rotate to Angle` action released with the Signals update, the process to update these automations is still laborious via game menus.  Let's take a look at a simple implementation with Mother:

We want our welder arm to actuate to the following angles:

- 90 degrees (up)
- 45 degrees
- 0 degrees (fwd)
- -45 degrees
- -90 degrees (down)

Let's set these as custom commands within the Programmable Block's **Custom Data**:

```ms title="Mother > Custom Data"
[commands]

hinges90=hinge/rotate "WelderHinges" 90 --speed=3;
hinges45=hinge/rotate "WelderHinges" 45 --speed=3;
hinges0=hinge/rotate "WelderHinges" 0 --speed=3;
hinges-45=hinge/rotate "WelderHinges" -45 --speed=3;
hinges-90=hinge/rotate "WelderHinges" -90 --speed=3;
```

Now, we can run the programmable block with the argument `hinges90` to actuate the welder arm to 90 degrees, `hinges45` to actuate to 45 degrees, etc.  This can easily be assigned to a button or toolbar action using the `Run` action.  Also note that we can customize the speed of rotation via a command option. See the [Hinge Module](Modules/Extension/HingeModule.md) for more information.

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

```ms title="Mother > Custom Data"
[commands]
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

## Dispatch Ship to a Landing Site via a Flight Plan

Mother allows players to queue commands for execution from within the flight plan string.  This allows players to change aircraft configuration and behavior at each waypoint.  Let's look at an example where we dispatch a ship to a landing site, and change the ship's configuration at each waypoint using the familiar `routine` sytnax.

Our routine:
```ms title="Mother > Custom Data"
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

```ms title="Mother > Custom Data"
; preflight
{ door/close MainDoor; light/blink SignalLights med; }

; first wayoint
GPS:MothershipExit:226963.8:226982.08:227068.34:#FF75C9F1:
 { ExtendWings; light/blink SignalLights off; block/off BoosterThrusters; }

; second waypoint
GPS:HyperionOutpost:227001.34:227004.02:227021.9:#FF75C9F1:

; final waypoint
GPS:LandingSite:227081.47:226948.41:227068.73:#FF75C9F1:
 { fcs/start --speed=10; RectractWings; light/blink SignalLights med; }
```

### Preflight

The preflight is run as soon as the `nav/set-flight-plan` command is executed. We can see that we are closing our `MainDoor` door block, and blinking our `SignalLights` - safety first.

```ms title="Mother > Custom Data"
{ door/close MainDoor; light/blink SignalLights med; }
```

### Waypoints

At the `MothershipExit` GPS waypoint we want to extend our wings with our custom command `ExtendWings`, and also turn off our `BoosterThrusters` group.

```ms title="Mother > Custom Data"
GPS:MothershipExit:226963.8:226982.08:227068.34:#FF75C9F1: 
 { ExtendWings; light/blink SignalLights off; block/off BoosterThrusters; }
```

There is no routine defined at the `HyperionOutpost` waypoint so we simply fly to it before proceeding to the `LandingSite`.

As we approach the `LandingSite`, we will slow down, and retract our wings. We can do this by setting the speed to 10 m/s, and calling our `RetractWings` command.

```ms title="Mother > Custom Data"
GPS:LandingSite:227081.47:226948.41:227068.73:#FF75C9F1:
 { fcs/start --speed=10; RectractWings; light/blink SignalLights med; }
```

## Conditional Logic

[Conditional logic](./ConditionalLogic.md) lets your construct react to the state of your blocks. Rules go in the `[rules]` section of the programmable block's Custom Data. Commands and menu entries can use `if` directly. Rules run when a condition changes, so a rule only fires when its condition goes from false to true, and its optional `else;` branch fires when it goes back to false. Replace the quoted block and group names with your own. Keep each rule to one job, and each command to one `if`, so they stay easy to read.

:::tip Mother GUI
Recipes that call `view/notify`, `view/go` or `view/back` need [Mother GUI](../MotherGUI/README.md) running on the same construct. Mother OS calls its commands automatically through construct-wide command sharing.
:::

### Airlock

Each command closes one door, checks that it worked, then cycles the vent and opens the other door. Two small rules act as an interlock, so both doors are never open at once, even if a player opens one by hand.

```ms title="Mother OS > Custom Data"
[variables]
SCREEN="Cockpit:1"
DOOR_INNER="Airlock Inner"
DOOR_OUTER="Airlock Outer"
VENT="Airlock Vent"

[commands]
; Close the inner door, empty the airlock, then open the outer door.
AirlockExit=
| door/close $DOOR_INNER;
| wait 2;
| if $DOOR_INNER closed;
|   vent/depressurize $VENT;
|   wait 5;
|   door/open $DOOR_OUTER;
| else;
|   view/notify $SCREEN "Inner door is blocked." --level=error;
| end;

; Close the outer door, fill the airlock, then open the inner door.
AirlockEnter=
| door/close $DOOR_OUTER;
| wait 2;
| if $DOOR_OUTER closed;
|   vent/pressurize $VENT;
|   wait 5;
|   door/open $DOOR_INNER;
| else;
|   view/notify $SCREEN "Outer door is blocked." --level=error;
| end;

[rules]
; Never leave both doors open.
InterlockOuter=
| when $DOOR_OUTER open;
|   door/close $DOOR_INNER;

InterlockInner=
| when $DOOR_INNER open;
|   door/close $DOOR_OUTER;
```

### Landing Lights

Turn the landing lights on when the ship drops below 100 m, and off again when it climbs. `--buffer=20` keeps the lights from flickering when you hover near 100 m, so they only switch off above 120 m. `altitude` has no value in space, so the lights stay off there.

```ms title="Mother OS > Custom Data"
[variables]
LIGHTS="Landing Lights"

[rules]
LandingLights=
| when grid altitude < 100 --buffer=20;
|   block/on $LIGHTS;
| else;
|   block/off $LIGHTS;
```

`altitude` is provided by [MAPS](../MotherAutopilotSystem/Modules/FlightControlModule.md#conditions). Mother OS can use it without any setup as long as MAPS runs on the same construct.

### Parking

When the landing gear locks, the batteries charge and the tanks stockpile. `--for=2` ignores a gear that bounces on touchdown. When the gear unlocks, everything goes back to normal.

```ms title="Mother OS > Custom Data"
[variables]
GEAR="Landing Gear"
BATTERIES=Batteries
TANKS="Hydrogen Tanks"

[rules]
Parked=
| when $GEAR locked --for=2;
|   battery/charge $BATTERIES;
|   tank/stockpile $TANKS;
| else;
|   battery/auto $BATTERIES;
|   tank/share $TANKS;
```

### Space Transition

Switch engine groups when the ship leaves a planet's gravity. Atmospheric thrusters do nothing in space, so turn them off and bring the hydrogen thrusters online, then reverse it on the way back in. `--for=3` stops the switch from firing while the ship skims the edge of the atmosphere.

```ms title="Mother OS > Custom Data"
[variables]
THRUSTERS_ATMOSPHERIC="Atmospheric Thrusters"
THRUSTERS_HYDROGEN="Hydrogen Thrusters"

[rules]
Atmosphere=
| when grid inspace --for=3;
|   block/off $THRUSTERS_ATMOSPHERIC;
|   block/on $THRUSTERS_HYDROGEN;
| else;
|   block/on $THRUSTERS_ATMOSPHERIC;
|   block/off $THRUSTERS_HYDROGEN;
```

`inspace` is only true when there is no gravity at all. To switch earlier, replace the condition with `when grid gravity < 2 --buffer=1 --for=3;` (gravity is in m/s², about 9.8 at 1 g).

`inspace`, `ingravity` and `gravity` are provided by MAPS, so the rule works in Mother OS or Mother GUI as long as MAPS runs on the same construct.

### Docking

React to the connector instead of writing a hook for every state. Once the ship is docked, charge the batteries and switch the thrusters off. When it leaves, go back to normal. `--for=2` ignores a connector that briefly connects while you manoeuvre.

```ms title="Mother OS > Custom Data"
[variables]
CONNECTOR=Dock
BATTERIES=Batteries
THRUSTERS="Hydrogen Thrusters"

[rules]
Docked=
| when $CONNECTOR connected --for=2;
|   battery/charge $BATTERIES;
|   block/off $THRUSTERS;
| else;
|   battery/auto $BATTERIES;
|   block/on $THRUSTERS;
```

A command can also check the connector before it does something. Here it locks only when the connector is in range, and reports when it is not.

```ms title="Mother OS > Custom Data"
[variables]
SCREEN="Cockpit:1"
CONNECTOR=Dock

[commands]
Dock=
| if $CONNECTOR connectable;
|   connector/lock $CONNECTOR;
| else;
|   view/notify $SCREEN "Not in range of a connector." --level=error;
| end;
```

### Low Power

Warn early, then save power when it gets critical. `low` and `critical` already include a built-in buffer, so these rules will not flicker. `--for=3` means the battery must stay low for three seconds first. Add `--at=25%` to `low` to warn at 25% instead of 20%.

```ms title="Mother OS > Custom Data"
[variables]
SCREEN="Cockpit:1"
BATTERIES=Batteries
SPOTLIGHTS=Spotlights

[rules]
LowBattery=
| when $BATTERIES low --for=3;
|   view/notify $SCREEN "Batteries low." --level=warning;
| else;
|   view/notify $SCREEN "Batteries recovered." --level=success;

PowerSaver=
| when $BATTERIES critical --for=3;
|   block/off $SPOTLIGHTS;
| else;
|   block/on $SPOTLIGHTS;
```

### Menu Toggle

Use `if` in a [Mother GUI](../MotherGUI/MenuView.md) menu entry to replace separate On and Off buttons with a single one. Because `on` and `off` are predicates for any functional block, this works for lights, doors, thrusters and more.

```ms title="Mother GUI > Custom Data"
[variables]
SCREEN="Cockpit:1"
HEADLIGHTS=Headlights

[menu:Lighting]
Toggle Headlights=
| if $HEADLIGHTS on;
|   block/off $HEADLIGHTS;
|   view/notify $SCREEN "Headlights off." --level=success;
| else;
|   block/on $HEADLIGHTS;
|   view/notify $SCREEN "Headlights on." --level=success;
| end;
```

### Confirm Menu

Ask before anything you cannot easily undo. A confirm menu is a normal menu with two entries. The entry that starts the action opens it with `view/go self`, and `--title` shows the question in the header. List `No` first for risky actions so the cursor starts on the safe choice, and use `view/back` to return to the previous menu.

```ms title="Mother GUI > Custom Data"
[variables]
SCREEN="Cockpit:1"
SYSTEMS="Non-Essential Systems"

[menu:Systems]
Power Down=
| view/go self ConfirmPowerDown --title="Power down?";

[menu:ConfirmPowerDown]
No, cancel=
| view/back;
Yes, power down=
| block/off $SYSTEMS;
| view/notify $SCREEN "Systems off." --level=success;
| view/back;
```

The same menu works for other actions such as purging storage or halting running routines. Point each action at its own confirm menu.

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



