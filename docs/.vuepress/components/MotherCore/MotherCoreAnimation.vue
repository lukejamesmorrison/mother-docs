<template>
  <div class="mother-core-diagram">
    <CliDisplay ref="cli" title="Terminal - Your Script" :maxLines="3" />
    <div class="diagram-container">
      <svg class="core-svg" :viewBox="viewBox">
        <!-- Connection Lines (static) -->
        <line
          v-for="conn in connections"
          :key="`line-${conn.source}-${conn.target}`"
          :x1="getNode(conn.source).x"
          :y1="getNode(conn.source).y"
          :x2="getNode(conn.target).x"
          :y2="getNode(conn.target).y"
          stroke="#444"
          stroke-width="2"
          stroke-dasharray="8,4"
          class="connection-line"
        />
        
        <!-- Pulse circles (animated) -->
        <circle
          v-for="conn in connections"
          :key="`pulse-${conn.source}-${conn.target}`"
          :ref="el => setPulseRef(conn, el)"
          r="10"
          fill="#E3B505"
          opacity="0"
        />

        <!-- Nodes -->
        <g
          v-for="node in nodes"
          :key="node.id"
          :transform="`translate(${node.x}, ${node.y})`"
          class="script-node"
        >
          <!-- Outer glow ring -->
          <circle
            r="60"
            :fill="node.bgColor"
            :stroke="node.color"
            stroke-width="3"
            class="node-ring"
          />
          
          <!-- Icon -->
          <image
            :href="node.icon"
            x="-24"
            y="-35"
            width="48"
            height="48"
          />
          
          <!-- Label -->
          <text
            y="30"
            text-anchor="middle"
            class="node-label"
            :fill="node.color"
          >{{ node.name }}</text>

          <!-- Command badges -->
          <g class="command-badges">
            <g
              v-for="(cmd, idx) in node.commands"
              :key="cmd"
              :transform="`translate(${getBadgeX(idx, node.commands.length)}, 55)`"
            >
              <rect
                :width="cmd.length * 6 + 12"
                height="18"
                :x="-(cmd.length * 6 + 12) / 2"
                y="-9"
                rx="9"
                :fill="node.badgeColor"
                opacity="0.9"
              />
              <text
                text-anchor="middle"
                y="4"
                font-size="10"
                fill="#fff"
                font-family="monospace"
              >{{ cmd }}</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
    
    <!-- Legend -->
    <!-- <div class="legend">
      <div class="legend-item">
        <span class="legend-dot" style="background: #E3B505"></span>
        <span>Local Command</span>
      </div>
      <div class="legend-item">
        <span class="legend-dot" style="background: #00B0FF"></span>
        <span>Remote Command</span>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import CliDisplay from '../MotherOS/CliDisplay.vue'

// SVG dimensions
const WIDTH = 600
const HEIGHT = 350
const viewBox = computed(() => `0 0 ${WIDTH} ${HEIGHT}`)

// Programmable block icon for all nodes
const PB_ICON = 'https://static.wikia.nocookie.net/spaceengineers/images/7/76/Icon_Block_Programmable_Block.png'

// Node positions (triangle layout)
// Your Script = Local (yellow), MOS & MAPS = Remote (blue)
const nodes = ref([
  {
    id: 'motheros',
    name: 'Mother OS',
    x: 150,
    y: 280,
    icon: PB_ICON,
    color: '#00B0FF',
    bgColor: 'rgba(0, 176, 255, 0.1)',
    badgeColor: '#00B0FF',
    commands: ['light', 'block', 'piston']
  },
  {
    id: 'maps',
    name: 'MAPS',
    x: WIDTH - 150,
    y: 280,
    icon: PB_ICON,
    color: '#00B0FF',
    bgColor: 'rgba(0, 176, 255, 0.1)',
    badgeColor: '#00B0FF',
    commands: ['dock', 'fcs', 'fp']
  },
  {
    id: 'yourscript',
    name: 'Your Script',
    x: WIDTH / 2,
    y: 80,
    icon: PB_ICON,
    color: '#E3B505',
    bgColor: 'rgba(227, 181, 5, 0.1)',
    badgeColor: '#E3B505',
    commands: ['party', 'alert']
  }
])

// Connections between all nodes (bidirectional mesh)
const connections = ref([
  { source: 'motheros', target: 'maps' },
  { source: 'maps', target: 'motheros' },
  { source: 'motheros', target: 'yourscript' },
  { source: 'yourscript', target: 'motheros' },
  { source: 'maps', target: 'yourscript' },
  { source: 'yourscript', target: 'maps' }
])

// Refs
const cli = ref(null)
const pulseRefs = ref({})
let animationInterval = null

const setPulseRef = (conn, el) => {
  if (el) {
    pulseRefs.value[`${conn.source}-${conn.target}`] = el
  }
}

const getNode = (id) => nodes.value.find(n => n.id === id)

const getBadgeX = (idx, total) => {
  const spacing = 55
  const offset = ((total - 1) * spacing) / 2
  return idx * spacing - offset
}

// Animation sequences - Your Script is local, calling remote commands on MOS & MAPS
const sequences = [
  {
    command: { text: 'party/start', color: '#E3B505' },
    description: 'Your Script runs a local command',
    pulses: []
  },
  {
    command: { text: 'block/on HangarLights; light/color HangarLights red;', color: '#00B0FF' },
    description: 'Your Script calls Mother OS remotely',
    pulses: [
      { from: 'yourscript', to: 'motheros', color: '#00B0FF' }
    ]
  },
  {
    command: { text: 'fp/set "{ Mothership }"; fcs/start;', color: '#00B0FF' },
    description: 'Your Script calls MAPS navigation remotely',
    pulses: [
      { from: 'yourscript', to: 'maps', color: '#00B0FF' }
    ]
  },
  {
    command: { text: 'door/close HangarDoor; dock LandingSite;', color: '#00B0FF' },
    description: 'Your Script orchestrates multi-script docking',
    pulses: [
      { from: 'yourscript', to: 'motheros', color: '#00B0FF' },
      { from: 'yourscript', to: 'maps', color: '#00B0FF', delay: 0.3 }
    ]
  }
]

async function animatePulse(from, to, color, delay = 0) {
  const key = `${from}-${to}`
  const pulseEl = pulseRefs.value[key]
  if (!pulseEl) return

  const sourceNode = getNode(from)
  const targetNode = getNode(to)

  return new Promise(resolve => {
    gsap.set(pulseEl, {
      attr: { cx: sourceNode.x, cy: sourceNode.y, fill: color },
      opacity: 0
    })

    gsap.timeline()
      .to(pulseEl, {
        opacity: 1,
        duration: 0.15,
        delay
      })
      .to(pulseEl, {
        attr: { cx: targetNode.x, cy: targetNode.y },
        duration: 0.6,
        ease: 'power2.inOut'
      })
      .to(pulseEl, {
        opacity: 0,
        duration: 0.15,
        onComplete: resolve
      })
  })
}

async function runSequence(seq) {
  cli.value?.addLine(seq.command)
  
  await Promise.all(
    seq.pulses.map(p => animatePulse(p.from, p.to, p.color, p.delay || 0))
  )
  
  // Pause between sequences
  await new Promise(r => setTimeout(r, 800))
}

let sequenceIndex = 0

async function runAnimationLoop() {
  cli.value?.clear()
  
  for (const seq of sequences) {
    await runSequence(seq)
  }
  
  // Pause before restarting
  await new Promise(r => setTimeout(r, 1500))
}

onMounted(async () => {
  // Initial delay
  await new Promise(r => setTimeout(r, 500))
  
  // Run loop
  const loop = async () => {
    await runAnimationLoop()
    animationInterval = setTimeout(loop, 100)
  }
  loop()
})

onBeforeUnmount(() => {
  if (animationInterval) clearTimeout(animationInterval)
})
</script>

<style scoped>
.mother-core-diagram {
  width: 100%;
  max-width: 700px;
  margin: 2rem auto;
}

.diagram-container {
  background: var(--vp-c-bg-alt);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  border: 1px solid var(--vp-c-border);
}

.core-svg {
  width: 100%;
  height: auto;
}

.connection-line {
  opacity: 0.5;
}

.script-node {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.script-node:hover {
  transform: scale(1.05);
}

.node-ring {
  transition: all 0.3s ease;
}

.script-node:hover .node-ring {
  stroke-width: 4;
  filter: drop-shadow(0 0 8px currentColor);
}

.node-label {
  font-size: 14px;
  font-weight: 600;
}

.command-badges text {
  pointer-events: none;
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

@media (max-width: 600px) {
  .legend {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
}
</style>
