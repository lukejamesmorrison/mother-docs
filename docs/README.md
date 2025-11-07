---
home: true
title: Home
# heroImage: images/title.png
actions:
  - text: Mother OS
    link: /IngameScript/IngameScript.md
    type: primary

  - text: Mother Core
    link: /Framework/Readme.md
    type: secondary

features:
  - title: Intuitive Command Library
    details: Control most common block operations with a simple command line interface.
  - title: Dynamic Flight Planning
    details: Create flight plans using GPS waypoints and fly them with ease.
  - title: Secure Communication
    details: Send encrypted commands to other grids to supercharge cooperation.


footer: MIT Licensed | © 2025 Agentluke | The Empire must grow.
---


<script setup>
  import MotherOSAnimation from '../../components/MotherOSAnimation.vue';
  // import MotherOSAnimation2 from '../../components/MotherOSAnimation2.vue';
  import MotherCoreAnimation from '../../components/MotherCoreAnimation.vue';
  import MotherCoreOverview from '../../components/MotherCoreOverview.vue';
  import HomeHeroVideoSection from '../../components/HomeHeroVideoSection.vue';
  import ParticlesContainer from '../../components/ParticlesContainer.vue';
  // import ParticlesContainer2 from '../../components/ParticlesContainer2.vue';

  import YoutubeCarousel from '../../components/YoutubeCarousel.vue';

  import { onMounted } from 'vue';

</script>

  <HomeHeroVideoSection/>

  <ParticlesContainer/>

  <YoutubeCarousel style="display: none">
    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/1nX4YHk3b2g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
    <iframe style="height: 300px; width: 100%" src="https://www.youtube.com/embed/mHaCxK-0Jkg?si=nT4zM7Y7V5EhedTI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/1nX4YHk3b2g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
    <iframe style="height: 300px; width: 100%" src="https://www.youtube.com/embed/SLjJacXa5x0?si=iElsEtMpXdMD4IpD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </YoutubeCarousel>



 <!-- Full-width breakout
<div class="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-blue-500 text-white py-8">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-xl font-semibold">Full-Width Section</h2>
    <p>
      This background stretches across the entire viewport,
      but the content inside is still aligned to the container.
    </p>
  </div>
</div> -->
 
## Mother OS

**Ingame Script** for Space Engineers players. 

::: tip Mother 1.0 Out Now!
Mother OS 1.0 is now available!  Check out the [Get Started](IngameScript/IngameScript.md) guide to learn how to install and use Mother OS on your grids. Custom data now updates automatically and we've improved how you can print custom text to your LCDs.  Enjoy!
:::

Mother OS has a robust library of nearly 100 commands to control your grid. Your changes are updated automatically using the block's custom data property. Easily copy and paste complex routines, take them with you without needing mods, timer blocks, or event controllers.  Mother OS makes it easy to wirelessly send commands to other grids, expanding how your grids can cooperate with each other

[Get Started](./IngameScript/IngameScript.md) | [Command Cheatsheet](./IngameScript/CommandCheatsheet.md) | [Examples](./IngameScript/Examples.md)

<div>
  <MotherOSAnimation />
</div>

<br>
<br>

## Mother Core

Script Framework for custom Space Engineers ingame scripts written in C#6 and deployed using [MDK2](https://github.com/malforge/mdk2/wiki).

::: tip Mother Core 1.0 Out Now!
Mother Core 1.0 is now available and all code is available on Github!  I hope this inspires a new generation of Space Engineers script developers to build amazing things.  Check out the [Get Started](./Framework/README.md) guide to learn how to install and use Mother Core in your own scripts.
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


