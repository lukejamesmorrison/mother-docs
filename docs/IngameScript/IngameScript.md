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

<!-- <Badge type="info" text="&nbsp;Beta&nbsp;" vertical="middle" /> -->
![Static Badge](https://img.shields.io/badge/Version-1.3.0-blue?color=green) [![Static Badge](https://img.shields.io/badge/Steam%20Workshop-2b3645?logo=steam)](https://steamcommunity.com/sharedfiles/filedetails/?id=3411507973)


Mother OS is available as an ingame script for Programmable Blocks in Space Engineers. It interoperates seamlessly with Timer Blocks and Event Controllers to augment existing automations. Start by [installing Mother OS here](./Installation.md).

```ms title="Terminal"
; Set the color of a light
light/color AirlockLight red;

; Rotate a hinge group to an angle with a speed
hinge/rotate MainLandingGearHinges 45 --speed=2;

; Open a hangar door remotely
@Mothership door/open MainHangarDoor; 
```

Players can use this simple command syntax to take their automation to the next level.

::: tip
Using Mother OS does not require any programming/coding experience.
:::

[[toc]]

## Demo

Check out the [Nova Blade Mk1 (Steam Workshop)](https://steamcommunity.com/sharedfiles/filedetails/?id=3823300552) - designed as a demonstration aircraft for the synergy of Mother OS, [Mother GUI](../MotherGUI/README.md) and [Mother Autopilot System (MAPS)](./../MotherAutopilotSystem/README.md), all built using the [Mother Core](./Framework/README.md) framework for programmable block scripts in Space Engineers.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/UJhYhdJwrFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Features
<br>

- **Secure Intergrid Communication** - Grids [share positions](Modules/Core/Almanac.md) and easy easily send commands remotely to each other. Send commands to other grids easily with [remote commands](./Modules/Core/IntergridMessageService.md#sending-a-remote-command).
  
- **Expanded Automation** - Mother OS simplifies interacting with the mechanical systems on your grid, and monitors them for changes. See the [Cheatsheet](../Cheatsheet.md).
  
- **Copy Automations with Ease** - Easily port your automations from one grid to another by copying `Custom Data` text.

- **Styled and Automatic Displays** - Print styled text to screens with [`screen/print`](Modules/Extension/DisplayModule.md#screen-print), or swap [Automatic LCDs 2](Modules/Extension/AutoLCDModule.md) views with a single command.

- **Conditional Logic** - React to the state of your blocks with `when` rules and `if` steps, such as `"Batteries" low` or `grid altitude < 100`. See [Conditional Logic](./ConditionalLogic.md).

<br>

**Tutorial Video**

<iframe width="560" height="315" src="https://www.youtube.com/embed/CgA6k1xQfVE?si=QefVhWt23W7t_sRy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

Get started by [installing Mother OS](./Installation.md) as an ingame script into a programmable block on your grid.