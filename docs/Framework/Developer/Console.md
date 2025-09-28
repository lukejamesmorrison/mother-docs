---
prev: /Framework/Developer/BuildingAModule/BuildingAModule.md
next: /Framework/Developer/CoreModules/CoreModules.md
---

# Console
You can use [Mother CLI](https://www.nuget.org/packages/Mother.CLI/) to assist with creating projects and many common file types. Simply install it as a **global** Nuget package and access it with the `mother` command in your Terminal/Console.  

```bash
mother make:command CelebrateCommand --module CelebrationModule
```

[[toc]]

## Installation

Install Mother CLI using the following command in your terminal:

```sh title="Console/Terminal"
dotnet tool install --global Mother.CLI
```


## Usage

Commands use the following format:

```sh
mother [command] [arguments] [--options=]
```

## Available Commands

### install
Install Mother Core modules. Run this when pulling your project from a remote repo. Since the `/Core` folder is ignored from version control, think of the this like using `npm install` or `pip install`. 

You do not have to run this command when creating a new project, as this is done automatically.

```sh
mother install
```

### make:command
Create a new terminal command. You may also specific a module to which this command belongs. Mother CLI will register it for you automatically, and place it within the `/Modules/{ModuleName}/Commands`.

```sh
mother make:command [CommandName] --module? [ModuleName]
```

Example:
```bash
# For a module
mother make:command CelebrateCommand --module CelebrationModule

# Without a module
mother make:command CelebrateCommand
```

### make:event
Create a new event. You may also specific a module to which this event belongs. Mother CLI will register it for you automatically, and place it within the `/Modules/{ModuleName}/Events`.

```sh
mother make:event [EventName] --module? [ModuleName]
```

Example:
```bash
# For a module
mother make:event CelebrationStartedEvent --module CelebrationModule

# Without a module
mother make:event CelebrationStartedEvent
```

### make:module
Create a new extension module. A project's modules will be created in the `/Modules` folder.

```sh
mother make:module [ModuleName]
```

Example:
```bash
mother make:module CelebrationModule    
```

### new
Create a new Mother project. This will create a new project in the `ProjectName` directory, within your current directory. It will also install the latest version of Mother Core to your project.

```sh
mother new [ProjectName]
```

```bash
mother new MotherParty
``` 

### update
Update Mother Core modules. Running this periodically will ensure the Mother Core remains up to date.  Think of the this like using `npm update` or `pip install --upgrade` to update project dependencies.

```sh
mother update
```

:::note
I plan to improve Mother Core versioning in the future to reduce breaking changes introduced by changes to the [core modules](CoreModules/CoreModules.md).
:::

