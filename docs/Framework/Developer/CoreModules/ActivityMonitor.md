# Activity Monitor

[[toc]]

## Overview
The Activity Monitor's primary role is to track blocks that are changing continuously (ie. rotor moving to angle). Each program cycle, the activity monitor checks the state of each registered block, then unregisters it when the terminal state has been reached.

## Registering a Block

To register a block, use the `RegisterBlock()` method. It takes the target block (`IMyTerminalBlock`) as it's first parameter.  The second parameters is a function that determines if the block is at its terminal state (`bool`). The third parameter is an `Action` that will be executed when the terminal state is reached.

```csharp title="HingeModule.cs"

public class HingeModule : BaseExtensionModule
{
    public void StartRotation(float targetAngle)
    {
        IMyMotorStator hinge = Mother.GetBlocksByName<IMyMotorStator>("Main Hinge").FirstOrDefault();

        Mother.GetModule<ActivityMonitor>().RegisterBlock(
            // The hinge block to monitor
            hinge,
            // Function to check if the hinge is at its terminal position
            block => HingeAtTerminalPosition(block as IMyMotorStator, targetAngle),
            // Action to execute when the hinge reaches its terminal position
            block => LockHinge(block as IMyMotorStator, true)
        );
    }
}
```

## Unregistering a Block

If you wish to unregister a block before it has reached its terminal state, you can use the `UnregisterBlock()` method to stop monitoring immediately.

```csharp title="HingeModule.cs"
public class HingeModule : BaseExtensionModule
{
    public void StopRotation()
    {
        IMyMotorStator hinge = Mother.GetBlocksByName<IMyMotorStator>("Main Hinge").FirstOrDefault();

        // Stop hinge motion and lock it
        hinge.TargetVelocityRPM = 0;
        hinge.RotorLock = true;

        // Stop monitoring the hinge
        Mother.GetModule<ActivityMonitor>().UnregisterBlock(hinge);
    }
}
```