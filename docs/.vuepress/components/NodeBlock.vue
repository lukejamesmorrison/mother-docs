<template>
  <g :transform="`translate(${node.x * CELL_SIZE}, ${node.y * CELL_SIZE})`" class="cursor-pointer">
    <circle r="35" fill="transparent" stroke="#ccc" stroke-width="0" />
    <image :href="node.image" x="-28" y="-28" width="56" height="56" />
    <text x="0" y="45" text-anchor="middle" font-size="14" fill="#333">{{ node.name }}</text>
  </g>
</template>

<script setup>
const props = defineProps({ node: Object })
const CELL_SIZE = 100
</script>
