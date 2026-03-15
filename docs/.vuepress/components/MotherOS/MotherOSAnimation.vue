<template>
  <div class="mother-os-diagram">
    <NodeDiagram ref="diagram" :nodes="nodes" :connections="connections" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NodeDiagram from './NodeDiagram.vue'

const images = {
  mother: "images/logo-512x512.png",
  button: "https://static.wikia.nocookie.net/spaceengineers/images/f/f2/Small_Button_Panel.png",
  connector: "https://static.wikia.nocookie.net/spaceengineers/images/7/7c/Icon_Block_Connector.png",
  piston: "https://static.wikia.nocookie.net/spaceengineers/images/2/28/Icon_Block_Piston.png",
  rotor: "https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png",
  landingGear: "https://static.wikia.nocookie.net/spaceengineers/images/2/2d/Icon_Block_Landing_Gear.png",
  programmableBlock: "https://static.wikia.nocookie.net/spaceengineers/images/7/76/Icon_Block_Programmable_Block.png",
  soundBlock: "https://static.wikia.nocookie.net/spaceengineers/images/4/4e/Icon_Block_Sound_Block.png",
  light: "https://static.wikia.nocookie.net/spaceengineers/images/2/21/Icon_Block_Interior_Light.png",
  sensor: "https://static.wikia.nocookie.net/spaceengineers/images/0/07/Icon_Block_Sensor.png"
}

const diagram = ref(null)

const nodes = ref([
  { id: 'root1', name: 'Button', x: 1, y: 2, image: images.button, pulseColor: '#E3B505' },
  { id: 'root2', name: 'Connector', x: 2, y: 3, image: images.connector, pulseColor: '#E3B505' },

  { id: 'mother1', name: 'Grid 1', x: 3, y: 2, image: images.mother, pulseColor: '#E3B505' },

  { id: 'mother1child1', name: 'Piston', x: 4, y: 1, image: images.piston, pulseColor: '#E3B505' },
  { id: 'mother1child2', name: 'Rotor', x: 2, y: 1, image: images.rotor, pulseColor: '#E3B505' },
  // { id: 'mother1child3', name: 'Landing Gear', x: 2, y: 3, image: images.landingGear, pulseColor: '#E3B505' },
  { id: 'mother1child4', name: 'Programmable Block', x: 4, y: 3, image: images.programmableBlock, pulseColor: '#E3B505' },

  { id: 'mother2', name: 'Grid 2', x: 6, y: 2, image: images.mother, pulseColor: '#E3B505' },

  { id: 'mother2child1', name: 'Light', x: 7, y: 1, image: images.light, pulseColor: '#E3B505' },
  { id: 'mother2child2', name: 'Sensor', x: 7, y: 3, image: images.sensor, pulseColor: '#E3B505' }
])

const connections = ref([
  { source: 'root1', target: 'mother1' },
  { source: 'root2', target: 'mother1' },

  { source: 'mother1', target: 'mother2' },
  { source: 'mother2', target: 'mother1' },

  { source: 'mother1', target: 'mother1child1' },
  { source: 'mother1', target: 'mother1child2' },
  // { source: 'mother1', target: 'mother1child3' },
  { source: 'mother1', target: 'mother1child4' },

  { source: 'mother2', target: 'mother2child1' },
  { source: 'mother2', target: 'mother2child2' },
  { source: 'mother2child2', target: 'mother2' }
])

onMounted(async () => {
  // run 
  triggerPulseSequences();

  setInterval(async () => triggerPulseSequences(), 4000)
})

const firstPulseSequence = [
    { from: 'Button', to: 'Grid 1', color: '#E3B505', duration: 0.5 },
    { from: 'Grid 1', to: 'Piston', color: '#E3B505', duration: 0.5 }
]

const secondPulseSequence = [
    { from: 'Connector', to: 'Grid 1', color: '#00B0FF', duration: 0.5 },
    { from: 'Grid 1', to: 'Grid 2', color: '#00B0FF', duration: 0.5 },
    { from: 'Grid 2', to: 'Light', color: '#00B0FF', duration: 0.5 },
]

const thirdPulseSequence = [
    { from: 'Sensor', to: 'Grid 2', color: '#FF4081', duration: 0.5 },
    { from: 'Grid 2', to: 'Grid 1', color: '#FF4081', duration: 0.5 },
    { from: 'Grid 1', to: 'Rotor', color: '#FF4081', duration: 0.5 }
]

async function triggerPulseSequences() {
  await diagram.value?.runPulseSequence(firstPulseSequence)
  await diagram.value?.runPulseSequence(secondPulseSequence)
  await diagram.value?.runPulseSequence(thirdPulseSequence)
}

</script>

<style scoped>
  .mother-os-diagram {
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
  }
</style>
