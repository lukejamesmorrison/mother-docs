<script setup lang="ts">
import { computed } from 'vue'

type Faction = {
  id: string
  name: string
  lore?: {
    description?: string
  }
  imageUrl?: string
  relatedItems: Array<{
    name: string
    href?: string
  }>
}

const props = defineProps<{
  faction: Faction
}>()

const descriptionParagraphs = computed(() => {
  const description = props.faction.lore?.description?.trim() ?? ''
  if (!description) {
    return []
  }
  return description
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
})
</script>

<template>
  <article class="faction-card">
    <header class="faction-card__header">
      <h3 class="faction-card__title">{{ faction.name }}</h3>
      <!-- <span class="faction-card__id">{{ faction.id.toUpperCase() }}</span> -->
    </header>

    <figure v-if="faction.imageUrl" class="faction-card__media">
      <img :src="faction.imageUrl" :alt="faction.name" loading="lazy" />
    </figure>

    <div v-if="descriptionParagraphs.length" class="faction-card__description">
      <p v-for="(paragraph, index) in descriptionParagraphs" :key="`${faction.id}-paragraph-${index}`">
        {{ paragraph }}
      </p>
    </div>

    <p v-else class="faction-card__description faction-card__description--empty">
      No briefing data available yet.
    </p>

    <div v-if="faction.relatedItems.length" class="faction-card__related">
      <span class="faction-card__related-label">Related</span>
      <ul>
        <li v-for="relatedItem in faction.relatedItems" :key="`${faction.id}-${relatedItem.name}`">
          <a v-if="relatedItem.href" :href="relatedItem.href">{{ relatedItem.name }}</a>
          <span v-else>{{ relatedItem.name }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.faction-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 18px;
  padding: 0.85rem;
  background:
    radial-gradient(circle at top right, var(--vp-c-accent-soft), transparent 45%),
    linear-gradient(165deg, var(--vp-c-bg-elv), var(--vp-c-bg));
  color: var(--vp-c-text);
  box-shadow: 0 1px 4px color-mix(in srgb, var(--vp-c-shadow) 22%, transparent);
}

.faction-card__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
}

.faction-card__title {
  margin: 0 !important;
  padding: 0;
  line-height: 1.12;
  font-size: 2rem;
  letter-spacing: 0.03em;
  color: var(--vp-c-text);
}

.faction-card__id {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-mute);
  text-transform: uppercase;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  padding: 0.14rem 0.45rem;
  white-space: nowrap;
}

.faction-card__media {
  margin: 0 0 0.7rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-alt);
}

.faction-card__media img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.faction-card__description {
  margin: 0.65rem 0;
  color: var(--vp-c-text);
}

.faction-card__description p {
  margin: 0;
  line-height: 1.5;
}

.faction-card__description p + p {
  margin-top: 0.65rem;
}

.faction-card__description--empty {
  color: var(--vp-c-text-mute);
  font-style: italic;
}

.faction-card__related {
  margin-top: 0.65rem;
}

.faction-card__related-label {
  display: inline-block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-mute);
  margin-bottom: 0.25rem;
}

.faction-card__related ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.faction-card__related li {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-alt);
  border-radius: 999px;
  font-size: 0.82rem;
  padding: 0.2rem 0.55rem;
}

.faction-card__related a {
  color: inherit;
  text-decoration: none;
}

.faction-card__related a:hover {
  color: var(--vp-c-brand-1);
}

:global(html:not(.dark)) .faction-card {
  border-color: color-mix(in srgb, var(--vp-c-border) 55%, transparent);
  background:
    radial-gradient(circle at top right, color-mix(in srgb, var(--vp-c-accent-soft) 55%, transparent), transparent 52%),
    linear-gradient(165deg, var(--vp-c-bg-elv), var(--vp-c-bg));
}

:global(html:not(.dark)) .faction-card__media,
:global(html:not(.dark)) .faction-card__related li {
  border-color: color-mix(in srgb, var(--vp-c-border) 58%, transparent);
}

@media (min-width: 860px) {
  .faction-card {
    padding: 1rem;
  }
}

@media (max-width: 640px) {
  .faction-card__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
