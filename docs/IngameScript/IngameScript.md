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
![Static Badge](https://img.shields.io/badge/Version-1.1.0-blue?color=green)


Mother OS is available as an ingame script for Programmable Blocks in Space Engineers. It interoperates seamlessly with Timer Blocks and Event Controllers to augment existing automations. Start by [installing Mother OS here](./Installation.md).

```ms title="Terminal"
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
  
- **Expanded Automation** - Mother OS simplifies interacting with the mechanical systems on your grid, and monitors them for changes. See the [Cheatsheet](../Cheatsheet.md).
  
- **Copy Automations with Ease** - Easily port your automations from one grid to another by copying `Custom Data` text.

<br>

**Tutorial Video**

<iframe width="560" height="315" src="https://www.youtube.com/embed/CgA6k1xQfVE?si=QefVhWt23W7t_sRy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


### Upcoming Features

#### Conditional Logic
<Badge type="warning" text="&nbsp;In development&nbsp;" vertical="middle" />

**Objective** 

Allow players to monitor blocks and apply conditional logic to their automations.

---

Get started by [installing Mother OS](./Installation.md) as an ingame script into a programmable block on your grid.