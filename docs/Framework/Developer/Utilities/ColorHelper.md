# Color Helper

This utility provides a simple interface for common colors and is intended to be used for resolving colors from TerminalCommand arguments.  

:::important
If you are developing a script that does not need to use colors in commands, use the programmable block's built-in color constants instead. See [VRageMath.Color](https://github.com/malware-dev/MDK-SE/wiki/VRageMath.Color)
:::

[[toc]]

## Getting a Color
The `ColorHelper` class provides a simple way to access common colors by name or RGB string:

```csharp
// by name
Color red = ColorHelper.GetColor("red");

// by RGB string
Color blue = ColorHelper.GetColor("0,0,255");
```

## Available Colors

|Name                                                   | RGB         | Hexidecimal   |
|---                                                    |---          | ---           |
|![red](https://img.shields.io/badge/red-FF0000)        |255,0,0      | #FF0000        |
|![green](https://img.shields.io/badge/green-00FF00)    |0,255,0      | #00FF00        |
|![blue](https://img.shields.io/badge/blue-0000FF)      |0,0,255      | #0000FF        |
|![yellow](https://img.shields.io/badge/yellow-FFFF00)  |255,255,0    | #FFFF00        |
|![orange](https://img.shields.io/badge/orange-FFA500)  |255,165,0    | #FFA500        |
|![cyan](https://img.shields.io/badge/cyan-00FFFF)      |0,255,255    | #00FFFF        |
|![magenta](https://img.shields.io/badge/magenta-FF00FF)|255,0,255    | #FF00FF        |
|![white](https://img.shields.io/badge/white-FFFFFF)    |255,255,255  | #FFFFFF        |
|![black](https://img.shields.io/badge/black-000000)    |0,0,0        | #000000        |