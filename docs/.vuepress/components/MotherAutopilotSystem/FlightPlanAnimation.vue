<template>
  <div class="flight-plan-animation">
    <div class="flight-plan-header">
      <span class="route-label">{{ currentLeg }}</span>
    </div>
    
    <div class="flight-plan-container">
      <svg class="flight-plan-svg" :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
        <!-- Flight path lines -->
        <line 
          v-for="(segment, index) in pathSegments" 
          :key="'path-' + index"
          :x1="segment.x1"
          :y1="segment.y1"
          :x2="segment.x2"
          :y2="segment.y2"
          class="flight-path"
          :class="{ 'path-active': segment.active, 'path-completed': segment.completed }"
        />
        
        <!-- Waypoints -->
        <g v-for="(waypoint, index) in waypoints" :key="'wp-' + index">
          <!-- Waypoint marker -->
          <g :transform="`translate(${waypoint.x}, ${waypoint.y})`">
            <!-- Diamond shape for regular waypoints -->
            <rect 
              v-if="waypoint.type === 'waypoint'"
              :x="-10" :y="-10"
              width="20" height="20"
              fill="#FFD700"
              stroke="#FFD700"
              stroke-width="2"
              transform="rotate(45)"
              class="waypoint-marker"
            />
            <!-- Circle for ships/grids -->
            <circle 
              v-else-if="waypoint.type === 'grid'"
              r="12"
              :fill="waypoint.active ? '#4CAF50' : '#4CAF50'"
              :stroke="waypoint.active ? '#fff' : '#4CAF50'"
              stroke-width="2"
              class="waypoint-marker"
            />
            <!-- Triangle for current ship position -->
            <polygon 
              v-else-if="waypoint.type === 'ship'"
              points="0,-18 15,12 -15,12"
              :fill="waypoint.color || '#4CAF50'"
              stroke="#fff"
              stroke-width="2"
              class="ship-marker"
            />
          </g>
          
          <!-- Waypoint label -->
          <g :transform="`translate(${waypoint.labelX || waypoint.x}, ${waypoint.labelY || (waypoint.y - 30)})`">
            <text 
              class="waypoint-name"
              :text-anchor="waypoint.labelAnchor || 'middle'"
            >
              {{ waypoint.name }}
            </text>
            <text 
              v-if="waypoint.distance"
              class="waypoint-distance"
              :text-anchor="waypoint.labelAnchor || 'middle'"
              dy="14"
            >
              {{ waypoint.distance }}
            </text>
          </g>
          
          <!-- Waypoint commands -->
          <g v-if="waypoint.commands && waypoint.showCommands" 
             class="waypoint-commands-group"
             :transform="`translate(${waypoint.commandX || (waypoint.x + 30)}, ${waypoint.commandY || waypoint.y})`">
            <text 
              v-for="(cmd, cmdIndex) in waypoint.commands" 
              :key="'cmd-' + cmdIndex"
              class="waypoint-command"
              :class="{ 'command-active': waypoint.activeCommand === cmdIndex, 'command-completed': waypoint.completedCommands?.includes(cmdIndex) }"
              :dy="cmdIndex * 16"
            >
              <tspan class="command-arrow">→</tspan> {{ cmd }}
            </text>
          </g>
        </g>
        
        <!-- Animated ship -->
        <g :transform="`translate(${shipPosition.x}, ${shipPosition.y}) rotate(${shipPosition.rotation})`" class="ship">
          <polygon 
            points="0,-10 8,8 -8,8"
            fill="#4CAF50"
            stroke="#fff"
            stroke-width="2"
          />
          <!-- Engine glow -->
          <ellipse 
            cx="0" cy="10" rx="3" ry="5"
            fill="#FF6B35"
            class="engine-glow"
          />
        </g>
      </svg>
    </div>
    
    <!-- CLI Display -->
    <div class="cli-display">
      <div class="cli-header">
        <span class="cli-dot red"></span>
        <span class="cli-dot yellow"></span>
        <span class="cli-dot green"></span>
        <span class="cli-title">Flight Plan Console</span>
      </div>
      <div class="cli-content">
        <div 
          v-for="(line, index) in cliLines" 
          :key="index" 
          class="cli-line"
          :class="{ 'cli-line-active': line.active }"
        >
          <span class="cli-prompt">{{ line.prompt }}</span>
          <span class="cli-command" :style="{ color: line.color }">{{ line.text }}</span>
        </div>
        <div class="cli-cursor">_</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const viewBox = "0 0 700 200"

// Ship position state
const shipPosition = ref({ x: 60, y: 150, rotation: -45 })
const currentWaypointIndex = ref(0)

// CLI lines state
const cliLines = ref([])
const maxCliLines = 5

// Current leg display
const currentLeg = computed(() => {
  const fromWp = waypoints.value[currentWaypointIndex.value]
  const toIdx = (currentWaypointIndex.value + 1) % flightPlanWaypoints.length
  const toWp = waypoints.value.find(w => w.id === flightPlanWaypoints[toIdx])
  if (fromWp && toWp) {
    return `${fromWp.name} → ${toWp.name}`
  }
  return 'Flight Plan Active'
})

// Flight plan waypoints (order of travel)
const flightPlanWaypoints = ['mothership', 'hyperion', 'landing']

// All waypoints in the scene
const waypoints = ref([
  { 
    id: 'mothership',
    name: 'Mothership', 
    x: 60, y: 150, 
    type: 'grid',
    distance: '34.5 km',
    labelY: 180,
    commands: null,
    active: true,
    completed: false,
    showCommands: false
  },
  { 
    id: 'hyperion',
    name: 'HyperionOutpost', 
    x: 350, y: 60, 
    type: 'waypoint',
    distance: '67.2 km',
    labelY: 25,
    labelX: 350,
    commandX: 385,
    commandY: 50,
    commands: ['LightsOff', 'SetCruiseSpeed'],
    cliCommands: [
      'block/off FormationLights;',
      'fcs/start --speed=100;'
    ],
    active: false,
    completed: false,
    showCommands: true,
    activeCommand: -1,
    completedCommands: []
  },
  { 
    id: 'landing',
    name: 'LandingSite', 
    x: 640, y: 140, 
    type: 'waypoint',
    distance: '546.1 km',
    labelX: 640,
    labelY: 175,
    commandX: 470,
    commandY: 95,
    commands: ['LightsOn', 'SetApproachSpeed', 'ExtendLandingGear'],
    cliCommands: [
      'block/on FormationLights; light/color FormationLights white;',
      'fcs/start --speed=25;',
      'piston/distance LandingGears 5; rotor/rotate LandingGearRotors 50 --share;'
    ],
    active: false,
    completed: false,
    showCommands: true,
    activeCommand: -1,
    completedCommands: []
  }
])

// Path segments connecting waypoints (straight lines)
const pathSegments = computed(() => [
  { 
    x1: 60, y1: 150,
    x2: 350, y2: 60,
    active: currentWaypointIndex.value === 0,
    completed: currentWaypointIndex.value > 0
  },
  { 
    x1: 350, y1: 60,
    x2: 640, y2: 140,
    active: currentWaypointIndex.value === 1,
    completed: currentWaypointIndex.value > 1
  }
])

// Animation state
let animationFrame = null
let startTime = null
const segmentDuration = 2500 // ms per segment
const commandDelay = 800 // ms between commands

// Linear interpolation for straight lines
function lerp(a, b, t) {
  return a + (b - a) * t
}

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI) + 90
}

// Path definitions for animation (start and end points)
const animationPaths = [
  { start: { x: 60, y: 150 }, end: { x: 350, y: 60 } },
  { start: { x: 350, y: 60 }, end: { x: 640, y: 140 } }
]

// Map segment index to waypoint for command execution
const segmentToWaypoint = {
  0: 'hyperion',
  1: 'landing'
}

// CLI functions
function addCliLine(text, color = '#4CAF50') {
  cliLines.value.forEach(line => line.active = false)
  cliLines.value.push({
    prompt: '> ',
    text,
    color,
    active: true
  })
  if (cliLines.value.length > maxCliLines) {
    cliLines.value.shift()
  }
}

function clearCli() {
  cliLines.value = []
}

async function executeCommands(waypointId) {
  const waypoint = waypoints.value.find(w => w.id === waypointId)
  if (!waypoint || !waypoint.commands) return
  
  waypoint.active = true
  addCliLine(`Arrived at ${waypoint.name}`, '#888')
  await sleep(400)
  
  const cliCmds = waypoint.cliCommands || waypoint.commands
  for (let i = 0; i < waypoint.commands.length; i++) {
    waypoint.activeCommand = i
    addCliLine(cliCmds[i], '#FFD700')
    await sleep(commandDelay)
    waypoint.completedCommands.push(i)
    waypoint.activeCommand = -1
  }
  waypoint.completed = true
  waypoint.active = false
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function animateSegment(segmentIndex) {
  return new Promise((resolve) => {
    const path = animationPaths[segmentIndex]
    if (!path) {
      resolve()
      return
    }
    
    const rotation = getAngle(path.start.x, path.start.y, path.end.x, path.end.y)
    startTime = performance.now()
    
    function step(timestamp) {
      const elapsed = timestamp - startTime
      const t = Math.min(elapsed / segmentDuration, 1)
      
      // Easing function for smoother animation
      const easeT = t < 0.5 
        ? 2 * t * t 
        : 1 - Math.pow(-2 * t + 2, 2) / 2
      
      const x = lerp(path.start.x, path.end.x, easeT)
      const y = lerp(path.start.y, path.end.y, easeT)
      
      shipPosition.value = { x, y, rotation }
      
      if (t < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        resolve()
      }
    }
    
    animationFrame = requestAnimationFrame(step)
  })
}

async function runFlightPlan() {
  // Reset state
  clearCli()
  waypoints.value.forEach(w => {
    w.active = false
    w.completed = false
    w.activeCommand = -1
    if (w.completedCommands) w.completedCommands = []
  })
  waypoints.value[0].active = true // Mothership active
  
  currentWaypointIndex.value = 0
  shipPosition.value = { x: 60, y: 150, rotation: -45 }
  
  addCliLine('Initiating flight plan...', '#888')
  await sleep(1000)
  addCliLine(`Departing ${waypoints.value[0].name}`, '#4CAF50')
  await sleep(500)
  
  // Fly each segment
  for (let i = 0; i < animationPaths.length; i++) {
    currentWaypointIndex.value = i
    
    // Animate ship along path
    await animateSegment(i)
    
    // Execute commands at destination waypoint
    const destWaypointId = segmentToWaypoint[i]
    if (destWaypointId) {
      await executeCommands(destWaypointId)
    }
    
    await sleep(500)
  }
  
  addCliLine('Flight plan complete', '#4CAF50')
  
  // Pause at end, then restart
  await sleep(3000)
  runFlightPlan()
}

onMounted(() => {
  runFlightPlan()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
})
</script>

<style scoped>
.flight-plan-animation {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background: var(--cli-c-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--cli-c-border);
  box-shadow: 0 4px 20px var(--cli-c-shadow);
}

.flight-plan-header {
  background: var(--cli-c-bg-elv);
  padding: 10px 20px;
  border-bottom: 1px solid var(--cli-c-border);
}

.route-label {
  color: var(--cli-c-text);
  font-size: 16px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
}

.flight-plan-container {
  position: relative;
  padding: 15px;
}

.flight-plan-svg {
  width: 100%;
  height: auto;
  min-height: 180px;
}

/* Flight path styling */
.flight-path {
  fill: none;
  stroke: var(--cli-c-border);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: stroke 0.3s ease;
}

.flight-path.path-active {
  stroke: var(--cli-c-text-mute);
  stroke-dasharray: 8, 4;
  animation: dash 0.5s linear infinite;
}

.flight-path.path-completed {
  stroke: var(--cli-c-text);
}

@keyframes dash {
  to {
    stroke-dashoffset: -12;
  }
}

/* Waypoint markers */
.waypoint-marker {
  transition: all 0.3s ease;
}

.ship-marker {
  filter: drop-shadow(0 0 6px rgba(76, 175, 80, 0.6));
}

/* Text styling */
.waypoint-name {
  fill: var(--cli-c-text);
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-base);
}

.waypoint-distance {
  fill: var(--cli-c-text-mute);
  font-size: 11px;
  font-family: var(--vp-font-family-mono);
}

.waypoint-command {
  fill: var(--cli-c-accent);
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.waypoint-command.command-active {
  fill: #FFD700;
  opacity: 1;
  font-weight: 600;
}

.waypoint-command.command-completed {
  fill: var(--cli-c-accent);
  opacity: 1;
}

.command-arrow {
  fill: var(--cli-c-text);
}

/* Ship styling */
.ship {
  filter: drop-shadow(0 0 8px rgba(76, 175, 80, 0.8));
  transition: transform 0.1s linear;
}

.engine-glow {
  animation: pulse 0.3s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 0.6;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* CLI Display */
.cli-display {
  background: var(--cli-c-bg);
  border-top: 1px solid var(--cli-c-border);
  font-family: var(--vp-font-family-mono);
}

.cli-header {
  background: var(--cli-c-bg-elv);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid var(--cli-c-border);
}

.cli-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.cli-dot.red { background: var(--cli-c-dot-red); }
.cli-dot.yellow { background: var(--cli-c-dot-yellow); }
.cli-dot.green { background: var(--cli-c-dot-green); }

.cli-title {
  margin-left: 8px;
  color: var(--cli-c-text-mute);
  font-size: 12px;
}

.cli-content {
  padding: 10px 16px;
  min-height: 110px;
  overflow: hidden;
}

.cli-line {
  display: flex;
  margin-bottom: 4px;
  opacity: 0.5;
  transition: opacity 0.3s ease;
  font-size: 12px;
}

.cli-line-active {
  opacity: 1;
}

.cli-prompt {
  color: var(--cli-c-accent);
  margin-right: 8px;
}

.cli-command {
  font-weight: 500;
  color: var(--cli-c-text);
}

.cli-cursor {
  color: var(--cli-c-accent);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* Info box */
.flight-info-box {
  position: absolute;
  bottom: 40px;
  left: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 16px 20px;
  max-width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.info-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.info-text {
  font-size: 14px;
  color: #444;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .flight-plan-header {
    padding: 8px 16px;
  }
  
  .route-label {
    font-size: 14px;
  }
  
  .flight-plan-container {
    padding: 10px;
  }
  
  .flight-plan-svg {
    min-height: 150px;
  }
  
  .flight-info-box {
    position: relative;
    bottom: auto;
    left: auto;
    margin-top: 20px;
    max-width: 100%;
  }
  
  .waypoint-name {
    font-size: 11px;
  }
  
  .waypoint-distance {
    font-size: 9px;
  }
  
  .waypoint-command {
    display: none;
  }
  
  .waypoint-commands-group {
    display: none;
  }
  
  .cli-content {
    min-height: 90px;
  }
  
  .cli-line {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .route-label {
    font-size: 12px;
  }
  
  .waypoint-name {
    font-size: 10px;
  }
  
  .waypoint-distance {
    display: none;
  }
}
</style>
