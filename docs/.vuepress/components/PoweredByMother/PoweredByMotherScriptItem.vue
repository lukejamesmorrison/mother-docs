<!-- PoweredByMotherScriptItem.vue -->
<template>
    <div class="powered-by-mother-item-card">
      <!-- Image -->
      <div class="image-container">
        <img
          :src="item.image_link"
          :alt="item.name"
        />
      </div>

      <!-- Content -->
      <div class="content-container">
        <h3 class="title">{{ item.name }}</h3>
        
        <div class="meta">
          <span class="author">by {{ item.author }}</span>
        </div>

        <div class="tags-container" v-if="item.tags && item.tags.length">
          <span 
            v-for="tag in item.tags" 
            :key="tag" 
            class="tag-pill"
          >
            {{ tag }}
          </span>
        </div>

        <p class="description-text">{{ item.description }}</p>

        <a :href="item.link" target="_blank" rel="noopener noreferrer" class="">
          <span>Steam Workshop</span>
        </a>
      </div>
    </div>
  </template>
  

<script setup>
defineProps({
    item: Object
})
</script>

<style scoped lang="scss">
.powered-by-mother-item-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;

  &:hover {
    border-color: var(--vp-c-brand);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
    transition: transform 0.3s ease;
  }

  .powered-by-mother-item-card:hover & img {
    transform: scale(1.03);
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.75rem 1.25rem 1.25rem;
  gap: 0.4rem;
}

.title {
  margin: 0;
  padding: 0;
  border: none;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.author {
  font-weight: 500;
}

.tags-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--vp-c-brand);
  background-color: rgba(66, 184, 131, 0.1);
  border: 1px solid rgba(66, 184, 131, 0.3);
  border-radius: 4px;
}

.description-text {
  flex-grow: 1;
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
</style>
