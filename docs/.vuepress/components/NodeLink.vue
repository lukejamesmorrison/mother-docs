<template>
  <g>
    <line
      :x1="x1"
      :y1="y1"
      :x2="x2"
      :y2="y2"
      stroke="#ccc"
      stroke-width="4"
      stroke-linecap="round"
    />
    <circle
      ref="pulse"
      :cx="x1"
      :cy="y1"
      r="10"
      :fill="color"
    />
  </g>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  source: Object,
  target: Object,
  color: String
})

const CELL_SIZE = 100
const pulse = ref(null)

const x1 = props.source.x * CELL_SIZE
const y1 = props.source.y * CELL_SIZE
const x2 = props.target.x * CELL_SIZE
const y2 = props.target.y * CELL_SIZE

function animatePulse(onComplete, options = {}) {

    const { color = props.color, duration = 0.75, delay = 0 } = options

  gsap.fromTo(pulse.value, {
    attr: { cx: x1, cy: y1 },
    opacity: 1,
    fill: color
  }, {
    attr: { cx: x2, cy: y2 },
    opacity: 1,
    duration,
    delay,
    ease: 'none',
    onComplete
  })
}

defineExpose({ animatePulse })
</script>
