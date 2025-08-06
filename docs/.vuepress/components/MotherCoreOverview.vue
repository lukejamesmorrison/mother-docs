<template>
  <div class="spaceship-feature">
    <div class="row">
      <!-- Spaceship + Lines -->
      <div class="ship-container">
        <svg
          ref="svgEl"
          viewBox="0 0 960 450"
          xmlns="http://www.w3.org/2000/svg"
          class="ship-svg"
        >

   

          <!-- Spaceship image -->
          <image href="/images/soyuz.svg" width="960" height="450" />

          <!-- Lines -->
          <line
            class="line"
            v-for="(block, index) in blocks"
            :key="block.id"
            :x1="block.x1"
            :y1="block.y1"
            :x2="block.x2"
            :y2="block.y2"
            :stroke="isActive(index) ? '#e11d48' : '#9ca3af'"
            :stroke-width="isActive(index) ? 3 : 1"
            stroke-linecap="round"
            :ref="el => lineEls[index] = el"
          />

        <!-- Marker images with background -->
        <g
            v-for="(block, index) in blocks"
            :key="'icon-' + block.id"
            >
            <!-- Background circle -->
            <circle
                :cx="block.x1"
                :cy="block.y1"
                r="20"
                fill="white"
            />

            <!-- Marker image -->
            <image
                href="/images/logo-32x32.png"
                :x="block.x1 - 16"
                :y="block.y1 - 16"
                width="32"
                height="32"
                style="cursor: pointer;"
                :opacity="isActive(index) ? 1 : 0.5"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave"
                @click="handleClick(index)"
            />
        </g>

        
      

        </svg>
      </div>

      <!-- Blocks -->
      <div class="blocks-container">
        <span style="font-weight: bold; font-size: 1.25rem;">Build a Custom</span>
        <div
          v-for="(block, index) in blocks"
          :key="block.id"
          class="block"
          :class="{ active: isActive(index) }"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
            @click="handleClick(index)"
        >
          <span class="block-title">{{ block.title }}</span>
          <span class="block-description">{{ block.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const svgEl = ref(null)
const lineEls = []
const activeIndex = ref(0)
const hoverIndex = ref(null)
let intervalId = null
let resumeTimeout = null

const blocks = [
  { 
    id: 'propulsion', 
    title: 'Propulsion System', 
    description: 'Control thruster state and integrate complex launch and landing sequences', 
    x1: 640, y1: 75, x2: 960, y2: 70
  },
  { 
    id: 'navigation', 
    title: 'Navigation Computer', 
    description: 'Use the Almanac to build your own routes and tactical manoeuvres', 
    x1: 490, y1: 200, x2: 960, y2: 260
  },
  { 
    id: 'comms', 
    title: 'Communications Hub', 
    description: 'Send complex messages to other grids and orchestrate a galactic fleet', 
    x1: 340, y1: 320, x2: 960, y2: 440
  }
]

const isActive = (index) => hoverIndex.value === index || activeIndex.value === index

const animateLine = (index) => {
  if (!lineEls[index]) return
  gsap.fromTo(
    lineEls[index],
    { strokeDasharray: 500, strokeDashoffset: 500 },
    { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }
  )
}

const startRotation = () => {
  stopRotation()
  intervalId = setInterval(() => {
    if (hoverIndex.value !== null) return
    activeIndex.value = (activeIndex.value + 1) % blocks.length
    animateLine(activeIndex.value)
  }, 5000)
}

const stopRotation = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = null
}

const handleMouseEnter = (index) => {
  stopRotation()
  hoverIndex.value = index
  activeIndex.value = index
  animateLine(index)
}

const handleMouseLeave = () => {
  hoverIndex.value = null
  startRotation()
}

const handleClick = (index) => {
  stopRotation()
  clearTimeout(resumeTimeout)
  activeIndex.value = index
  hoverIndex.value = index
  animateLine(index)
  resumeTimeout = setTimeout(() => {
    hoverIndex.value = null
    startRotation()
  }, 5000)
}

onMounted(() => {
  startRotation()
  animateLine(activeIndex.value)
})

onBeforeUnmount(() => {
  stopRotation()
  clearTimeout(resumeTimeout)
})
</script>


<style scoped>
.spaceship-feature {
  max-width: 960px;
  margin: 2rem auto;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ship-container {
  width: 66.6%;
  margin: 1.5rem 0;;
}

.blocks-container {
  width: 33.3%;
  margin-left: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ship-svg {
  display: block;
  width: 100%;
  height: auto;
}

.block {
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 1rem;
    background: white;
    transition: border-color 0.3s, background-color 0.3s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
    

.block-title {
    display: block;
    color: #525252;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
}

.block-description {
    display: block;
  font-size: 0.875rem;
  color: #525252;
  margin: 0;
  padding: 0;
    line-height: 1.5;
}

.block.active {
  border-color: #e11d48;
  background-color: #ffe4e6;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }
  .ship-container, .blocks-container {
    width: 100%;
    margin-left: 0;
  }
  .line {
    display: none;
  }
}
</style>
