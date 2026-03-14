<template>
  <teleport v-if="target" :to="target">
    <slot></slot>
  </teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const target = ref(null)

onMounted(() => {
  // Find the .vp-features element and insert a placeholder after it
  const features = document.querySelector('.vp-hero')
  
  if (features) {
    const placeholder = document.createElement('div')
    placeholder.className = 'after-features-placeholder'
    features.insertAdjacentElement('afterend', placeholder)
    target.value = '.after-features-placeholder'
  }
})
</script>

<style scoped>
.after-hero-actions {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f0f8ff;
  border: 1px solid #ddd;
}
</style>
