# Console

[[toc]]

You can use Mother CLI to assist with creating project and many common file types.  

## Usage

Commands following the following format:

```sh
mother [command] [arguments] [options]
```

## Available Commands

### install
Install Mother Core modules. Running this when pulling your project from a remote repo. Since the `/Core` folder is ignored from version control, think of the this like using `npm install` or `pip install`.
```sh
mother update
```

### make:command
Create a new terminal command.
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
Create a new Mother project. This will create a new project in the `ProjectName` directory within the current directory.
```sh
mother new [ProjectName]
```

### update
Update Mother Core modules. Running this periodically will ensure the Mother Core remain up to date.  Think of the this like using `npm update` or `pip install --upgrade` to update project dependencies.
```sh
mother update
```

