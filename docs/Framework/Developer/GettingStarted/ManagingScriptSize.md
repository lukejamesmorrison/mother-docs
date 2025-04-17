# Managing Script Size & Complexity

## String Interpolation


## Minimizing Access to Programmable Block API

All reference to the Program instance and its API should be minimized.  This is because references cannot be minimized, so using `ITerminalBlock` everywhere in your code gets expensive quickly (13 characters). This is where modules like the [Block Calalogue](../CoreModules/BlockCatalogue.md) help developers by abstracting these common activities.
