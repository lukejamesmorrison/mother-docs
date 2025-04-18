<!-- MyComponent.vue -->
<template>
    <div class="powered-by-mother-item-card">
      <div>
        <h2>{{ item.name }}</h2>
        <Badge type="info" :text="`&nbsp;${item.author}&nbsp;`" vertical="middle" />
        <!-- <a :href="item.link" target="_blank" rel="noopener noreferrer" style="margin-left: 1rem">
            View on Steam Workshop
        </a> -->
      </div>
  
      <!-- Details -->
      <div class="details-container">

        <div>
        <!-- Image -->
        <div class="image-container">
          <img
            :src="item.image_link"
            :alt="item.name"
            style=""
          />
          <!-- <RouteLink :to="item.link">View on Steam Workshop</RouteLink> -->
        </div>

        <a :href="item.link" target="_blank" rel="noopener noreferrer">
            View on Steam Workshop
          </a>
      </div>

       
  
        <!-- Description and Link -->
        <div class="description-container">
          <p class="description-text">{{ item.description }}</p>

          
        </div>
      </div>
    </div>
  </template>
  

<script setup>
defineProps({
    item: Object
})
</script>

<style scoped lang="scss">


$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
  '2xl': 1536px
);

@mixin respond($breakpoint) {
  $size: map-get($breakpoints, $breakpoint);

  @if $size {
    @media (min-width: #{$size}) {
      @content;
    }
  } @else {
    @warn "Breakpoint '#{$breakpoint}' is not defined.";
  }
}



.powered-by-mother-item-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
}

// .details-container {
//   display: flex;
//   gap: 1rem;
//   flex-grow: 1;
//   min-height: 0; /* Important to prevent overflow */
// }

// @import 'media'; // or wherever your media query helpers live

.image-container {
  
  img {
      width: 100%;
    max-height: 200px; 
    border-radius: 8px; 
    object-fit: cover; 
    margin-bottom: 0.25rem;
  }

  @media (min-width: 768px) {
    width: 200px;
  }
}

.details-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex-grow: 1;
  min-height: 0;

  @media (min-width: 768px) {
    gap: 2rem;
    flex-direction: row;
  }
}

.description-container {
  display: flex;
  flex-direction: column;
  /* flex-grow: 1; */
  height: 100%;
  min-height: 0;

  @media (min-width: 768px) {
    width: 60%;
  }
}

.description-text {
  flex-grow: 1;
  overflow: auto;
  margin-top: 0;
}
</style>

