<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

/**
 * FeaturedCarousel.vue
 *
 * A hero-style carousel for showcasing featured grids or scripts.
 * Each slide shows a large image alongside content (title, author, tags, description, link).
 * Inspired by YoutubeCarousel.vue — same autoplay, dot-progress, and keyboard nav patterns.
 */

const props = defineProps({
  items: { type: Array, default: () => [] },
  autoplay: { type: Boolean, default: true },
  interval: { type: Number, default: 7000 },
  loop: { type: Boolean, default: true },
})

const emit = defineEmits(['change'])

const current = ref(0)
const count = computed(() => props.items.length)
const currentItem = computed(() => props.items[current.value] || null)

watch(current, (idx) => emit('change', idx))

// Autoplay
let timer = null
const isHovered = ref(false)
const isVisible = ref(true)
const isAnimating = ref(false)
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
    v-if="items.length > 0"
    class="fc"
    role="region"
    aria-roledescription="carousel"
    aria-label="Featured items carousel"
    tabindex="0"
    @keydown="onKeydown"
    @mouseenter="isHovered = true; stopAutoplay()"
    @mouseleave="isHovered = false; startAutoplay()"
  >
    <div class="fc__card">
      <!-- Slide -->
      <Transition name="fc-fade" mode="out-in">
        <div v-if="currentItem" :key="current" class="fc__slide">
          <!-- Image -->
          <div class="fc__image-wrap">
            <img
              :src="currentItem.image_link"
              :alt="currentItem.name"
              class="fc__image"
            />
          </div>

          <!-- Content -->
          <div class="fc__content">
            <div class="fc__content-inner">
              <h3 class="fc__title">{{ currentItem.name }}</h3>
              <p class="fc__author">by {{ currentItem.author }}</p>

              <div
                v-if="currentItem.scripts?.length"
                class="fc__tags"
              >
                <span v-for="s in currentItem.scripts" :key="s" class="fc__pill">{{ s }}</span>
              </div>
              <div
                v-else-if="currentItem.tags?.length"
                class="fc__tags"
              >
                <span v-for="t in currentItem.tags" :key="t" class="fc__pill">{{ t }}</span>
              </div>

              <p class="fc__description">{{ currentItem.description }}</p>

              <a
                v-if="currentItem.link"
                :href="currentItem.link"
                target="_blank"
                rel="noopener noreferrer"
                class="fc__link"
              >
                Steam Workshop
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Prev / Next -->
      <template v-if="count > 1">
        <button
          class="fc__control fc__control--prev"
          @click="prev"
          aria-label="Previous item"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button
          class="fc__control fc__control--next"
          @click="next"
          aria-label="Next item"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
          </svg>
        </button>
      </template>
    </div>

    <!-- Dot indicators -->
    <div v-if="count > 1" class="fc__indicators">
      <button
        v-for="(item, i) in items"
        :key="i"
        class="fc__dot"
        :class="{
          'is-active': i === current,
          'is-animating': i === current && autoplay && isAnimating && !isHovered,
        }"
        :aria-label="`Go to item ${i + 1}: ${item.name}`"
        @click="goTo(i)"
      >
        <span
          v-if="i === current && autoplay && isAnimating && !isHovered"
          :key="`progress-${current}`"
          class="fc__dot-fill"
          :style="{ '--duration': animationDuration }"
        />
      </button>
    </div>

    <p class="fc__sr" aria-live="polite">Item {{ current + 1 }} of {{ count }}</p>
  </section>
</template>

<style scoped>
/* ── Fade transition ───────────────────────────────────── */
.fc-fade-enter-active,
.fc-fade-leave-active {
  transition: opacity 0.35s ease;
}
.fc-fade-enter-from,
.fc-fade-leave-to {
  opacity: 0;
}

/* ── Shell ─────────────────────────────────────────────── */
.fc {
  outline: none;
  width: 100%;
  margin: 1.5rem 0 0.5rem;
}

.fc__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* ── Card wrapper ──────────────────────────────────────── */
.fc__card {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
}

/* ── Slide layout (two-column on desktop) ──────────────── */
.fc__slide {
  display: flex;
  flex-direction: row;
  min-height: 300px;
}

.fc__image-wrap {
  flex: 0 0 55%;
  overflow: hidden;
  background: #111;
}

.fc__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  margin: 0;
  transition: transform 0.4s ease;
}

.fc__card:hover .fc__image {
  transform: scale(1.03);
}

.fc__content {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 2rem 1.75rem;
  background: var(--vp-c-bg-soft);
}

.fc__content-inner {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 100%;
}

/* ── Slide text ────────────────────────────────────────── */
.fc__title {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.25;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.fc__author {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}

.fc__tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin-top: 0.1rem;
}

.fc__pill {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-brand);
  background-color: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 4px;
}

.fc__description {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fc__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: opacity 0.2s;
}

.fc__link:hover {
  opacity: 0.75;
  text-decoration: none;
}

.fc__link svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
  flex-shrink: 0;
}

/* ── Prev / Next controls ──────────────────────────────── */
.fc__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.2s, transform 0.2s;
  z-index: 10;
}

.fc__control:hover {
  background: rgba(0, 0, 0, 0.8);
}

.fc__control:active {
  transform: translateY(-50%) scale(0.93);
}

.fc__control svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.fc__control--prev {
  left: 12px;
}

.fc__control--next {
  /* position on the boundary between image and content */
  left: calc(55% - 22px);
}

/* ── Dot indicators ────────────────────────────────────── */
.fc__indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 14px 8px;
}

.fc__dot {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.4);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: width 0.3s ease, background 0.2s;
  overflow: hidden;
}

.fc__dot:hover {
  background: rgba(128, 128, 128, 0.65);
}

.fc__dot.is-active {
  width: 32px;
  background: rgba(66, 184, 131, 0.25);
}

.fc__dot.is-animating {
  background: rgba(66, 184, 131, 0.25);
}

.fc__dot-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0%;
  background: var(--vp-c-brand);
  border-radius: 10px;
  animation: fc-dot-fill var(--duration, 7000ms) linear forwards;
}

@keyframes fc-dot-fill {
  to { width: 100%; }
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 700px) {
  .fc__slide {
    flex-direction: column;
    min-height: unset;
  }

  .fc__image-wrap {
    flex: 0 0 auto;
    width: 100%;
    aspect-ratio: 16 / 9;
    height: unset;
  }

  .fc__content {
    padding: 1.25rem 1.25rem 1.5rem;
  }

  .fc__control--next {
    left: unset;
    right: 12px;
  }

  .fc__control--prev {
    left: 12px;
  }

  .fc__title {
    font-size: 1.15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fc__control,
  .fc__dot,
  .fc__image,
  .fc-fade-enter-active,
  .fc-fade-leave-active {
    transition: none;
    animation: none;
  }
}
</style>
