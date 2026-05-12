<template>
  <div class="mother-gui-diagram">
    <CliDisplay ref="cli" title="Mother GUI Terminal" :maxLines="3" />
    <NodeDiagram ref="diagram" :nodes="nodes" :connections="connections" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CliDisplay from '../MotherOS/CliDisplay.vue'
import NodeDiagram from '../MotherOS/NodeDiagram.vue'

const images = {
  button: 'https://static.wikia.nocookie.net/spaceengineers/images/f/f2/Small_Button_Panel.png',
  programmableBlock: 'https://static.wikia.nocookie.net/spaceengineers/images/7/76/Icon_Block_Programmable_Block.png',
  rotor: 'https://static.wikia.nocookie.net/spaceengineers/images/9/9c/Icon_Block_Rotor.png',
  piston: 'https://static.wikia.nocookie.net/spaceengineers/images/2/28/Icon_Block_Piston.png',
  display: 'images/logo-512x512.png',
}

const diagram = ref(null)
const cli = ref(null)

const nodes = ref([
  { id: 'button', name: 'Button', x: 1, y: 2, image: images.button, pulseColor: '#E3B505' },
  { id: 'mother', name: 'Mother GUI', x: 3, y: 2, image: images.programmableBlock, pulseColor: '#E3B505' },
  { id: 'lcd', name: 'Bridge LCD', x: 5, y: 1, image: images.display, pulseColor: '#00B0FF' },
  { id: 'cockpit', name: 'Cockpit', x: 5, y: 3, image: images.display, pulseColor: '#00B0FF' },
  { id: 'rotor', name: 'Port Rotor', x: 7, y: 1, image: images.rotor, pulseColor: '#FF4081' },
  { id: 'piston', name: 'Lift Piston', x: 7, y: 2, image: images.piston, pulseColor: '#4CAF50' },
  { id: 'door', name: 'Hangar Door', x: 7, y: 3, image: images.display, pulseColor: '#00B0FF' },
])

const connections = ref([
  { source: 'button', target: 'mother' },
  { source: 'mother', target: 'lcd' },
  { source: 'mother', target: 'cockpit' },
  { source: 'rotor', target: 'mother' },
  { source: 'piston', target: 'mother' },
  { source: 'door', target: 'mother' },
])

const firstPulseSequence = [
  { from: 'Button', to: 'Mother GUI', color: '#E3B505', duration: 0.45 },
  { from: 'Mother GUI', to: 'Bridge LCD', color: '#E3B505', duration: 0.45 },
]

const secondPulseSequence = [
  { from: 'Rotor', to: 'Mother GUI', color: '#FF4081', duration: 0.45 },
  { from: 'Mother GUI', to: 'Cockpit', color: '#FF4081', duration: 0.45 },
]

const thirdPulseSequence = [
  { from: 'Piston', to: 'Mother GUI', color: '#4CAF50', duration: 0.45 },
  { from: 'Mother GUI', to: 'Bridge LCD', color: '#4CAF50', duration: 0.45 },
]

const commands = [
  { text: 'view/go "Bridge LCD" "MainMenu";', color: '#E3B505' },
  { text: 'view/go "Cockpit:0" "RotorView" "Port Rotor";', color: '#FF4081' },
  { text: 'view/go "Bridge LCD" "PistonView" "Lift Piston";', color: '#4CAF50' },
]

onMounted(() => {
  triggerPulseSequences()
  setInterval(() => triggerPulseSequences(), 4000)
})

async function triggerPulseSequences() {
  cli.value?.clear()

  cli.value?.addLine(commands[0])
  await diagram.value?.runPulseSequence(firstPulseSequence)

  cli.value?.addLine(commands[1])
  await diagram.value?.runPulseSequence(secondPulseSequence)

  cli.value?.addLine(commands[2])
  await diagram.value?.runPulseSequence(thirdPulseSequence)
}
</script>

<style scoped>
.mother-gui-diagram {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}
</style>