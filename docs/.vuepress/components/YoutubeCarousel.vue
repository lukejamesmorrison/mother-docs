<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, h, cloneVNode, useSlots, Comment, Text, Fragment } from 'vue'

/**
 * YouTubeCarousel.vue (slot-based, pure CSS styling)
 *
 * Pass slide content (e.g., iframes) via the default slot.
 * Each root node in the slot becomes a slide.
 * No utility framework required.
 */

const props = defineProps({
  startIndex: { type: Number, default: 0 },
  autoplay: { type: Boolean, default: false },
  interval: { type: Number, default: 10000 },
  loop: { type: Boolean, default: true },
  mountCurrentOnly: { type: Boolean, default: true },
  thumbnails: { type: Boolean, default: true },
  captions: { type: Boolean, default: true },
})

const emit = defineEmits(['change'])

const slots = useSlots()
function collectSlides(nodes, out = []) {
  for (const n of nodes) {
    if (!n) continue
    // Skip whitespace text and comments
    if (n.type === Comment || n.type === Text) continue
    // Unwrap fragments
    if (n.type === Fragment && Array.isArray(n.children)) {
      collectSlides(n.children, out)
      continue
    }
    out.push(n)
  }
  return out
}

const slidesVNodes = computed(() => {
  const nodes = slots.default?.() ?? []
  return collectSlides(nodes)
})

const meta = computed(() =>
  slidesVNodes.value.map((v, i) => {
    const p = v.props ?? {}
    return {
      title: p.title || `Slide ${i + 1}`,
      thumb: p['data-thumb'] || null,
    }
  })
)

const count = computed(() => slidesVNodes.value.length)
const current = ref(0)
watch(count, (n) => {
  current.value = Math.min(Math.max(0, props.startIndex), Math.max(0, n - 1))
}, { immediate: true })
watch(current, (idx) => emit('change', idx))

// Autoplay
let timer = null
const isHovered = ref(false)
const isVisible = ref(true)
function startAutoplay() {
  stopAutoplay()
  if (!props.autoplay || count.value <= 1) return
  timer = setInterval(() => {
    if (isHovered.value || !isVisible.value) return
    next()
  }, Math.max(2500, props.interval))
}
function stopAutoplay() { if (timer) { clearInterval(timer); timer = null } }
function onVisibilityChange() { isVisible.value = !document.hidden }
onMounted(() => { document.addEventListener('visibilitychange', onVisibilityChange); startAutoplay() })
onBeforeUnmount(() => { stopAutoplay(); document.removeEventListener('visibilitychange', onVisibilityChange) })

// Navigation
function goTo(index) {
  if (index < 0) { current.value = props.loop ? (count.value - 1) : 0; return }
  if (index >= count.value) { current.value = props.loop ? 0 : (count.value - 1); return }
  current.value = index
}
function next() { goTo(current.value + 1) }
function prev() { goTo(current.value - 1) }

// Keyboard
function onKeydown(e) { if (e.key === 'ArrowRight') { e.preventDefault(); next() } else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() } }

// Drag/Swipe
const isDown = ref(false)
const dragStartX = ref(0)
const dragDeltaX = ref(0)
function onPointerDown(e) { isDown.value = true; dragStartX.value = e.clientX || (e.touches?.[0]?.clientX ?? 0); dragDeltaX.value = 0 }
function onPointerMove(e) { if (!isDown.value) return; const x = e.clientX || (e.touches?.[0]?.clientX ?? 0); dragDeltaX.value = x - dragStartX.value }
function onPointerUp() { if (!isDown.value) return; const t = 60; if (dragDeltaX.value > t) prev(); else if (dragDeltaX.value < -t) next(); isDown.value = false; dragDeltaX.value = 0 }

const trackStyle = computed(() => ({ transform: `translateX(calc(${(-100 * current.value)}% + ${dragDeltaX.value}px))` }))

// Focus management
const slideRefs = ref([])
watch(current, async () => { await nextTick(); slideRefs.value[current.value]?.focus?.() })

// Render helper: wrap vnode into 16:9 box and ensure fill
function renderSlideVNode(vnode) {
  const p = vnode.props || {}
  const sized = cloneVNode(vnode, {
    ...p,
    class: [p?.class, 'ytc-slide-media'].filter(Boolean).join(' '),
    width: undefined,
    height: undefined,
  })
  return h('div', { class: 'ytc-aspect' }, [
    h('div', { class: 'ytc-aspect__inner' }, [sized])
  ])
}
</script>

<template>
  <section
    class="ytc"
    role="region"
    aria-roledescription="carousel"
    aria-label="Video carousel"
    tabindex="0"
    @keydown="onKeydown"
    @mouseenter="isHovered = true; stopAutoplay()"
    @mouseleave="isHovered = false; startAutoplay()"
  >
    <div
      class="ytc__viewport"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @touchstart.passive="onPointerDown"
      @touchmove.passive="onPointerMove"
      @touchend.passive="onPointerUp"
    >
      <div class="ytc__track" :style="trackStyle">
        <template v-if="mountCurrentOnly">
          <div
            v-for="(v, i) in slidesVNodes"
            :key="i"
            :ref="el => (slideRefs[i] = el)"
            class="ytc__slide"
            role="group"
            :aria-roledescription="'slide'"
            :aria-label="`${i + 1} of ${count}`"
            tabindex="-1"
          >
            <component :is="{ render: () => (i === current ? renderSlideVNode(v) : h('div')) }" />
            <!-- <div v-if="captions" class="ytc__caption">{{ meta[i]?.title }}</div> -->
          </div>
        </template>
        <template v-else>
          <div
            v-for="(v, i) in slidesVNodes"
            :key="i"
            :ref="el => (slideRefs[i] = el)"
            class="ytc__slide"
            role="group"
            :aria-roledescription="'slide'"
            :aria-label="`${i + 1} of ${count}`"
            tabindex="-1"
          >
            <component :is="{ render: () => renderSlideVNode(v) }" />
            <!-- <div v-if="captions" class="ytc__caption">{{ meta[i]?.title }}</div> -->
          </div>
        </template>
      </div>

      <div style="padding-top: 0px">
    

        
      </div>


      <div v-if="count > 1" class="ytc__indicators">

        <button class="ytc__control ytc__control--prev" @click="prev" aria-label="Previous slide">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>

        <button
          v-for="(_, i) in slidesVNodes"
          :key="'dot-' + i"
          class="ytc__indicator"
          :class="{ 'is-active': i === current, 'ytc__indicator--thumb': thumbnails && meta[i]?.thumb }"
          :aria-label="`Go to slide ${i + 1}`"
          @click="goTo(i)"
        >
          <img v-if="thumbnails && meta[i]?.thumb" :src="meta[i].thumb" alt="" />
        </button>

        <button class="ytc__control ytc__control--next" @click="next" aria-label="Next slide">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>
    </div>

    <p class="ytc__sr" aria-live="polite">Slide {{ current + 1 }} of {{ count }}</p>
  </section>
</template>

<style scoped>
:root { /* you can hoist these to global if desired */
  --ytc-bg: #111;
  --ytc-fg: #fff;
  --ytc-fg-muted: #e8e8e8;
  --ytc-shadow: 0 10px 24px rgba(0,0,0,.35);
  --ytc-control-bg: rgba(0,0,0,.5);
  --ytc-control-bg-hover: rgba(0,0,0,.7);
  --ytc-ring: #fff;
}

.ytc { outline: none; }
.ytc__sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }

.ytc__viewport {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: var(--ytc-bg);
  box-shadow: var(--ytc-shadow);
}

.ytc__slide { min-width: 100%; outline: none; }

/* Track */
.ytc__track {
  display: flex;
  transition: transform 300ms ease-out;
  will-change: transform;
}

/* 16:9 aspect wrapper (critical) */
.ytc-aspect {
  position: relative;
  width: 100%;
  /* Use 56.25% for 16:9. You can override with a CSS var if needed. */
  padding-top: var(--ytc-aspect, 56.25%);
}
.ytc-aspect__inner { position: absolute; inset: 0; width: 100%; height: 100%; }
.ytc-slide-media { width: 100%; height: 100%; border: 0; display: block; }

/* Caption */
.ytc__caption { color: var(--ytc-fg-muted); font-size: 14px; line-height: 1.4; padding: 12px 12px 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Controls */
.ytc__control {
  position: absolute; top: 50%; transform: translateY(-50%);
  padding: 8px; border-radius: 999px; border: none; cursor: pointer;
  background: var(--ytc-control-bg); color: rgba(255,255,255,1);
  display: grid; place-items: center; box-shadow: 0 2px 8px rgba(0,0,0,.3);
}
.ytc__control:hover { background: var(--ytc-control-bg-hover); }
.ytc__control svg { width: 28px; height: 28px; fill: currentColor; }
.ytc__control--prev { left: 8px; }
.ytc__control--next { right: 8px; }

/* Indicators */
.ytc__indicators {
  position: absolute; left: 0; right: 0; bottom: 8px;
  display: flex; justify-content: center; align-items: center; gap: 8px; padding: 0 8px;
}
.ytc__indicator {
  width: 12px; height: 12px; border-radius: 999px; background: rgba(255,255,255,.45);
  border: 2px solid transparent; cursor: pointer; padding: 0; box-sizing: content-box;
}
.ytc__indicator.is-active { background: rgba(255,255,255,1); border-color: var(--ytc-ring); }

/* Thumbnail indicators */
.ytc__indicator--thumb { width: 64px; height: 40px; border-radius: 6px; overflow: hidden; background: transparent; }
.ytc__indicator--thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  .ytc__track { transition: none; }
}
</style>
