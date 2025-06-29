# Architecture Overview

::: warning
Mother requires a **Remote Control block** to function.  This allows us to leverage autopilot and flight data across our modules easily.
:::

[[toc]]
<!-- 1. Domain diagram showing commands/routines, events & general lifecyle, remote control block -->
 
## Entity Diagram

Let's look at the entity diagram for Mother OS which is the same as your custom script.  This shows the relationship between Mother OS, Mother Core, and the Program.  The Program is the entry point for all scripts.

  <!-- MotherOS["Mother OS"] e1@==> |Depends on| MotherCore
    e1@{animation: slow} -->



<!-- https://mermaid.js.org/config/theming.html#theme-variables -->
```mermaid
%%{
  init: {
    'flowchart': {
        'defaultRenderer': 'elk'
    },
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
graph RL
    MotherOS[<a href='/mother-docs/IngameScript/IngameScript.html' style='color: black; text-decoration: none'>Mother OS</a>]-->|Depends on| MotherCore
    MotherCore["Mother Core"] -->|Depends on| Program["Program"]

    MotherOS -->|Composed of| IExtensionModule["IExtensionModule"]
    MotherCore -->|Composed of| ICoreModule["ICoreModule"]
    
    ICoreModule .-> IModule["IModule"]
    IExtensionModule .-> IModule["IModule"]

    subgraph Core Modules
        direction BT
        BaseCoreModule .-> ICoreModule["ICoreModule"]
        CM2[<a href='/mother-docs/Framework/Developer/CoreModules/CommandBus.html' style='color: black; text-decoration: none'>Command Bus</a>] .-> BaseCoreModule
        CM3[<a href='/mother-docs/Framework/Developer/CoreModules/Almanac.html' style='color: black; text-decoration: none'>Almanac</a>] .-> BaseCoreModule
        CM4["Storage"] .-> BaseCoreModule
    end

    subgraph Extension Modules
        direction LR
        BaseExtensionModule .-> IExtensionModule["IExtensionModule"]
        EM1["<a href='/mother-docs/IngameScript/Modules/Extension/PistonModule.html' style='color: black; text-decoration: none'>Piston Module</a>"] .-> BaseExtensionModule
        EM3["<a href='/mother-docs/IngameScript/Modules/Extension/LightModule.html' style='color: black; text-decoration: none'>Light Module</a>"] .-> BaseExtensionModule
        EM4["..."] .-> BaseExtensionModule
    end

    subgraph Programmable Block API
        direction TB
       Program[<a href='https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.MyGridProgram' target="_blank" style='color: black; text-decoration: none'>Program</a>]
        Program --> PM1[<a href='https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyIntergridCommunicationSystem' target="_blank" style='color: black; text-decoration: none'>IGC</a>]
        Program --> PM3[<a href='https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyGridTerminalSystem' target="_blank" style='color: black; text-decoration: none'>GridTerminalSystem</a>]
        Program --> PM4["Storage"]
    end 
```

## Program Lifecycle

### Setting up Mother   
To use Mother, we need to create a `Mother` instance in our `Program` class. This is done in the constructor. We then register any extension modules we want to use.

```csharp title="Program.cs"
partial class Program : MyGridProgram
{
    private Mother mother;

    public Program()
    {
        // Create Mother instance
        mother = new Mother(this);

        // Register Extension Modules
        mother.RegisterModules(new List<IExtensionModule> { 
            new RotorModule(mother),
            new FlightControlModule(mother),
            ...
        });
    }
}
```

::: important
Extension Modules must conform the the `IExtensionModule` interface. It is recommend that you use the `BaseExtensionModule` class as a base class to leverage the library of useful helpers.
:::

### Booting the Script
Mother boots automatically when the script compiles.  Otherwise, the `Boot()` method can be called to force the boot process. Mother will boot all Core Modules, and then all Extension Modules in the order they were registered.

```csharp
Mother.Boot();
```

### Running the Script Each Cycle

The `Run()` method is responsible for running all registered modules, managing communications, and executing scheduled actions. See the [Clock](../CoreModules/Clock.md) for more information on scheduling and delaying actions. We ensure the program calls this method within the `Main()` method to delegate all further action to Mother.

:::info
Mother runs at a default speed of **~6 ticks/second**, or **every 0.166 seconds** . This tolerance should be acceptable for most use cases. Each cycle, Mother's `Run()` method is called which will then run all registered modules.

**UpdateType = UpdateType.Update10**
:::


```csharp title="Program.cs"
partial class Program : MyGridProgram
{
    // The game will run this method every cycle
    public void Main(string argument, UpdateType updateSource)
    {
        // So we delegate to Mother
        Mother.Run(argument, updateSource);
    }
}
```

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
        'secondaryColor': '#F2F2F2',
        'secondaryBorderColor': 'black',
        'tertiaryColor': '#F2F2F2',
        'tertiaryBorderColor': 'black'
    }
  }
}%%

graph TD
    A[Run] e1@-->|&nbsp;Determine updateSource&nbsp;| B{updateSource Type?}
    linkStyle 0 stroke-width:2px
    e1@{animation: slow}

    B e2@-->|&nbsp;Terminal, Trigger, Script&nbsp;| C[CommandBus]
    linkStyle 1 stroke:#BB2528,stroke-width:2px
    e2@{animation: slow}

    B e3@-->|&nbsp;IGC&nbsp;| D[IntergridMessageService]
    linkStyle 2 stroke:#4CAF50,stroke-width:2px
    e3@{animation: slow}

    B e4@-->|&nbsp;Update10&nbsp;| E[Clock]
    linkStyle 3 stroke:#2196F3,stroke-width:2px
    e4@{animation: slow}
```

## Command Lifecycle

Commands may be triggered via any one of the following methods:

|Method | Description |
|---|---|
| **Terminal** | Via the programmable block terminal. |
| **Toolbar Action** | Via a toolbar action using the programmable block's `Run` action. |
| **Button** | Via a button on a control panel that triggers the programmable block's `Run` action. |
| **Timer Block** | Via a timer block that triggers the programmable block's `Run` action. |
| **Event Controller** | Via an event trigger which runs the programmable block's `Run` action. |
| **Block Hooks** | Via a block's [hooks](../CoreModules/BlockCatalogue.md#hooks) triggered by state change. |
| **Remote Message** | Via a message sent from another grid using the [Intergrid Message Service](../CoreModules/IntergridMessageService.md). |

When a command is trigger it is passed to the [Command Bus](../CoreModules/CommandBus.md).  The Command Bus then executes the command on the appropriate module.

```mermaid
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
        'primaryColor': '#BB2528',
        'primaryBorderColor': 'red',
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

sequenceDiagram
    participant Player/Script
    participant CommandBus
    participant ModuleA
    participant EventBus
    participant ModuleB

    ModuleB->>EventBus: Subscribe to Event

    Player/Script->>CommandBus: Run command
    CommandBus->>ModuleA: Execute command
    ModuleA->>EventBus: Emit event
    EventBus-->>ModuleB: Broadcast event
    ModuleB->>ModuleB: Handle event
```

## Mother Instance

### System Attributes
Mother makes most common [Program](https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.MyGridProgram) properties available to assist with common lookups.

```csharp title="MissileGuidanceModule.cs"
// via Mother (recommended)
IMyCubeGrid Grid = Mother.Grid
IMyGridTerminalSystem GridTerminalSystem = Mother.GridTerminalSystem
IMyProgrammableBlock ProgrammableBlock = Mother.ProgrammableBlock

// via the Program instance
IMyCubeGrid Grid = Mother.Program.Me.CubeGrid
IMyGridTerminalSystem GridTerminalSystem = Mother.Program.GridTerminalSystem
IMyProgrammableBlock ProgrammableBlock = Mother.Program.Me
```