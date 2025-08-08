import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { searchPlugin } from '@vuepress/plugin-search'

// Core Routes
const MotherOSSidebar = {
  text: 'Mother OS (Ingame Script)',
  link: '/IngameScript/IngameScript.md',
  children: [
    {
      text: 'Getting Started',
      collapsible: true, // Allows collapsing sections
      children: [
        '/IngameScript/UpgradeGuide.md',
        '/IngameScript/Installation.md',
        '/IngameScript/CommandLineInterface.md',
        '/IngameScript/Configuration.md',
        '/IngameScript/Modules/Modules.md',
      ],
    },
    {
      text: 'Core Modules',
      collapsible: true, // Allows collapsing sections
      children: [
        '/IngameScript/Modules/Core/ActivityMonitor.md',
        '/IngameScript/Modules/Core/Almanac.md',
        '/IngameScript/Modules/Core/BlockCatalogue.md',
        '/IngameScript/Modules/Core/LocalStorage.md',
        // '/IngameScript/Modules/Core/Security.md',
        '/IngameScript/Modules/Core/IntergridMessageService.md',
      ],
    },
    {
      text: 'Extension Modules',
      collapsible: true, // Allows collapsing sections
      children: [
        {
          'link': '/IngameScript/Modules/Extension/AirVentModule.md',
          text: 'Air Vent Module'
        },
        '/IngameScript/Modules/Extension/BatteryModule.md',
        '/IngameScript/Modules/Extension/TerminalBlockModule.md',
        '/IngameScript/Modules/Extension/CockpitModule.md',
        '/IngameScript/Modules/Extension/ConnectorModule.md',
        '/IngameScript/Modules/Extension/DisplayModule.md',
        '/IngameScript/Modules/Extension/DockingModule.md',
        '/IngameScript/Modules/Extension/DoorModule.md',
        '/IngameScript/Modules/Extension/FlightControlModule.md',
        '/IngameScript/Modules/Extension/FlightPlanningModule.md',
        '/IngameScript/Modules/Extension/GasTankModule.md',
        '/IngameScript/Modules/Extension/GyroscopeModule.md',
        '/IngameScript/Modules/Extension/HingeModule.md',
        '/IngameScript/Modules/Extension/LandingGearModule.md',
        '/IngameScript/Modules/Extension/LightModule.md',
        '/IngameScript/Modules/Extension/MapModule.md',
        '/IngameScript/Modules/Extension/PistonModule.md',
        '/IngameScript/Modules/Extension/ProgrammableBlockModule.md',
        '/IngameScript/Modules/Extension/RotorModule.md',
        '/IngameScript/Modules/Extension/SensorModule.md',
        '/IngameScript/Modules/Extension/SoundBlockModule.md',
        '/IngameScript/Modules/Extension/ThrusterModule.md',
        '/IngameScript/Modules/Extension/TimerBlockModule.md',
      ],
    },
    {
      text: 'Command Cheatsheet',
      collapsible: true, // Allows collapsing sections
      link: '/IngameScript/CommandCheatsheet.md',
    },
    '/IngameScript/Compatibility.md',
    '/IngameScript/Examples.md',
    // '/PoweredByMother.md',

  ]
};

// Framework Routes
const MotherCoreSidebar = {
  text: 'Mother Core (Script Framework)',
  link: '/Framework/README.md',
  children: [
    {
      text: 'Getting Started',
      collapsible: true, // Allows collapsing sections
      children: [
        {
          text: 'Upgrade Guide',
          link: '/Framework/Developer/GettingStarted/UpgradeGuide.md',
        },
        {
          text: 'Installation',
          link: '/Framework/Developer/GettingStarted/Installation.md',
        },
        {
          text: 'Architecture Overview',
          link: '/Framework/Developer/GettingStarted/ArchitectureOverview.md',
        },
        '/Framework/Developer/GettingStarted/ManagingScriptSize.md',
        // '/IngameScript/CommandLineInterface.md',
        // '/IngameScript/Configuration.md',
        // '/IngameScript/Modules/Modules.md',
        // '/IngameScript/Examples.md',
        // '/IngameScript/CommandCheatsheet.md',
      ],
    },
    {
      text: 'Building A Module',
      link: '/Framework/Developer/BuildingAModule/BuildingAModule.md',
      collapsible: true, // Allows collapsing sections
      // children: [
      //   // '/Framework/Developer/ExtensionModulesModules/Almanac.md',
      //   // '/IngameScript/CommandLineInterface.md',
      //   // '/IngameScript/Configuration.md',
      //   // '/IngameScript/Modules/Modules.md',
      //   // '/IngameScript/Examples.md',
      //   // '/IngameScript/CommandCheatsheet.md',
      // ],
    },
    {
      text: 'Console',
      link: '/Framework/Developer/Console.md',
    },
    {
      text: 'Core Modules',
      link: '/Framework/Developer/CoreModules/CoreModules.md',
      collapsible: true, // Allows collapsing sections
      children: [
        '/Framework/Developer/CoreModules/ActivityMonitor.md',
        '/Framework/Developer/CoreModules/Almanac.md',
        '/Framework/Developer/CoreModules/BlockCatalogue.md',
        '/Framework/Developer/CoreModules/Clock.md',
        '/Framework/Developer/CoreModules/CommandBus.md',
        '/Framework/Developer/CoreModules/Configuration.md',
        '/Framework/Developer/CoreModules/EventBus.md',
        '/Framework/Developer/CoreModules/IntergridMessageService.md',
        '/Framework/Developer/CoreModules/LocalStorage.md',
        '/Framework/Developer/CoreModules/Terminal.md',
      ],
    },
    {
      text: 'Utilities',
      // link: '/Framework/Developer/Utilities/Utilities.md',
      collapsible: true, // Allows collapsing sections
      children: [
        '/Framework/Developer/Utilities/ColorHelper.md',
        // '/Framework/Developer/Utilities/Geometry.md',
        '/Framework/Developer/Utilities/Security.md',
        '/Framework/Developer/Utilities/Serializer.md',
        // '/IngameScript/CommandLineInterface.md',
        // '/IngameScript/Configuration.md',
        // '/IngameScript/Modules/Modules.md',
        // '/IngameScript/Examples.md',
        // '/IngameScript/CommandCheatsheet.md',
      ],
    },
  ]
};

// Navbar Links
const NavbarLinks = () => {
  if (process.env.NODE_ENV == 'development') {
    
    return [
      {
        text: 'Mother OS (Ingame Script)',
        link: '/IngameScript/IngameScript.md'
      },
      {
        text: 'Mother Core (Script Framework)',
        link: '/Framework/README.md'
      }
    ]
  }
  else {
    return [
      {
        text: 'Mother OS (Ingame Script)',
        link: '/IngameScript/IngameScript.md'
      }
    ]
  }
}

export default defineUserConfig({
  // define: {
  //   __VUEPRESS_DEV__ : process.env.NODE_ENV,
  // },
  base: '/mother-docs/',
  lang: 'en-US',
  plugins: [
    mdEnhancePlugin({
      mermaid: true,
    }),
    searchPlugin({
      // options
      isSearchable: (page) => {
        // exclude access to Framework docs for now
        return !page.path.startsWith('/Framework/');
      },
      hotKeys: [
        {
          key: 'k',
          meta: true,
        },
        // {
        //   key: 'k',
        //   ctrl: true,
        // }, 
      ],
      // locales: {
      //   '/': {
      //     placeholder: 'Search',
      //   },
      // },
    }),
  ],
  title: 'Mother Docs',
  description: 'Documentation for Mother OS and Mother Core',

  theme: defaultTheme({
    darkMode: false, // Enables the dark mode toggle
    logo: 'images/logo-512x512.png',
    navbar: [
      {
        text: 'Buy me a Coffee',
        link: 'https://buymeacoffee.com/agentluke',
      },
      {
        text: 'Steam Workshop',
        link: 'https://steamcommunity.com/workshop/filedetails/?id=3411507973',
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/PrrmBujmXQ',
      },
      {
        text: 'Docs',
        children: NavbarLinks()
        // [
        //   {
        //     text: 'Mother OS (Ingame Script)',
        //     link: '/IngameScript/IngameScript.md'
        //   },
        // ]
      }
    ],
    sidebarDepth: 1,
    sidebar: [
      MotherOSSidebar,
      process.env.NODE_ENV == 'development' ? MotherCoreSidebar : {},
      "/PoweredByMother.md",
    ]
  }),

  bundler: viteBundler(),
})
