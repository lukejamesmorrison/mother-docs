import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import darkPlusTheme from '@shikijs/themes/dark-plus'
import { fileURLToPath } from 'url'
import fs from 'fs'
import * as dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config();

const DEV_MODE = process.env.NODE_ENV == 'development';

const TITLE = DEV_MODE ? 'Mother Docs (Dev)' : 'Mother Docs';

const DESCRIPTION = 'Documentation for the Mother Project';

const basePath = '/mother-docs/';
const motherScriptThemePath = fileURLToPath(new URL('./shiki/motherscript-color-theme.json', import.meta.url))
const motherScriptGrammarPath = fileURLToPath(new URL('./shiki/motherscript.tmLanguage.json', import.meta.url))


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
        '/IngameScript/Modules/Core/IntergridMessageService.md',
        '/IngameScript/Modules/Core/LocalStorage.md',
        '/IngameScript/Modules/Core/MergeBlockModule.md',
        // '/IngameScript/Modules/Core/Security.md',
      ],
    },
    {
      text: 'Extension Modules',
      collapsible: true, // Allows collapsing sections
      children: [
        {
          link: '/IngameScript/Modules/Extension/AirVentModule.md',
          text: 'Air Vent Module'
        },
        '/IngameScript/Modules/Extension/BatteryModule.md',
        '/IngameScript/Modules/Extension/TerminalBlockModule.md',
        '/IngameScript/Modules/Extension/CockpitModule.md',
        '/IngameScript/Modules/Extension/ConnectorModule.md',
        '/IngameScript/Modules/Extension/DisplayModule.md',
        '/IngameScript/Modules/Extension/DoorModule.md',
        '/IngameScript/Modules/Extension/GasTankModule.md',
        '/IngameScript/Modules/Extension/HingeModule.md',
        '/IngameScript/Modules/Extension/LandingGearModule.md',
        '/IngameScript/Modules/Extension/LightModule.md',
        '/IngameScript/Modules/Extension/PistonModule.md',
        '/IngameScript/Modules/Extension/ProgrammableBlockModule.md',
        '/IngameScript/Modules/Extension/RotorModule.md',
        // Alias for DisplayModule
        {
          link: '/IngameScript/Modules/Extension/DisplayModule.md',
          text: 'Screen Module',
        },
        '/IngameScript/Modules/Extension/SensorModule.md',
        '/IngameScript/Modules/Extension/SorterModule.md',
        '/IngameScript/Modules/Extension/SoundBlockModule.md',
        '/IngameScript/Modules/Extension/ThrusterModule.md',
        '/IngameScript/Modules/Extension/TimerBlockModule.md',
        '/IngameScript/Modules/Extension/WheelModule.md',
      ],
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
        // '/IngameScript/Cheatsheet.md',
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
      //   // '/IngameScript/Cheatsheet.md',
      // ],
    },
    {
      text: 'Mother CLI (Console)',
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
        '/Framework/Developer/CoreModules/Log.md',
        '/Framework/Developer/CoreModules/Terminal.md',
      ],
    },
    {
      text: 'Utilities',
      // link: '/Framework/Developer/Utilities/Utilities.md',
      collapsible: true, // Allows collapsing sections
      children: [
        '/Framework/Developer/Utilities/ColorHelper.md',
        '/Framework/Developer/Utilities/NumberHelper.md',
        // '/Framework/Developer/Utilities/Geometry.md',
        '/Framework/Developer/Utilities/Security.md',
        '/Framework/Developer/Utilities/Serializer.md',
        // '/IngameScript/CommandLineInterface.md',
        // '/IngameScript/Configuration.md',
        // '/IngameScript/Modules/Modules.md',
        // '/IngameScript/Examples.md',
        // '/IngameScript/Cheatsheet.md',
      ],
    },
    {
      text: 'Tutorials',
      link: '/Framework/Developer/Tutorials/Tutorials.md',
    }
  ]
};

// MAPS Routes
const MotherAutopilotSystemSidebar = {
  text: 'Mother Autopilot System (MAPS)',
  link: '/MotherAutopilotSystem/README.md',
  children: [
    {
      text: 'Getting Started',
      collapsible: true, // Allows collapsing sections
      children: [
        '/MotherAutopilotSystem/UpgradeGuide.md',
        '/MotherAutopilotSystem/Installation.md',
      ],
    },
    {
      text: 'Modules',
      collapsible: true, // Allows collapsing sections
      children: [
        '/MotherAutopilotSystem/Modules/FlightPlanningModule.md',
        '/MotherAutopilotSystem/Modules/MapModule.md',
        '/MotherAutopilotSystem/Modules/FlightControlModule.md',
        '/MotherAutopilotSystem/Modules/AttitudeModule.md',
        '/MotherAutopilotSystem/Modules/DockingModule.md',

        // '/IngameScript/Modules/Core/Almanac.md',
        // '/IngameScript/Modules/Core/BlockCatalogue.md',
        // '/IngameScript/Modules/Core/LocalStorage.md',
        // // '/IngameScript/Modules/Core/Security.md',
        // '/IngameScript/Modules/Core/IntergridMessageService.md',
      ],
    },
  ]
};

const MotherGUISidebar = {
  text: 'Mother GUI',
  link: '/MotherGUI/README.md',
  children: [
    {
      text: 'Getting Started',
      collapsible: true,
      children: [
        '/MotherGUI/Installation.md',
        '/MotherGUI/Configuration.md',
        
      ],
    },
    '/MotherGUI/Commands.md',
    {
      text: 'Menus',
      link: '/MotherGUI/MenuView.md',
    },
    '/MotherGUI/Views.md',
  ]
};

// Navbar Links
const navbarLinks = [
    {
        text: 'Mother OS (Ingame Script)',
        link: '/IngameScript/IngameScript.md'
      },
      {
        text: 'Mother Core (Script Framework)',
        link: '/Framework/README.md'
      }
  ];

// Dev-only Navbar Links
const devNavbarLinks = [
  {
    text: 'Mother GUI',
    link: '/MotherGUI/README.md'
  },
  {
    text: 'Mother Autopilot System (MAPS)',
    link: '/MotherAutopilotSystem/README.md'
  },
  {
    text: 'Motherland (Server)',
    link: '/Motherland/Motherland.md'
  },
];

// All Navbar Links
const NavbarLinks = () => {

  let links = navbarLinks;

  if(DEV_MODE) {
    links.push(...devNavbarLinks);
  }

  // add cheatsheet link
  links.push(
    {
        text: 'Cheatsheet',
        collapsible: true, // Allows collapsing sections
        link: '/Cheatsheet.md',
      },
  )

  // add brand guidelines link
  links.push(
    {
        text: 'Brand Guidelines',
        link: '/BrandGuidelines.md',
      },
  )

  return links;
}




// console.log(JSON.parse(fs.readFileSync(resolve(__dirname, 'shiki/motherscript-color-theme.json'))));

// ✅ Load your custom theme JSON(s) as objects
// const motherDarkTheme = JSON.parse(
//   fs.readFileSync(resolve(__dirname, 'shiki/motherscript-color-theme.json'), 'utf-8')
// )

// const motherScriptDarkTheme = MotherScriptDarkTheme;

const shikiBaseTheme = darkPlusTheme

const motherScriptDarkTheme = JSON.parse(
  fs.readFileSync(motherScriptThemePath, 'utf8')
)

const motherScriptTokenColors = motherScriptDarkTheme.tokenColors
  .map((tokenColor) => {
    const scopes = Array.isArray(tokenColor.scope)
      ? tokenColor.scope
      : `${tokenColor.scope ?? ''}`
          .split(',')
          .map((scope) => scope.trim())
          .filter(Boolean)

    const motherScriptScopes = scopes.filter((scope) => scope.includes('motherscript'))

    if (motherScriptScopes.length === 0)
      return null

    return {
      ...tokenColor,
      scope: Array.isArray(tokenColor.scope) ? motherScriptScopes : motherScriptScopes.join(', '),
    }
  })
  .filter(Boolean)

const shikiTheme = {
  ...shikiBaseTheme,
  tokenColors: [
    ...shikiBaseTheme.tokenColors,
    ...motherScriptTokenColors,
  ],
}

export default defineUserConfig({
  base: basePath,
  title: TITLE,
  description: DESCRIPTION,

  // Additional head elements. We add icons.
  head: [
    // ['script', { src: 'https://cdn.jsdelivr.net/npm/@tsparticles/slim@latest/tsparticles.slim.min.js', defer: '' }],

    [
      'link', { 
        rel: 'icon', 
        href: DEV_MODE ? `${basePath}favicon-dev.ico`: `${basePath}favicon.ico`
      }
    ],
    [
      'link', 
        { 
          rel: 'icon', 
          href: DEV_MODE ? `${basePath}favicon-16x16-dev.png` : `${basePath}favicon-16x16.png`
        }
    ],
    [
      'link', 
      { 
        rel: 'icon', 
        href: DEV_MODE ? `${basePath}favicon-32x32-dev.png` : `${basePath}favicon-32x32.png`
      }
    ],
    [
      'link', 
        { 
          rel: 'icon', 
          href: DEV_MODE ? `${basePath}apple-touch-icon-dev.png` : `${basePath}apple-touch-icon.png`
        }
    ],
    [
      'link', 
      { 
        rel: 'icon', 
        href: DEV_MODE ? `${basePath}android-chrome-192x192-dev.png` : `${basePath}android-chrome-192x192.png`
      }
    ],
    [
      'link', 
        { 
          rel: 'icon', 
          href: DEV_MODE ? `${basePath}android-chrome-512x512-dev.png` : `${basePath}android-chrome-512x512.png`
        }
    ],
  ],

  plugins: [
    mdEnhancePlugin({
      mermaid: true,
    }),
    googleAnalyticsPlugin({
      id: process.env.GOOGLE_ANALYTICS_ID
    }),
    shikiPlugin({
      theme: shikiTheme,
      langs: [
        'csharp',
        'bash',
        'ini',
        {
          id: 'motherscript',
          scopeName: 'source.motherscript',
          path: motherScriptGrammarPath,
          aliases: ['ms', 'motherscript'],
        },
      ],
    }),
  ],

  theme: defaultTheme({
    darkMode: false, // Enables the dark mode toggle
    logo: DEV_MODE ? 'images/logo-512x512-dev.png' : 'images/logo-512x512.png',
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
      }
    ],
    sidebarDepth: 1,
    sidebar: [
      // Cheatsheet
      {
        text: 'Cheatsheet',
        collapsible: true, // Allows collapsing sections
        link: '/Cheatsheet.md',
      },
      MotherOSSidebar,
      MotherGUISidebar,
      process.env.NODE_ENV == 'development' ? MotherAutopilotSystemSidebar : {},
      MotherCoreSidebar,
      
      "/PoweredByMother.md",
      "/BrandGuidelines.md",
    ]
  }),

  bundler: viteBundler(),
})
