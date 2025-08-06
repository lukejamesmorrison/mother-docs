---
next: /Framework/Developer/BuildingAModule/BuildingAModule.md
---

# Managing Script Size & Complexity

Size matters. Your script has a hard limit of 100,000 characters after minification.  Malware whipped together an awesome tool for this, but nonetheless, keywords and language features are not minified and come at a cost. Second, never loop within a loop. Never. On a grid of any meaningful size, this could cause your script to crash. Mother Core uses a combination of techniques to operate regardless of grid size via the [Block Catalogue](../CoreModules/BlockCatalogue.md).


## Tips for Managing Size

You may need to make compromises for what is the most safe/efficent, for what is least expensive in terms of character count. 

### Avoiding Block Types and Unecessary Keywords

### String Interpolation & Caching




## Tips for Managing Script Complexity

### Use a Breadth First Search to avoid Nested Loops

### Use a Coroutine



<!-- ## Minimizing Access to Programmable Block API

All reference to the Program instance and its API should be minimized.  This is because references cannot be minimized, so using `ITerminalBlock` everywhere in your code gets expensive quickly (13 characters). This is where modules like the [Block Calalogue](../CoreModules/BlockCatalogue.md) help developers by abstracting these common activities. -->
