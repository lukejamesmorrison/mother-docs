# Mother Core (Script Framework)
![In Development](https://img.shields.io/badge/In_Development-red)

Mother Core is a framework for developing custom Programmable Block scripts for Space Engineers. It enables you to build interoperable modules to suit the specific needs of your ship or station. [Mother OS](../IngameScript/IngameScript.md) is built with Mother Core and a collection of extension modules.

Get started with:

1. [Create an Extension Module](./Developer/BuildingAModule/BuildingAModule.md)
2. [Creating a Custom Terminal Command](./Developer/BuildingAModule/BuildingAModule.md#commands)
3. [Sending and Receiving Messages](./Developer/CoreModules/IntergridMessageService.md) 
4. Schedule and Delay Actions

## Overview

Scripts built with Mother Core depend on the [Program](https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.MyGridProgram) instance, and a collection of [Core Modules](./Developer/CoreModules/CoreModules.md).  These core modules provide a wide range of functionality, including intergrid communication, event handling, and block management. Developers can add their own functionality via **Extension Modules**.

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
        'primaryColor': '#BB2528',
        'primaryTextColor': '#fff',
        'primaryBorderColor': '#7C0000',
        'mainBkg': 'white',
        'nodeBorder': 'red',
        'lineColor': 'black',
        'secondaryColor': 'white',
        'secondaryBorderColor': 'black',
        'tertiaryColor': '#F2F2F2',
        'tertiaryBorderColor': 'black'
    }
  }
}%%

graph TD
    MotherCore["Mother Core"] -->|Depends on| Program["Program"]
    MotherCore["Mother Core"] -->|Composed of| CoreModule["Core Modules"]
    Mother["Custom Script<br>(ie. Mother OS)"] -->|Depends on| MotherCore["Mother Core"]

    Mother -->|Composed of| ExtensionModule["Extension Module<br>(ie. Piston Module)"]

    subgraph CoreModule["Core Module<br>(ie. Almanac)"]
    end
```

## Recommended File Structure

We treat modules as the primary unit of functionality.  Therefore modules should in most cases manage their own commands and events.  This allows modules to be self-contained and reusable across different scripts. Mother Core and [Mother OS](../IngameScript/IngameScript.md) observe the following file structure:

```plaintext title="File Structure"
/
├── Program.cs
├── thumb.png
├── Modules/
    ├── MissileGuidanceModule/
        ├── MissileGuidanceModule.cs
        ├── Commands/
            ├── LaunchCommand.cs
            ├── DetonateCommand.cs
        ├── Events/
            ├── MissileLaunchedEvent.cs
            ├── MissileDetonatingEvent.cs
```

## The Extension Module
Developers can add new functionality to their program by creating an [Extension Module](./Developer/BuildingAModule/BuildingAModule.md). These modules are registered at boot time. They may access all other modules directly and respond to changes when other modules emit events.

```csharp title="MissileGuidanceModule.cs"
class MissileGuidanceModule : BaseExtensionModule
{
    // Boot the module
    public void Boot()
    {
        // Reference important modules
        FlightPlanningModule = Mother.GetModule<FlightPlanningModule>();

        // Register custom terminal commands like 'detonate' and 'launch'
        RegisterCommand(new LaunchCommand(this));
        RegisterCommand(new DetonateCommand(this));

        // Load relevant blocks from the grid
        Thrusters = Mother.GetModule<BlockCatalogue>().GetBlocks<IMyThrust>();

        // Listen for events
        Subscribe<MissileLaunchedEvent>();
    }

    // Run module every program cycle
    public override void Run()
    {
        UpdateThrusters()
    }

    // Do something...
    void UpdateThrusters() { }
}
```
