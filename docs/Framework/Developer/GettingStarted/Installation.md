# Installation

Creating a custom Mother project is straight forward.  We will need an IDE like [Visual Studio](https://visualstudio.microsoft.com/), and several Nuget packages to get started.  After that you can use several simple console commands to simplify your development.

## 1. Install MDK2

First you will need MDK2, an amazing developer kit that Malware has created. You can easily download it [here](https://github.com/malforge/mdk2/wiki/Getting-Started-using-Visual-Studio). I highly recommend Visual Studio for developing scripts. Trust me.


## 2. Install Mother CLI Nuget Package

To simplify building projects, you should install `mother-cli` which gives you helpers to create a project, as well as modules and commands. This will allow script developers to get right to work, without worrying about how to wire up their script.

INAGE HERE

## 3. Create a new Project

Now that we have `mother-cli` installed, we can simply create a new project in our current folder with the `new` command:

```bash
mother new ExampleProject
```

::: note
This framework only includes Core Modules shipped with the [Mother OS](../../../IngameScript/IngameScript.md) in-game script.
:::

After running the command, you should now have an `ExampleProject` folder containing your default project files.  With a few exceptions, this folder will look similar Progammable Block Script MDK2 can create for you. Mother CLI will automatically download all Mother Core modules into your project.

**Example folder structure:**
```
ExampleProject/
├── Program.cs
├── thumb.png
├── Core/
├── Modules/
├── ...
```

## 4. Create Your First Module

Mother scripts store all of their logic in *Modules*.  Developers can access many powerful features by extending the `BaseExtensionModule` class.  To make this simple, Mother exposes the `make:module` command to quickly create new modules with the necessary scaffolding.

```bash
mother make:module ExampleModule
```

You should now see an ExampleModule in the Modules folder:

```
ExampleProject/
├── Program.cs
├── thumb.png
├── Modules/
    ├── ExampleModule/
        ├── ExampleModule.cs
```

## 5. Build your Project

Use `Ctrl + B` to build your script. The build tool should automatically save your script into the appropriate directory, for access in the game.

Scripts are typcially found in `C:\Users\{USER}\AppData\Roaming\SpaceEngineers\IngameScripts\local`

You now have everything you need to get started.  Check out [Creating a Module](../BuildingAModule/BuildingAModule.md) next for more info on Module creation and using terminal commands to expose functions to players easily.  

## 4. Play
When playing Space Engineers, your script should be available via the in game `Edit` menu on a Programmable Block.

1. Image of edit + select script menu

## 5. Publish

1. Show how to public to steam workshop, mod.io