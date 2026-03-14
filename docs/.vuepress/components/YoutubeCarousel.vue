<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

/**
 * YouTubeCarousel.vue
 *
 * Pass an array of YouTube video URLs via the `videos` prop.
 * Uses fade transitions instead of sliding to avoid iframe rendering issues.
 */

const props = defineProps({
  videos: { type: Array, default: () => [] },
  startIndex: { type: Number, default: 0 },
  autoplay: { type: Boolean, default: false },
  interval: { type: Number, default: 10000 },
  loop: { type: Boolean, default: true },
  showTitles: { type: Boolean, default: false },
})

const emit = defineEmits(['change'])

function extractVideoId(input) {
  if (!input) return null
  const url = typeof input === 'object' ? input.url : input
  if (!url) return null
  if (/^[\w-]{11}$/.test(url)) return url
  const watchMatch = url.match(/[?&]v=([\w-]{11})/)
  if (watchMatch) return watchMatch[1]
  const shortMatch = url.match(/youtu\.be\/([\w-]{11})/)
  if (shortMatch) return shortMatch[1]
  const embedMatch = url.match(/youtube\.com\/embed\/([\w-]{11})/)
  if (embedMatch) return embedMatch[1]
  return null
}

function getVideoTitle(input, index) {
  if (typeof input === 'object' && input.title) return input.title
  return `Video ${index + 1}`
}

const parsedVideos = computed(() => 
  props.videos
    .map((v, i) => {
      const id = extractVideoId(v)
      if (!id) return null
      return {
        id,
        title: getVideoTitle(v, i),
        embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
        thumbnailUrl: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      }
    })
    .filter(Boolean)
)

const count = computed(() => parsedVideos.value.length)
const current = ref(0)

// Current video computed property
const currentVideo = computed(() => parsedVideos.value[current.value] || null)

watch(count, (n) => {
  current.value = Math.min(Math.max(0, props.startIndex), Math.max(0, n - 1))
}, { immediate: true })

watch(current, (idx) => emit('change', idx))

// Autoplay carousel
let timer = null
const isHovered = ref(false)
const isVisible = ref(true)
const isAnimating = ref(false)

// Animation duration in CSS
const animationDuration = computed(() => `${props.interval}ms`)

function startAutoplay() {
  stopAutoplay()
  if (!props.autoplay || count.value <= 1) return
  isAnimating.value = true
  timer = setInterval(() => {
    if (isHovered.value || !isVisible.value) return
    next()
  }, Math.max(2500, props.interval))
}

function stopAutoplay() {
  if (timer) { clearInterval(timer); timer = null }
  isAnimating.value = false
}

function onVisibilityChange() {
  isVisible.value = !document.hidden
}

onMounted(() => {
  document.addEventListener('visibilitychange', onVisibilityChange)
  startAutoplay()
})

onBeforeUnmount(() => {
  stopAutoplay()
  document.removeEventListener('visibilitychange', onVisibilityChange)
})

function goTo(index) {
  if (index < 0) {
    current.value = props.loop ? count.value - 1 : 0
    return
  }
  if (index >= count.value) {
    current.value = props.loop ? 0 : count.value - 1
    return
  }
  current.value = index
}

function next() { goTo(current.value + 1) }
function prev() { goTo(current.value - 1) }

function onKeydown(e) {
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
}
</script>

<template>
  <section
    v-if="parsedVideos.length > 0"
    class="ytc"
    role="region"
    aria-roledescription="carousel"
    aria-label="Video carousel"
    tabindex="0"
    @keydown="onKeydown"
    @mouseenter="isHovered = true; stopAutoplay()"
    @mouseleave="isHovered = false; startAutoplay()"
  >
    <div class="ytc__viewport">
      <!-- Single iframe container - key forces complete re-render -->
      <div class="ytc__aspect">
        <iframe
          v-if="currentVideo"
          :key="currentVideo.id"
          class="ytc__iframe"
          :src="currentVideo.embedUrl"
          :title="currentVideo.title"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>

      <!-- Navigation controls -->
      <template v-if="count > 1">
        <button 
          class="ytc__control ytc__control--prev" 
          @click="prev" 
          aria-label="Previous video"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <button 
          class="ytc__control ytc__control--next" 
          @click="next" 
          aria-label="Next video"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </button>
      </template>
    </div>

    <!-- Title below video -->
    <div v-if="showTitles && currentVideo" class="ytc__caption">
      {{ currentVideo.title }}
    </div>

    <!-- Dot indicators -->
    <div v-if="count > 1" class="ytc__indicators">
      <button
        v-for="(video, i) in parsedVideos"
        :key="'dot-' + video.id"
        class="ytc__indicator"
        :class="{ 'is-active': i === current, 'is-animating': i === current && autoplay && isAnimating && !isHovered }"
        :aria-label="`Go to video ${i + 1}: ${video.title}`"
        @click="goTo(i)"
      >
        <span 
          v-if="i === current && autoplay && isAnimating && !isHovered"
          :key="`progress-${current}`"
          class="ytc__indicator-fill"
          :style="{ '--duration': animationDuration }"
        />
      </button>
    </div>

    <p class="ytc__sr" aria-live="polite">Video {{ current + 1 }} of {{ count }}</p>
  </section>
</template>

<style scoped>
.ytc {
  --ytc-bg: #111;
  --ytc-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  --ytc-control-bg: rgba(0, 0, 0, 0.6);
  --ytc-control-bg-hover: rgba(0, 0, 0, 0.8);
  --ytc-indicator-color: rgba(255, 255, 255, 0.5);
  --ytc-indicator-active: #fff;
  
  outline: none;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.ytc__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.ytc__viewport {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: var(--ytc-bg);
  box-shadow: var(--ytc-shadow);
}

/* 16:9 aspect ratio container */
.ytc__aspect {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: var(--ytc-bg);
}

.ytc__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.ytc__caption {
  color: #e8e8e8;
  font-size: 14px;
  line-height: 1.4;
  padding: 12px 16px;
  text-align: center;
}

/* Navigation controls */
.ytc__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: var(--ytc-control-bg);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.2s, transform 0.2s;
  z-index: 10;
}

.ytc__control:hover {
  background: var(--ytc-control-bg-hover);
}

.ytc__control:active {
  transform: translateY(-50%) scale(0.95);
}

.ytc__control svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

.ytc__control--prev {
  left: 12px;
}

.ytc__control--next {
  right: 12px;
}

/* Indicators */
.ytc__indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 16px 8px;
}

.ytc__indicator {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: var(--ytc-indicator-color);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: width 0.3s ease, background 0.2s;
  overflow: hidden;
}

.ytc__indicator:hover {
  background: rgba(255, 255, 255, 0.7);
}

.ytc__indicator.is-active {
  width: 32px;
  background: rgba(255, 255, 255, 0.3);
}

.ytc__indicator.is-animating {
  background: rgba(255, 255, 255, 0.3);
}

.ytc__indicator-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  background: var(--ytc-indicator-active);
  border-radius: 10px;
  animation: indicator-fill var(--duration, 5000ms) linear forwards;
}

@keyframes indicator-fill {
  to {
    width: 100%;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .ytc {
    max-width: 100%;
  }

  .ytc__viewport {
    border-radius: 8px;
  }

  .ytc__control {
    padding: 8px;
  }

  .ytc__control svg {
    width: 20px;
    height: 20px;
  }

  .ytc__control--prev {
    left: 8px;
  }

  .ytc__control--next {
    right: 8px;
  }

  .ytc__indicators {
    padding: 12px 8px;
    gap: 8px;
  }

  .ytc__indicator {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 480px) {
  .ytc__control {
    padding: 6px;
  }

  .ytc__control svg {
    width: 18px;
    height: 18px;
  }

  .ytc__control--prev {
    left: 4px;
  }

  .ytc__control--next {
    right: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ytc__control,
  .ytc__indicator {
    transition: none;
  }
}
</style>
