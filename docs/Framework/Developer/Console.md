# Console
You can use [Mother CLI](https://www.nuget.org/packages/Mother.CLI/) to assist with creating project and many common file types. Simply install it as a **global** Nuget package and access it with `mother` in your Terminal/Console.  

[[toc]]

## Installation

Install Mother CLI using the following command in your terminal:

```sh title="Console/Terminal"
dotnet tool install --global Mother.CLI
```


## Usage

Commands following the following format:

```sh
mother [command] [arguments] [options]
```

## Available Commands

### install
Install Mother Core modules. Run this when pulling your project from a remote repo. Since the `/Core` folder is ignored from version control, think of the this like using `npm install` or `pip install`. 

You do not have to run this command when creating a new project, as this is done automatically.

```sh
mother install
```

### make:command
Create a new terminal command. You may also specific a module to which this command belongs and Mother CLI will register the command for you automatically.

```sh
mother make:command [CommandName] --module? [ModuleName]
```

### make:event
Create a new event.

```sh
mother make:event [EventName] --module? [ModuleName]
```

### make:module
Create a new extension module.

```sh
mother make:module [ModuleName]
```

### new
Create a new Mother project. This will create a new project in the `ProjectName` directory, within your current directory. It will also install the latest version of Mother Core to your project.

```sh
mother new [ProjectName]
```

### update
Update Mother Core modules. Running this periodically will ensure the Mother Core remains up to date.  Think of the this like using `npm update` or `pip install --upgrade` to update project dependencies.

```sh
mother update
```

