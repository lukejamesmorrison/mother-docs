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
        '/IngameScript/Modules/Core/Security.md',
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
        '/IngameScript/Modules/Extension/BlockModule.md',
        '/IngameScript/Modules/Extension/CommunicationModule.md',
        '/IngameScript/Modules/Extension/ConnectorModule.md',
        '/IngameScript/Modules/Extension/DockingModule.md',
        '/IngameScript/Modules/Extension/DoorModule.md',
        '/IngameScript/Modules/Extension/FlightControlModule.md',
        '/IngameScript/Modules/Extension/GyroscopeModule.md',
        '/IngameScript/Modules/Extension/HingeModule.md',
        '/IngameScript/Modules/Extension/LandingGearModule.md',
        '/IngameScript/Modules/Extension/LightModule.md',
        '/IngameScript/Modules/Extension/NavigationModule.md',
        '/IngameScript/Modules/Extension/PistonModule.md',
        '/IngameScript/Modules/Extension/ProgrammableBlockModule.md',
        '/IngameScript/Modules/Extension/RotorModule.md',
        '/IngameScript/Modules/Extension/SensorModule.md',
        '/IngameScript/Modules/Extension/SoundModule.md',
        '/IngameScript/Modules/Extension/TankModule.md',
        '/IngameScript/Modules/Extension/ThrusterModule.md',
        '/IngameScript/Modules/Extension/TimerBlockModule.md',
      ],
    },
    {
      text: 'Command Cheatsheet',
      link: '/IngameScript/CommandCheatsheet.md',
    },
    '/IngameScript/Examples.md',

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
        // '/IngameScript/CommandLineInterface.md',
        // '/IngameScript/Configuration.md',
        // '/IngameScript/Modules/Modules.md',
        // '/IngameScript/Examples.md',
        // '/IngameScript/CommandCheatsheet.md',
      ],
    },
    {
      text: 'Core Modules',
      link: '/Framework/Developer/CoreModules/CoreModules.md',
      collapsible: true, // Allows collapsing sections
      children: [
        '/Framework/Developer/CoreModules/Almanac.md',
        '/Framework/Developer/CoreModules/LocalStorage.md',
        '/Framework/Developer/CoreModules/IntergridMessageService.md',
        '/Framework/Developer/CoreModules/Clock.md',
        // '/IngameScript/CommandLineInterface.md',
        // '/IngameScript/Configuration.md',
        // '/IngameScript/Modules/Modules.md',
        // '/IngameScript/Examples.md',
        // '/IngameScript/CommandCheatsheet.md',
      ],
    },
    {
      text: 'Extension Modules',
      link: '/Framework/Developer/ExtensionModules/ExtensionModules.md',
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
      text: 'Utilities',
      // link: '/Framework/Developer/Utilities/Utilities.md',
      collapsible: true, // Allows collapsing sections
      children: [
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

export default defineUserConfig({
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
        children: [
          {
            text: 'Mother OS (Ingame Script)',
            link: '/IngameScript/IngameScript.md'
          }
        ]
      },
      
    ],
    sidebarDepth: 1,
    sidebar: [
      MotherOSSidebar,
      // process.env.NODE_ENV != 'production' ? MotherCoreSidebar : {},
    ]
  }),

  bundler: viteBundler(),
})
