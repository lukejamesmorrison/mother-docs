# Separation Charge Module

The Separation Charge module detonates separation charges. Detonation explodes and removes the charge from the grid.

[[toc]]

## Commands

### charge/detach

Detonate and detach a Separation Charge:

```
charge/detach <Block|Group|Tag>
```

**Example**

Name the Separation Charge attaching your cargo pod `Cargo Pod Charge`. When you are ready to release the pod, run:

```ms title="Terminal"
charge/detach "Cargo Pod Charge";
```

After detonation, Mother waits one second before refreshing its construct information. This gives the charge time to explode before Mother forgets the detached grids and blocks.
