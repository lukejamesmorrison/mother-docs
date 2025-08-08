# Activity Monitor
<!-- [< Modules](../Modules.md) -->

The Activity Monitor enables Mother to monitor and manage functional blocks across cycles. It monitor the progress of an operation, and takes action when the operation is complete, like a rotor rotating to a position and locking afterwards.

[[toc]]


## Why Do We Need It?
 Consider a rotor movement. The in-game interface required us to set the velocity, and upper and lower limits of rotation through a series of menus. We then must wait for the rotor to reach the desired angle, and stop/lock it using a Timer Block delay based on its speed of rotation.  This is a cumbersome process to set up via the user interface, and it is difficult to ensure that the rotor will stop at the correct angle without side effects, especially when part of a group. You're at the mercy of Clang.

The Activity Monitor allows us to start a rotor in motion, monitor its progress, and stop and lock it at the desired angle.

```bash title="Terminal"
# Rotate rotor to 125 degrees at 0.2 RPM
rotor/rotate Rotor1 125 --speed=0.2
```
Pretty slick. It also works with groups.

```bash title="Terminal"
# Rotate rotor group to 125 degrees at 0.2 RPM
rotor/rotate "Rotor Group 1" 125 --speed=0.2
```

## How Does It Work?

When a functional block starts an operation it registers with the Activity Monitor. The Activity Monitor then begins monitoring the block while it moves. When the operation is complete, the Activity Monitor will stop monitoring the block, and call a terminal action - in the case of a rotor, it will stop and lock by default.