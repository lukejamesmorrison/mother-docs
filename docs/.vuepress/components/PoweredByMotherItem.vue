<!-- MyComponent.vue -->
<template>
    <div class="powered-by-mother-item-card">
      <div>
        <h2>{{ item.name }}</h2>
        <Badge type="info" :text="`&nbsp;${item.author}&nbsp;`" vertical="middle" />
        <a :href="item.link" target="_blank" rel="noopener noreferrer" style="margin-left: 1rem">
            View on Steam Workshop
        </a>
      </div>
  
      <!-- Details -->
      <div class="details-container">
        <!-- Image -->
        <div style="width: 200px;">
          <img
            :src="item.image_link"
            :alt="item.name"
            style="max-height: 200px; border-radius: 8px; object-fit: cover;"
          />
        </div>
  
        <!-- Description and Link -->
        <div class="description-container">
          <p class="description-text">{{ item.description }}</p>
          <!-- <RouteLink :to="item.link">View on Steam Workshop</RouteLink> -->

          
        </div>
      </div>
    </div>
  </template>
  

<script setup>
defineProps({
    item: Object
})
</script>

<style scoped>

.powered-by-mother-item-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.details-container {
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  min-height: 0; /* Important to prevent overflow */
}

.description-container {
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  height: 100%;
  min-height: 0;
  width: 60%;
}

.description-text {
  flex-grow: 1;
  overflow: auto;
  margin-top: 0;
}
</style>

