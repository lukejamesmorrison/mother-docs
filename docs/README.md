---
home: true
title: Home
# heroImage: images/title.png
actions:
  # - text: Mother OS
  #   link: /IngameScript/IngameScript.md
  #   type: primary

  # - text: Mother Core
  #   link: /Framework/Readme.md
  #   type: secondary

features:
  # - title: Intuitive Command Library
  #   details: Control most common block operations with a simple command line interface.
  # - title: Dynamic Flight Planning
  #   details: Create flight plans using GPS waypoints and fly them with ease.
  # - title: Secure Communication
  #   details: Send encrypted commands to other grids to supercharge cooperation.


footer: MIT Licensed | © 2026 Agentluke | The Empire must grow.
---

<script setup>
  import MotherOSAnimation from '../../components/MotherOS/MotherOSAnimation.vue';
  import MotherCoreAnimation from '../../components/MotherCoreAnimation.vue';
  import MotherCoreOverview from '../../components/MotherCore/MotherCoreOverview.vue';
  import HomeHeroVideoSection from '../../components/HomeHeroVideoSection.vue';
  import HomeHeroOverrideSection from '../../components/HomeHeroOverrideSection.vue';
  import MotherProjectSpacecraftNavigator from '../../components/MotherProjectSpacecraftNavigator.vue';
  import ParticlesContainer from '../../components/ParticlesContainer.vue';
  import YoutubeCarousel from '../../components/YoutubeCarousel.vue';
  import AnnouncementBanner from '../../components/AnnouncementBanner.vue';
  import FlightPlanAnimation from '../../components/MotherAutopilotSystem/FlightPlanAnimation.vue';
  import exampleVideos from '../../exampleVideos'
  import { onMounted } from 'vue';
</script>

<AnnouncementBanner 
  icon="🎉" 
  link="/IngameScript/UpgradeGuide.md" 
  linkText="Learn more →"
  storageKey="v1.1-announcement-v1"
>
  Mother OS and Mother Core v1.1 are now available!
</AnnouncementBanner>

<HomeHeroOverrideSection>
  <MotherProjectSpacecraftNavigator/> 
</HomeHeroOverrideSection>

<ParticlesContainer/>

<YoutubeCarousel :videos=exampleVideos :autoplay="true" :interval="5000"/>
 
## Mother OS

<!-- **Ingame Script** for Space Engineers players.  -->

<!-- ::: tip Mother 1.1 Out Now!
Mother OS 1.1 is now available!  Check out the [Get Started](IngameScript/IngameScript.md) guide to learn how to install and use Mother OS on your grids. Mother OS now interoperates automatically with other scripts running Mother Core, like the new Mother Autopilot System (MAPS) that will own autopilot capabilities moving forward.
::: -->

[Get Started](./IngameScript/IngameScript.md) | [Cheatsheet](./IngameScript/Cheatsheet.md) | [Examples](./IngameScript/Examples.md)

Mother OS is an **ingame script** with a robust library of nearly 100 commands to control your grid. Your changes are updated automatically using the block's custom data property. Easily copy and paste complex routines, take them with you without needing mods, timer blocks, or event controllers.  Mother OS makes it easy to wirelessly send commands to other grids.

<br>

<div>
  <MotherOSAnimation />
</div>

<br>
<br>

## Mother Autopilot System (MAPS)

**Flight Planning Module** for Space Engineers ships and stations.

MAPS takes autopilot to the next level by allowing you to create dynamic flight plans using GPS waypoints. As your ship navigates each waypoint, Mother can automatically execute commands—like toggling lights, adjusting speed, or extending landing gear.

[Get Started](./MotherAutopilotSystem/README.md) | [Flight Planning](./MotherAutopilotSystem/Modules/FlightPlanningModule.md) | [Docking](./MotherAutopilotSystem/Modules/DockingModule.md)

<FlightPlanAnimation />

<br>
<br>

## Mother Core

Script Framework for custom Space Engineers ingame scripts written in C#6 and deployed using [MDK2](https://github.com/malforge/mdk2/wiki).

::: tip Mother Core 1.1 Out Now!
Mother Core 1.1 is now available and all code is available on Github!  I hope this inspires a new generation of Space Engineers script developers to build amazing things. Check out the [Get Started](./Framework/README.md) guide to learn how to install and use Mother Core in your own scripts.
:::

 [Get Started](./Framework/README.md) | [MDK-SE API Index](https://github.com/malware-dev/MDK-SE/wiki) | [Space Engineers Mod API](https://keensoftwarehouse.github.io/SpaceEngineersModAPI/api/index.html)

<MotherCoreOverview/> 


##  About Agentluke
I have always been passionate about aviation and space. I studied Aerospace Engineering, and flew in fighter jets in the Air Force for over a decade. I have been writing software since university, and I have always been fascinated by the intersection of software and hardware.

I discovered Space Engineers several years ago after my brother had been playing it for some time. I was immediately hooked. Sandbox games and builders are my jam, and Space Engineers is an excellent space sandbox. I find the automation capabilties quite clunky and require a lot of menu navigation, but curiousity got the best of me as I explored what the programmable block could do!  

I built Mother to make my ships operate more like intelligent spaceships, rather than just a collection of blocks flying through space. This project has been a labor of love for about 18 months. I hope you enjoy using Mother as much as I enjoyed building it.

**Luke** - 
Space Engineer 🚀🇨🇦



## Thanks

**Malware** has made done critical foundational work by building the [MDK-SE API Index](https://github.com/malware-dev/MDK-SE/wiki) and [MDK2](https://github.com/malforge/mdk2/wiki). Without these tools, developing a framework of this complexity would not have been possible. Cheers mate 🍻 

## Contributions
Contributions are welcome. If you see where this documentation can be improved, please let me know or submit the change request!

<!-- <section>
    <h2>Mother Core</h2>
    <strong>Framework for Space Engineers Script Developers</strong>
    <p></p>
</section> -->



 <!-- ```
 ███╗   ███╗ ██████╗ ████████╗██╗  ██╗███████╗██████╗    ██████╗ ███████╗
 ████╗ ████║██╔═══██╗╚══██╔══╝██║  ██║██╔════╝██╔══██╗  ██╔═══██╗██╔════╝
 ██╔████╔██║██║   ██║   ██║   ███████║█████╗  ██████╔╝  ██║   ██║███████╗
 ██║╚██╔╝██║██║   ██║   ██║   ██╔══██║██╔══╝  ██╔══██╗  ██║   ██║╚════██║
 ██║ ╚═╝ ██║╚██████╔╝   ██║   ██║  ██║███████╗██║  ██║  ╚██████╔╝███████║
 ╚═╝     ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝   ╚═════╝ ╚══════╝
 ``` -->


