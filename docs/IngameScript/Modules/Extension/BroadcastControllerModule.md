# Broadcast Controller Module

The Broadcast Controller module sends chat messages and GPS coordinates through a Broadcast Controller block. It uses the controller's *Message 8* slot by default and restores the slot after transmission.

[[toc]]

## Commands

### broadcast/send

Send a message through a Broadcast Controller:

```
broadcast/send <Block|Group|Tag> <Message> [--channel=<Channel>] [--sender=<Sender>] [--target=owner|faction|everyone] [--antenna=true|false]
```

The default channel is `7`, which uses the controller's *Message 8* slot and the *Transmit Message 8* action.

**Example**

Name your Broadcast Controller `Bridge Broadcast`, then send a docking announcement using the controller's configured sender, audience and antenna setting:

```ms title="Terminal"
broadcast/send "Bridge Broadcast" "Docking procedure started";
```

Or, send a faction announcement through the antenna as `Ship AI`, using *Message 1*:

```ms title="Terminal"
broadcast/send "Bridge Broadcast" "Welcome, crew" --sender="Ship AI" --target=faction --antenna=true --channel=0;
```

### broadcast/gps

Send the Broadcast Controller's current world position as a GPS coordinate:

```
broadcast/gps <Block|Group|Tag> [--name=<Label>] [--channel=<Channel>] [--sender=<Sender>] [--target=owner|faction|everyone] [--antenna=true|false]
```

:::tip Easily Share GPS Waypoints
This allows you to broadcast GPS waypoints that other players can find within their GPS terminal menu.
:::

**Example**

Share the position of `Bridge Broadcast` using Mother's name as the GPS label and the controller's existing broadcast settings:

```ms title="Terminal"
broadcast/gps "Bridge Broadcast";
```

Or, share the ship's location with your faction through the antenna, using a custom GPS label:

```ms title="Terminal"
broadcast/gps "Bridge Broadcast" --name="Mother Ship" --target=faction --antenna=true;
; => GPS:Mother Ship:0:0:0:#FFFFFF
```

## Temporary settings and timing

The module temporarily uses the selected message slot and restores its previous text immediately after sending. If `sender`, `target` or `antenna` is provided, that setting is restored after a grace period of at least one second.

The controller remains busy during this period even when no overrides are provided. Another broadcast through the same controller returns `Busy` rather than waiting; other controllers can still send messages. Run the examples above separately, allowing the controller to finish restoring its settings before sending again.

If `sender`, `target` or `antenna` is omitted, the controller's existing setting is left unchanged.
