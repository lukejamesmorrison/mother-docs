<template>
  <svg class="w-full h-auto" :viewBox="viewBox">
    <!-- Pulse Lines -->
    <NodeLink
      v-for="(link, index) in connections"
      :key="`${link.source}-${link.target}`"
      :ref="el => setLinkRef(link, el)"
      :source="getNode(link.source)"
      :target="getNode(link.target)"
      :color="getNode(link.source).pulseColor"
    />

    <!-- Nodes -->
    <NodeBlock
      v-for="node in nodes"
      :key="node.id"
      :node="node"
    />
  </svg>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, defineExpose } from 'vue'
import NodeLink from './NodeLink.vue'
import NodeBlock from './NodeBlock.vue'

const props = defineProps({
  nodes: Array,
  connections: Array
})

// === Constants ===
const CELL_SIZE = 100
const GRID_COLS = 8
const GRID_ROWS = 4

const viewBox = computed(() => `0 0 ${GRID_COLS * CELL_SIZE} ${GRID_ROWS * CELL_SIZE}`)

// === Refs ===
const linkRefs = ref({}) // Use object instead of array

const setLinkRef = (link, el) => {
  if (el) {
    const key = `${link.source}-${link.target}`
    linkRefs.value[key] = el
  }
}

// === Utility ===
const getNode = (id) => props.nodes.find(n => n.id === id)
const getNodeByName = (name) => props.nodes.find(n => n.name === name)

// === Pulse Animation ===
// Set your animation path using node names
// const animationPath = ref(['Button', 'Mother', 'Piston'])

async function runPulseSequence(sequence = []) {
  await nextTick()

  // Support flat or grouped arrays
  const batches = Array.isArray(sequence[0]) ? sequence : sequence.map(s => [s])

  for (const batch of batches) {
    await Promise.all(
      batch.map(segment => {
        const from = getNodeByName(segment.from)
        const to = getNodeByName(segment.to)
        if (!from || !to) return Promise.resolve()

        const linkIndex = props.connections.findIndex(
          c => c.source === from.id && c.target === to.id
        )
        const key = `${from.id}-${to.id}`
        const linkRef = linkRefs.value[key]
        if (!linkRef?.animatePulse) return Promise.resolve()

        return new Promise(resolve =>
          linkRef.animatePulse(resolve, {
            color: segment.color || from.pulseColor,
            duration: segment.duration || 1.25,
          })
        )
      })
    )
  }
}





// // Auto-run on mount (optional)
// onMounted(() => {
//   runPulseSequence()
// })

// Expose method to parent
defineExpose({
  runPulseSequence
})
</script>
