<script setup>
  import FlightPlanAnimation from '../../../components/MotherAutopilotSystem/FlightPlanAnimation.vue';
</script>

# Mother Autopilot System (MAPS)

![Static Badge](https://img.shields.io/badge/version-0.1.0-blue?color=green) [![Static Badge](https://img.shields.io/badge/Steam%20Workshop-2b3645?logo=steam)](https://steamcommunity.com/sharedfiles/filedetails/?id=3724504005)



Mother Autopilot System (MAPS) is a powerful and versatile autopilot system designed to expand the capabilities of grids running scripts built with [Mother Core](../Framework/README.md) like [Mother OS](../IngameScript/IngameScript.md). It will automatically detect and integrate with other scripts built with Mother Core, allowing you to share commands across your programmable blocks seamlessly.

::: warning Alpha Development
MAPS is currently in Alpha and is subject to change at any time. I will try my best to make graceful changes to player commands to ease ongoing use.
:::

<FlightPlanAnimation />

::: warning
MAPS is compatible with scripts running [Mother Core](../Framework/README.md) v1.1.0 or later. If you are using an older version of Mother Core, please update to the latest version to ensure compatibility.
:::

## Features

- **Flight Planning and Visualization** - Leverage the existing GPS system and Remote Control block to program and [fly flight plans dynamically](../MotherAutopilotSystem//Modules/FlightPlanningModule.md#flight-planning).


## Upcoming Features

### Autodocking
<Badge type="info" text="&nbsp;Beta&nbsp;" vertical="middle" />

Automatic docking between grids is now supported with the [`dock`](../MotherAutopilotSystem/Modules/DockingModule.md#dock) command. Docking is stable in some scenarios and I am continuing to tune it.  Mother OS uses several fail safes to ensure unstable docking procedures are aborted. Undocking is in development before calling this feature complete.

**Objective** 

Enable players to intitate and fly docking sequences automatically using intergrid communication and flight planning.
