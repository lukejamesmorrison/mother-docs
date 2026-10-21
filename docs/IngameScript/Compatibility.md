# Compatibility

Mother OS is designed to be compatible with other scripts and most ingame systems. This page outlines several considerations for players and script developers to maximize compatibility.

[[toc]]

## Running other Scripts with Mother OS

Mother OS is designed to be compatible with other scripts.  However, some scripts may not work as expected due to the way they are designed to accept arguments. If you are developing your own script, it is recommend that you accept the `Script` update type in your `Main` method. This allows programmable blocks scripts to run commands on other programmable blocks.

Example main function that accepts the `Script` update type:
```csharp title="Program.cs"
public void Main(string argument, UpdateType updateSource)
{
    if (updateSource == UpdateType.Script)
    {
        // Run based on a trigger from another programmable block script.
    }
}
```

::: tip
Check out the documentation for [UpdateTypes](https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.UpdateType) for more information.
:::

## 3rd Party Scripts

### Easy Automation v2.0

It has been reported that Mother is only able to communicate with Easy Automation via the `pb/run` command when a short delays is introduced. Luckily, we can solve this with a little hack - `wait 0` only waits one cycle so you'll hardly notice.

```ms title="Mother OS > Custom Data"
[commands]
EasyAutomationTest=
; Follow the Easy Automation Tutorial
| wait 0;
| pb/run EasyAutomationProgrammableBlock "Tutorial LCD(My Block)"
```
:::tip Quote Check!
Don't forget to wrap your outbound *argument* in double quotes `"if it contains spaces"`.
:::

Credit to [CyberChoom](https://www.youtube.com/watch?v=kMVAN1yZhqI&t=28378s) for cracking this one!


## Known Issues

### 1. Multiple Mother OS Instances

You should NOT run multiple instances of **Mother OS** on your grid.  This will lead to duplicated event monitoring and the programmable blocks will compete to render your LCD displays.  Mother OS should only be installed once per ship/station *construct*.

<!-- :::info
Multiple instances of Mother will be supported in the upcoming **v1.0.0** release. Stay tuned!
::: -->