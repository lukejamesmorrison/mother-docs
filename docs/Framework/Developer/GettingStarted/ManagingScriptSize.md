---
next: /Framework/Developer/BuildingAModule/BuildingAModule.md
---

# Managing Script Size & Complexity

Size matters. Your script has a hard limit of `100,000 characters` after minification.  Malware whipped together an awesome tool for this, but nonetheless, keywords and language features are not minified and come at a cost. Second, never loop within a loop. Never. On a grid of any meaningful size, this could cause your script to crash. Mother Core uses a combination of techniques to operate regardless of grid size via the [Block Catalogue](../CoreModules/BlockCatalogue.md).

[[toc]]


## Tips for Managing Size

You may need to make compromises for what is the most safe/efficent, for what is least expensive in terms of character count. 

### Avoiding Multiple Block Type References

Throughout developing [Mother OS](../../../IngameScript/IngameScript.md), the largest character cost comes from accessing blocks by their type.  Since these are whitelisted by the API, they cannot be minified and so come at great cost each time you reference them. For example, referencing a connector with `IMyShipConnector` costs **16 characters**.

**Some notable block types:**
| Name                                                      | Character Count   |
|-                                                          |:-:                |
| [`IMyMechanicalConnectionBlock`][mechanical-connection]   | 28                |
| [`IMyBroadcastControllerBlock`][broadcast-controller]     | 27                |
| [`IMyProgrammableBlock`][pb]                              | 20                |
| [`IMyShipConnector`][connector]                           | 16                |

[mechanical-connection]: https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyMechanicalConnectionBlock
[broadcast-controller]: https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyBroadcastControllerBlock
[pb]: https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyProgrammableBlock
[connector]: https://github.com/malware-dev/MDK-SE/wiki/Sandbox.ModAPI.Ingame.IMyShipConnector

Check out Malware's [API Index](https://github.com/malware-dev/MDK-SE/wiki/Api-index) for the entire list of available types.

#### Examples

Let's look at the common action of looping through a list of connectors:

```csharp
List<IMyShipConnector> Connectors = new List<IMyShipConnector>()

foreach(IMyShipConnector connector in Connectors)
{
    connector.Connect();
}
```

We've used `IMyShipConnector` 3 times and so will require at least 46 characters to complete this action.  When you're doing some complex work, this only gets worse. Let's save some space with `var`:

```csharp
List<IMyShipConnector> Connectors = new List<IMyShipConnector>()

foreach(var connector in Connectors)
{
    connector.Connect();
}
```

Not bad, we've saved **13 characters** already! Since this is a simple action though, let's go even further:

```csharp
List<IMyShipConnector> Connectors = new List<IMyShipConnector>()

Connectors.ForEach(connector => connector.Connect());
```

Boom - we no longer need any keywords within our loop and can save the brackets by putting the logic on a single line.


### Being Conscious of Keywords

It is great practice to use keywords (`private`, `readonly`, etc.) as you are developing.  However, keywords come at a cost as they are not minifiable, and so take up space each time you use them. Mother CLI installs build tools that removes many of these during the build process as this makes no difference to the computer once running in the programmable block.

Nonetheless, always be consicous of language level keywords and punctuation. 100,000 characters adds up fast.

For example, the programmable block will treat these two lines of code exactly the same.

**Full keywords:**
```csharp
private readonly string SystemName = "Mother OS"
```

**Partial keywords:**
```csharp
string SystemName = "Mother OS"
```
:::important
It is good practive to **ALWAYS** use keywords. These exist for a reason and help keep our code clean and expressive.  I suggest only reaching for these types of optimizations when all other cleanup has been exhausted. Mother also removes many of these during build so *technically* you should be able to go nuts with them.
:::

### Reducing String Size

There are generally two ways to print a string value in C#. You can do this via the `ToString()` method on most objects, or via string interpolation where the string value of the provided object can be inferred. Let's look at each option.

#### `ToString()` method:
```csharp
float velocity = 123.45f

Mother.Print(velocity.ToString());
```

When minified, the string segment is **12 characters** long:

```csharp
Ò.ToString()
```

#### String interpolation:
```csharp
float velocity = 123.45f

Mother.Print($"{velocity}");
```

When minified, the string segment is **6 characters** long:

```csharp
$"{Ò}"
```

Truthfully, I prefer the first method in most cases, but it comes at a higher cost. In the above example, using string interprolation results in a 50% reduction in characters - which is HUGE when you are printing a lot of data for the player.

## Tips for Managing Complexity

If your script tries to conduct more than 50,000 operations in a single cycle, then you will hit a `script too complex` error.  This is almost always caused by the overuse of loops. You should do your best to use HashSets and Dictionaries rather than nested loops to control your logic. Check out [Breadth-first Searching (BFS)](https://en.wikipedia.org/wiki/Breadth-first_search) and [Time Complexity](https://en.wikipedia.org/wiki/Time_complexity) to get a better understand of this important computer science concept.

:::tip
The [Block Catalogue](../CoreModules/BlockCatalogue.md) uses BFS to determine which blocks are on the current **construct**, as often a subgrid with have subgrids, which will have subgrids... you get the point. For those that have been using [Mother OS](../../../IngameScript/IngameScript.md) for a while, this is exactly the area that was causing you complexity errors before July 2025.
:::
