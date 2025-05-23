# Display Module

The Display Module allows the user to control LCD panels, and cockpit screens on the grid.

[[toc]]

## Commands
### print

Print a message to an LCD panel or group of panels.

```
screen/print <Screen|Group> <Message> <Options>
```

::: info
At this time Mother cannot print text to cockpit screens.
:::

Options
| Option  | Values      | Unit  | Description                                                           |
| ------- | ----------  | ----  | -------------------------------------------------------------------   |
| `color` | RGB         |       | Set the color of the text.                                            |
| `size`  | Number    |       | Set the text size between 0.0 and 10.0.                                                   |

You have access to the following colors which may be used in place of their RGB values:

|Name                                                   | RGB         | Hexidecimal   |
|---                                                    |---          | ---           |
|![red](https://img.shields.io/badge/red-FF0000)        |255,0,0      | FF0000        |
|![green](https://img.shields.io/badge/green-00FF00)    |0,255,0      | 00FF00        |
|![blue](https://img.shields.io/badge/blue-0000FF)      |0,0,255      | 0000FF        |
|![yellow](https://img.shields.io/badge/yellow-FFFF00)  |255,255,0    | FFFF00        |
|![orange](https://img.shields.io/badge/orange-FFA500)  |255,165,0    | FFA500        |
|![cyan](https://img.shields.io/badge/cyan-00FFFF)      |0,255,255    | 00FFFF        |
|![magenta](https://img.shields.io/badge/magenta-FF00FF)|255,0,255    | FF00FF        |
|![white](https://img.shields.io/badge/white-FFFFFF)    |255,255,255  | FFFFFF        |
|![black](https://img.shields.io/badge/black-000000)    |0,0,0        | 000000        |

**Example**

Imagine we want to print text to a screen based on our airlock status.  We contextualize it further with color and print a size that is easily legible.

```bash title="Terminal"
screen/print "AirlockStatusScreens" "Airlock SAFE" --color=green --size=4.4
```