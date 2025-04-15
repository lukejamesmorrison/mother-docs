# Sound Block Module
<!-- [< Modules](../Modules.md) -->

The Sound Block Module allows the user to control sound blocks on the grid. Players can play, stop, and set the sound of sound blocks. Use this to add alerts, and music to your grids to crank up the vibe! 🪩

[[toc]]

## Commands

### play

Play the sound block with an optional sound.
```ini 
; play to block
sound/play <SoundBlock|Group>

; play the block with a specific sound
sound/play <SoundBlock|Group> <sound>
```

See the [`set`](#set) command for a list of available sounds.

**Example**

```bash title="Terminal"
sound/play MainSpeaker "Danger Music 04";
```

### stop

Stop the sound block from playing.

```
sound/stop <SoundBlock|Group>
```

**Example**

```bash title="Terminal"
sound/stop MainSpeaker;
```

### set

Set the sound of the sound block.

```
sound/set <SoundBlock|Group> <sound>
```

**Example**

```bash title="Terminal"
sound/set MainSpeaker MusDanger_04;
```

You may use the sound as it appears in the sound block list or, for default sounds, using their ID below.


#### Default Sounds

| ID                                                 ||                      |                         |
|---------------------------|---------------------------|---------------------------|---------------------------|
| SoundBlockLightsOn        | SoundBlockLightsOff       | SoundBlockEnemyDetected   | SoundBlockObjectiveComplete |
| SoundBlockAlert1          | SoundBlockAlert2          | SoundBlockAlert3          | DroneLoopSmall            |
| DroneLoopMedium           | DroneLoopLarge            | DroneLoopHuge             | MusCalm_01                |
| MusCalm_02               | MusCalm_03               | MusCalm_04               | MusCalm_05                |
| MusCalm_06               | MusCalm_07               | MusCalm_08               | MusCalm_09                |
| MusCalm_10               | MusCalm_11               | MusCalm_12               | MusCalm_13                |
| MusMystery_01            | MusMystery_02            | MusMystery_03            | MusMystery_04             |
| MusMystery_05            | MusMystery_06            | MusMystery_07            | MusMystery_08             |
| MusBuild_01              | MusBuild_02              | MusBuild_03              | MusBuild_04               |
| MusBuild_05              | MusBuild_06              | MusBuild_07              | MusSpace_01               |
| MusSpace_02              | MusSpace_03              | MusSpace_04              | MusSpace_05               |
| MusSpace_06              | MusSpace_07              | MusSpace_08              | MusSpace_09               |
| MusSpace_10              | MusSpace_11              | MusSpace_12              | MusLightFight_01          |
| MusLightFight_02         | MusLightFight_03         | MusLightFight_04         | MusLightFight_05          |
| MusLightFight_06         | MusLightFight_07         | MusLightFight_08         | MusLightFight_09          |
| MusLightFight_10         | MusLightFight_11         | MusLightFight_12         | MusLightFight_13          |
| MusLightFight_14         | MusHeavyFight_01         | MusHeavyFight_02         | MusHeavyFight_03          |
| MusHeavyFight_04         | MusHeavyFight_05         | MusHeavyFight_06         | MusHeavyFight_07          |
| MusHeavyFight_08         | MusHeavyFight_09         | MusHeavyFight_10         | MusHeavyFight_11          |
| MusHeavyFight_12         | MusHeavyFight_13         | MusHeavyFight_14         | MusDanger_01              |
| MusDanger_02             | MusDanger_03             | MusDanger_04             | MusDanger_05              |
| MusDanger_06             | MusEarthlike_01          | MusEarthlike_02          | MusEarthlike_03           |
| MusEarthlike_04          | MusEarthlike_05          | MusEarthlike_06          | MusPlanet_01              |
| MusPlanet_02             | MusPlanet_03             | MusPlanet_04             | MusPlanet_05              |
| MusPlanet_06             | MusAlien_01              | MusAlien_02              | MusAlien_03               |
| MusAlien_04              | MusAlien_05              | MusFun                   | MusComp_01                |
| MusComp_02               | MusComp_03               | MusComp_04               | MusComp_05                |
| MusComp_06               | MusComp_07               | MusComp_08               | MusComp_09                |
| MusComp_10               | MusComp_11               | MusComp_12               | MusComp_13                |
| MusComp_14               | MusComp_15               | MusComp_16               | MusComp2_01               |
| MusComp2_02              | MusComp2_03              | MusComp2_04              | MusComp2_05               |
| MusComp2_06              | MusComp2_07              | MusComp2_08              | MusComp2_09               |
| MusComp2_10              | MusComp2_11              | MusComp2_12              | MusComp2_13               |
| MusComp2_14              | MusComp2_15              | MusComp2_16              | MusConcert_2              |
| MusConcert_3             | MusConcert_4             | MusConcert_5             | MusConcert_6              |
| MusConcert_7             | MusConcert_8             | MusConcert_9             | MusConcert_10             |


**Example**

```bash title="Terminal"
# default sound with sound id
sound/set MainSpeaker MusDanger_04;
# default sound with ingame name
sound/set MainSpeaker "Danger Music 04";

# other sound
sound/play MainSpeaker "Space Funk";
```