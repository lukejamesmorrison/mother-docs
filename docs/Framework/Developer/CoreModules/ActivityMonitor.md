# Activity Monitor

## Overview
The activity monitor's primary role is to track blocks that are changing continuously (ie. rotor moving to angle). Each program cycle, the activity monitor checks the state of each registered block, then unregisters it when the terminal state has been reached.

## Registering a Block