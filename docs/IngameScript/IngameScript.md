---
next: /IngameScript/Installation.md
---

<script setup lang="ts">
// import NavbarLink from '/.vuepress/components/NavbarLink.vue';
// import FeatureCard from '/.vuepress/components/FeatureCard.vue';
// import CardGroup from '/.vuepress/components/CardGroup.vue';
import { useClientData } from 'vuepress/client'
import { usePageData } from 'vuepress/client'

// const {
//   pageData,
// //   pageFrontmatter,
// //   pageHead,
// //   pageHeadTitle,
// //   pageLang,
// //   routeLocale,
//   siteData,
// } = useClientData()

// const {siteData} = useSiteData()

</script>

<!-- {{ $site.dev }} -->
<!-- {{pageData}} -->
<!-- {{ __VUEPRESS_VERSION__ }} -->

# Mother OS (Ingame Script)

<!-- [< Home](../README.md) -->
<Badge type="info" text="&nbsp;Beta&nbsp;" vertical="middle" />
<Badge type="warning" text="&nbsp;v0.2.14&nbsp;" vertical="middle" />

Mother OS is available as an ingame script for Programmable Blocks in Space Engineers. It interoperates seamlessly with Timer Blocks and Event Controllers to augment existing automations. Start by [installing Mother OS here](./Installation.md).

```bash title="Terminal"
# Set the color of a light
light/color AirlockLight red;

# Rotate a hinge group to an angle with a speed
hinge/rotate MainLandingGearHinges 45 --speed=2;

# Open a hangar door remotely
@Mothership door/open MainHangarDoor; 
```

Players can use this simple command syntax to take their automation to the next level.

::: tip
Using Mother OS does not require any programming/coding experience.
:::

[[toc]]

## Features
<br>

- **Secure Intergrid Communication** - Grids [share positions](Modules/Core/Almanac.md) and easy easily send commands remotely to each other.
  
- **Expanded Automation** - Mother simplifies interacting with the mechanical systems on your grid, and monitors them for changes. See the [Command Cheatsheet](CommandCheatsheet.md).
  
- **Flight Planning and Visualization** - Leverage the existing GPS system and Remote Control block to program and [fly flight plans dynamically](Modules/Extension/FlightPlanningModule.md#flight-planning).
  
- **Copy Automations with Ease** - Easily port your automations from one grid to another by copying `Custom Data` text.

::: warning
Mother is in beta development. I'm on a quest to reduce the character count, and increase the functionality. Please report any issues you encounter, and expect some of the commands and underlying framework to change.
:::
<br>

**Tutorial Video**

[![Tutorial Video](https://img.youtube.com/vi/CgA6k1xQfVE/0.jpg)](https://www.youtube.com/watch?v=CgA6k1xQfVE)


### Upcoming Features

#### Autodocking
<Badge type="info" text="&nbsp;Beta&nbsp;" vertical="middle" />

Automatic docking between grids is now supported with the [`dock`](./Modules/Extension/DockingModule.md#dock) command. Docking is stable in some scenarios and I am continuing to tune it.  Mother OS uses several fail safes to ensure unstable docking procedures are aborted. Undocking is in development before calling this feature complete.

**Objective** 

Enable players to intitate and fly docking sequences automatically using intergrid communication and flight planning.

#### Master-Node Architecture
<Badge type="warning" text="&nbsp;In development&nbsp;" vertical="middle" />

**Objective** 

Allow multiple programmable blocks running Mother Core to cooperate on the same grid. This will enable more complex automations and distributed processing. Script developers will build on top of Mother Core to interoperate with Mother OS via this paradigm.

---

Get started by [installing Mother OS](./Installation.md) as an ingame script into a programmable block on your grid.