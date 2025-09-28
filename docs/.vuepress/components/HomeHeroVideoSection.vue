<template>
  <teleport v-if="target" :to="target">
    <!-- <div class="after-hero-actions">
      <h2>I'm after .vp-hero-actions!</h2>
      <p>This was teleported from the markdown.</p>
      
    </div> -->

    <iframe width="100%" height="400" src="https://www.youtube.com/embed/SLjJacXa5x0?si=E7Ajd_towPYF1UY2&amp;controls=1&amp;widget_referrer=https%3A%2F%2Flukejamesmorrison.github.io%2Fmother-docs%2F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/4HxctJCTvN8?si=37FHEr8EhFcuN0nL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
  </teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const target = ref(null)

onMounted(() => {
  // Find the .vp-features element and insert a placeholder after it
  const features = document.querySelector('.vp-hero-actions')
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
