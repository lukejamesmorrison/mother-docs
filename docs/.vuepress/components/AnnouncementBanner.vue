<template>
  <ClientOnly>
    <teleport v-if="targetReady" :to="targetSelector">
      <div class="announcement-banner" :class="{ 'banner-hidden': dismissed }">
        <div class="banner-content">
          <span class="banner-icon">{{ icon }}</span>
          <span class="banner-message">
            <slot></slot>
          </span>
          <router-link v-if="link" :to="link" class="banner-link">{{ linkText }}</router-link>
          <button v-if="dismissible" class="banner-dismiss" @click="dismiss" aria-label="Dismiss">
            ×
          </button>
        </div>
      </div>
    </teleport>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    default: '🚀'
  },
  link: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: 'Learn more →'
  },
  dismissible: {
    type: Boolean,
    default: true
  },
  storageKey: {
    type: String,
    default: 'announcement-dismissed'
  }
})

const targetReady = ref(false)
const targetSelector = ref(null)
const dismissed = ref(false)

onMounted(() => {
  // Check if user previously dismissed this banner
  if (props.dismissible && localStorage.getItem(props.storageKey)) {
    dismissed.value = true
  }
  
  // Find the hero and insert placeholder before it
  const hero = document.querySelector('.vp-hero')
  if (hero && hero.parentElement) {
    const placeholder = document.createElement('div')
    placeholder.className = 'announcement-banner-placeholder'
    hero.parentElement.insertBefore(placeholder, hero)
    targetSelector.value = '.announcement-banner-placeholder'
    targetReady.value = true
  }
})

const dismiss = () => {
  dismissed.value = true
  if (props.storageKey) {
    localStorage.setItem(props.storageKey, 'true')
  }
}
</script>

<style scoped>
.announcement-banner {
  background: linear-gradient(135deg, var(--vp-c-accent) 0%, var(--vp-c-accent-bg) 100%);
  color: var(--vp-c-accent-text, white);
  padding: 0.6rem 1rem;
  text-align: center;
  z-index: 99;
  transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  max-height: 100px;
  overflow: hidden;
  /* Full viewport width */
  width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 0;
  margin-right: 0;
}

.banner-hidden {
  max-height: 0;
  padding: 0;
  opacity: 0;
  pointer-events: none;
}

.banner-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.banner-icon {
  font-size: 1.1rem;
}

.banner-message {
  font-size: 0.9rem;
  font-weight: 500;
}

.banner-link {
  color: white;
  text-decoration: underline;
  font-weight: 600;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.banner-link:hover {
  opacity: 0.85;
}

.banner-dismiss {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0 0.25rem;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.banner-dismiss:hover {
  opacity: 1;
}

@media (max-width: 719px) {
  .banner-content {
    gap: 0.5rem;
  }
  
  .banner-message {
    font-size: 0.85rem;
  }
}
</style>
